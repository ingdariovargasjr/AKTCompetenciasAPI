// Competitors Registration Logic

let categories = [];

// Inicializar página
document.addEventListener('DOMContentLoaded', async () => {
    console.log('Competitors registration page loaded');
    
    // Cargar categorías
    await loadCategories();
    
    // Cargar competidores
    await loadCompetitors();
    
    // Event listeners
    document.getElementById('competitorForm').addEventListener('submit', handleSubmit);
    document.getElementById('birthDate').addEventListener('change', updateCategoryPreview);
    document.getElementById('gender').addEventListener('change', updateCategoryPreview);
    document.getElementById('weight').addEventListener('input', updateCategoryPreview);
    document.getElementById('searchInput').addEventListener('input', filterCompetitors);
    document.getElementById('filterCategory').addEventListener('change', filterCompetitors);
});

// Cargar categorías desde Supabase
async function loadCategories() {
    try {
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('name');
        
        if (error) throw error;
        
        categories = data;
        
        // Poblar filtro de categorías
        const filterSelect = document.getElementById('filterCategory');
        data.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.id;
            option.textContent = cat.name;
            filterSelect.appendChild(option);
        });
        
    } catch (error) {
        console.error('Error loading categories:', error);
    }
}

// Calcular edad desde fecha de nacimiento
function calculateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    
    return age;
}

// Determinar categoría según edad y peso
function determineCategory(age, gender, weight) {
    // Determinar grupo de edad
    let ageGroup = '';
    if (age >= 6 && age <= 11) {
        ageGroup = 'Infantil';
    } else if (age >= 12 && age <= 13) {
        ageGroup = 'Cadete';
    } else if (age >= 14 && age <= 15) {
        ageGroup = 'Junior';
    } else if (age >= 16 && age <= 20) {
        ageGroup = 'U21';
    } else if (age >= 21) {
        ageGroup = 'Senior';
    } else {
        return null;
    }
    
    // Buscar categoría por edad, género y peso
    const category = categories.find(cat => {
        const catName = cat.name;
        
        // Verificar grupo de edad
        if (!catName.includes(ageGroup)) return false;
        
        // Verificar género
        if (catName.includes('Masculino') && gender !== 'M') return false;
        if (catName.includes('Femenino') && gender !== 'F') return false;
        
        // Verificar peso (si tiene límite de peso en el nombre)
        const weightMatch = catName.match(/([<>])(\d+)kg/);
        if (weightMatch) {
            const operator = weightMatch[1];
            const limit = parseFloat(weightMatch[2]);
            
            if (operator === '<' && weight >= limit) return false;
            if (operator === '>' && weight <= limit) return false;
        }
        
        // Si tiene rango de peso
        const rangeMatch = catName.match(/(\d+)-(\d+)kg/);
        if (rangeMatch) {
            const min = parseFloat(rangeMatch[1]);
            const max = parseFloat(rangeMatch[2]);
            
            if (weight < min || weight > max) return false;
        }
        
        return true;
    });
    
    return category;
}

// Actualizar preview de categoría
function updateCategoryPreview() {
    const birthDate = document.getElementById('birthDate').value;
    const gender = document.getElementById('gender').value;
    const weight = document.getElementById('weight').value;
    
    if (!birthDate || !gender || !weight) {
        document.getElementById('categoryPreview').style.display = 'none';
        return;
    }
    
    const age = calculateAge(birthDate);
    const category = determineCategory(age, gender, parseFloat(weight));
    
    if (category) {
        document.getElementById('categoryName').textContent = category.name;
        document.getElementById('categoryPreview').style.display = 'flex';
    } else {
        document.getElementById('categoryPreview').style.display = 'none';
    }
}

// Manejar envío del formulario
async function handleSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const birthDate = document.getElementById('birthDate').value;
    const gender = document.getElementById('gender').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const club = document.getElementById('club').value.trim();
    
    const age = calculateAge(birthDate);
    const category = determineCategory(age, gender, weight);
    
    if (!category) {
        alert('No se pudo determinar la categoría para este competidor. Verifique los datos.');
        return;
    }
    
    try {
        const { data, error } = await supabase
            .from('competitors')
            .insert({
                name: name,
                last_name: lastName,
                birth_date: birthDate,
                gender: gender,
                weight: weight,
                club: club || null,
                category_id: category.id
            })
            .select();
        
        if (error) throw error;
        
        alert(`Competidor registrado correctamente en la categoría: ${category.name}`);
        resetForm();
        await loadCompetitors();
        
    } catch (error) {
        console.error('Error registering competitor:', error);
        alert('Error al registrar competidor: ' + error.message);
    }
}

// Limpiar formulario
function resetForm() {
    document.getElementById('competitorForm').reset();
    document.getElementById('categoryPreview').style.display = 'none';
}

// Cargar competidores
async function loadCompetitors() {
    try {
        const { data, error } = await supabase
            .from('competitors')
            .select('*, categories(name)')
            .order('last_name', { ascending: true });
        
        if (error) throw error;
        
        displayCompetitors(data);
        
    } catch (error) {
        console.error('Error loading competitors:', error);
        document.getElementById('competitorsBody').innerHTML = 
            '<tr><td colspan="6" class="loading-row">Error al cargar competidores</td></tr>';
    }
}

// Mostrar competidores en la tabla
function displayCompetitors(competitors) {
    const tbody = document.getElementById('competitorsBody');
    
    if (competitors.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="loading-row">No hay competidores registrados</td></tr>';
        return;
    }
    
    tbody.innerHTML = competitors.map(comp => {
        const age = calculateAge(comp.birth_date);
        const genderText = comp.gender === 'M' ? 'Masculino' : 'Femenino';
        
        return `
            <tr>
                <td><strong>${comp.name} ${comp.last_name}</strong></td>
                <td>${age} años</td>
                <td>${genderText}</td>
                <td>${comp.weight}</td>
                <td><span class="category-badge">${comp.categories?.name || 'Sin categoría'}</span></td>
                <td>${comp.club || '-'}</td>
            </tr>
        `;
    }).join('');
}

// Filtrar competidores
function filterCompetitors() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const categoryFilter = document.getElementById('filterCategory').value;
    
    const rows = document.querySelectorAll('#competitorsBody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const categoryBadge = row.querySelector('.category-badge');
        
        let matchesSearch = text.includes(searchTerm);
        let matchesCategory = true;
        
        if (categoryFilter && categoryBadge) {
            const categoryId = categories.find(cat => 
                cat.name === categoryBadge.textContent
            )?.id;
            matchesCategory = categoryId == categoryFilter;
        }
        
        row.style.display = matchesSearch && matchesCategory ? '' : 'none';
    });
}
