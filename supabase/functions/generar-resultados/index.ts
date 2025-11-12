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
        const { round_id, competition_type } = await req.json();

        if (!round_id || !competition_type) {
            throw new Error('round_id y competition_type son requeridos');
        }

        const supabaseUrl = Deno.env.get('SUPABASE_URL');
        const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

        if (!supabaseUrl || !serviceRoleKey) {
            throw new Error('Configuración de Supabase faltante');
        }

        let results = [];

        if (competition_type === 'Kata') {
            // Obtener resultados de Kata ordenados por puntaje
            const kataResponse = await fetch(
                `${supabaseUrl}/rest/v1/kata_results?round_id=eq.${round_id}&select=*&order=final_score.desc`,
                {
                    headers: {
                        'Authorization': `Bearer ${serviceRoleKey}`,
                        'apikey': serviceRoleKey
                    }
                }
            );

            if (!kataResponse.ok) {
                throw new Error('Error al obtener resultados de Kata');
            }

            results = await kataResponse.json();

            // Asignar ranking y medallas
            for (let i = 0; i < results.length; i++) {
                const position = i + 1;
                let medal = null;

                if (position === 1) medal = 'Oro';
                else if (position === 2) medal = 'Plata';
                else if (position === 3) medal = 'Bronce';

                // Actualizar resultado con ranking y medalla
                await fetch(
                    `${supabaseUrl}/rest/v1/kata_results?id=eq.${results[i].id}`,
                    {
                        method: 'PATCH',
                        headers: {
                            'Authorization': `Bearer ${serviceRoleKey}`,
                            'apikey': serviceRoleKey,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            rank_position: position,
                            medal: medal
                        })
                    }
                );

                results[i].rank_position = position;
                results[i].medal = medal;
            }

        } else if (competition_type === 'Kumite') {
            // Obtener combates de Kumite de esta ronda
            const kumiteResponse = await fetch(
                `${supabaseUrl}/rest/v1/kumite_matches?round_id=eq.${round_id}&select=*&match_status=eq.completed`,
                {
                    headers: {
                        'Authorization': `Bearer ${serviceRoleKey}`,
                        'apikey': serviceRoleKey
                    }
                }
            );

            if (!kumiteResponse.ok) {
                throw new Error('Error al obtener combates de Kumite');
            }

            const matches = await kumiteResponse.json();

            // Contar victorias por competidor
            const victoryCounts = {};

            matches.forEach(match => {
                if (match.winner_id) {
                    if (!victoryCounts[match.winner_id]) {
                        victoryCounts[match.winner_id] = {
                            competitor_id: match.winner_id,
                            victories: 0,
                            total_points: 0
                        };
                    }
                    victoryCounts[match.winner_id].victories += 1;

                    // Sumar puntos
                    if (match.winner_id === match.red_competitor_id) {
                        victoryCounts[match.winner_id].total_points += match.red_points;
                    } else {
                        victoryCounts[match.winner_id].total_points += match.blue_points;
                    }
                }
            });

            // Convertir a array y ordenar
            results = Object.values(victoryCounts).sort((a, b) => {
                if (b.victories !== a.victories) {
                    return b.victories - a.victories;
                }
                return b.total_points - a.total_points;
            });

            // Asignar medallas
            results.forEach((result, i) => {
                result.rank_position = i + 1;
                if (i === 0) result.medal = 'Oro';
                else if (i === 1) result.medal = 'Plata';
                else if (i === 2) result.medal = 'Bronce';
                else result.medal = null;
            });
        }

        return new Response(JSON.stringify({
            data: {
                round_id,
                competition_type,
                results: results,
                total_competitors: results.length
            }
        }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Error generando resultados:', error);

        return new Response(JSON.stringify({
            error: {
                code: 'RESULTS_GENERATION_ERROR',
                message: error.message
            }
        }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
});
