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
        const { birth_date, weight, gender, competition_type } = await req.json();

        if (!birth_date || !gender || !competition_type) {
            throw new Error('birth_date, gender y competition_type son requeridos');
        }

        const supabaseUrl = Deno.env.get('SUPABASE_URL');
        const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

        if (!supabaseUrl || !serviceRoleKey) {
            throw new Error('Configuración de Supabase faltante');
        }

        // Calcular edad
        const birthDateObj = new Date(birth_date);
        const today = new Date();
        let age = today.getFullYear() - birthDateObj.getFullYear();
        const monthDiff = today.getMonth() - birthDateObj.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
            age--;
        }

        // Obtener todas las categorías que coincidan con los criterios
        let categoryQuery = `${supabaseUrl}/rest/v1/categories?gender=eq.${gender}&competition_type=eq.${competition_type}&age_min=lte.${age}&age_max=gte.${age}`;

        // Si es Kumite y se proporciona peso, filtrar por peso
        if (competition_type === 'Kumite' && weight) {
            // Necesitamos obtener categorías y filtrar manualmente por peso
            categoryQuery = `${supabaseUrl}/rest/v1/categories?gender=eq.${gender}&competition_type=eq.${competition_type}&age_min=lte.${age}&age_max=gte.${age}&select=*`;
        } else {
            categoryQuery += '&select=*';
        }

        const categoryResponse = await fetch(categoryQuery, {
            headers: {
                'Authorization': `Bearer ${serviceRoleKey}`,
                'apikey': serviceRoleKey
            }
        });

        if (!categoryResponse.ok) {
            throw new Error('Error al buscar categorías');
        }

        let categories = await categoryResponse.json();

        // Filtrar por peso si es Kumite
        if (competition_type === 'Kumite' && weight && categories.length > 0) {
            categories = categories.filter(cat => {
                const weightMin = cat.weight_min || 0;
                const weightMax = cat.weight_max || 999;
                return weight > weightMin && weight <= weightMax;
            });
        }

        if (categories.length === 0) {
            return new Response(JSON.stringify({
                data: {
                    message: 'No se encontró categoría apropiada',
                    age: age,
                    weight: weight,
                    gender: gender,
                    competition_type: competition_type,
                    category: null
                }
            }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }

        // Retornar la primera categoría que coincida
        const assignedCategory = categories[0];

        return new Response(JSON.stringify({
            data: {
                message: 'Categoría asignada correctamente',
                age: age,
                weight: weight,
                category: assignedCategory
            }
        }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Error asignando categoría:', error);

        return new Response(JSON.stringify({
            error: {
                code: 'CATEGORY_ASSIGNMENT_ERROR',
                message: error.message
            }
        }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
});
