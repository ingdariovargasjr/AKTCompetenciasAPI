Deno.serve(async (req) => {
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Max-Age': '86400',
        'Access-Control-Allow-Credentials': 'false'
    };

    if (req.method === 'OPTIONS') {
        return new Response(null, { status: 200, headers: corsHeaders });
    }

    try {
        const { competitor_id, round_id } = await req.json();

        if (!competitor_id || !round_id) {
            throw new Error('competitor_id y round_id son requeridos');
        }

        const supabaseUrl = Deno.env.get('SUPABASE_URL');
        const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

        if (!supabaseUrl || !serviceRoleKey) {
            throw new Error('Configuración de Supabase faltante');
        }

        // Obtener todas las puntuaciones del competidor en esta ronda
        const scoresResponse = await fetch(
            `${supabaseUrl}/rest/v1/kata_scores?competitor_id=eq.${competitor_id}&round_id=eq.${round_id}&select=*`,
            {
                headers: {
                    'Authorization': `Bearer ${serviceRoleKey}`,
                    'apikey': serviceRoleKey
                }
            }
        );

        if (!scoresResponse.ok) {
            throw new Error('Error al obtener puntuaciones');
        }

        const scores = await scoresResponse.json();

        // Debe haber exactamente 7 jueces
        if (scores.length !== 7) {
            return new Response(JSON.stringify({
                data: {
                    message: `Se requieren 7 jueces, actualmente hay ${scores.length}`,
                    scores_count: scores.length,
                    final_score: null
                }
            }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }

        // Calcular total por juez (ya calculado en total_score)
        const totalScores = scores.map(s => s.total_score).sort((a, b) => a - b);

        // Eliminar el mayor y el menor (quedan 5)
        const filteredScores = totalScores.slice(1, 6);

        // Calcular promedio de los 5 restantes
        const finalScore = filteredScores.reduce((sum, score) => sum + score, 0) / 5;

        // Guardar o actualizar resultado
        const resultResponse = await fetch(
            `${supabaseUrl}/rest/v1/kata_results`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${serviceRoleKey}`,
                    'apikey': serviceRoleKey,
                    'Content-Type': 'application/json',
                    'Prefer': 'resolution=merge-duplicates,return=representation'
                },
                body: JSON.stringify({
                    round_id: round_id,
                    competitor_id: competitor_id,
                    final_score: Math.round(finalScore * 100) / 100
                })
            }
        );

        if (!resultResponse.ok) {
            const errorText = await resultResponse.text();
            throw new Error(`Error al guardar resultado: ${errorText}`);
        }

        const result = await resultResponse.json();

        return new Response(JSON.stringify({
            data: {
                competitor_id,
                round_id,
                total_scores: totalScores,
                eliminated_min: totalScores[0],
                eliminated_max: totalScores[6],
                filtered_scores: filteredScores,
                final_score: Math.round(finalScore * 100) / 100,
                result: result[0] || result
            }
        }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Error calculando puntuación Kata:', error);

        return new Response(JSON.stringify({
            error: {
                code: 'KATA_CALCULATION_ERROR',
                message: error.message
            }
        }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
});
