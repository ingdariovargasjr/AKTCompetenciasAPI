// Results Dashboard Logic

let allKataResults = [];
let allKumiteResults = [];
let categories = [];

// Inicializar página
document.addEventListener('DOMContentLoaded', async () => {
    console.log('Results dashboard page loaded');
    
    // Cargar categorías
    await loadCategories();
    
    // Cargar resultados
    await loadResults();
    
    // Event listeners para filtros
    document.getElementById('typeFilter').addEventListener('change', applyFilters);
    document.getElementById('categoryFilter').addEventListener('change', applyFilters);
    document.getElementById('sortFilter').addEventListener('change', applyFilters);
});

// Cargar categorías
async function loadCategories() {
    try {
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('name');
        
        if (error) throw error;
        
        categories = data;
        
        // Poblar filtro
        const filterSelect = document.getElementById('categoryFilter');
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

// Cargar todos los resultados
async function loadResults() {
    await Promise.all([
        loadKataResults(),
        loadKumiteResults()
    ]);
}

// Cargar resultados de Kata
async function loadKataResults() {
    try {
        const { data, error } = await supabase
            .from('kata_results')
            .select(`
                *,
                competitors (name, last_name, categories (name)),
                rounds (name, competition_id, competitions (name))
            `)
            .order('final_score', { ascending: false });
        
        if (error) throw error;
        
        allKataResults = data;
        displayKataResults(data);
        
    } catch (error) {
        console.error('Error loading kata results:', error);
        document.getElementById('kataResults').innerHTML = 
            '<div class="empty-state"><p>Error al cargar resultados de Kata</p></div>';
    }
}

// Cargar resultados de Kumite
async function loadKumiteResults() {
    try {
        const { data, error } = await supabase
            .from('kumite_matches')
            .select(`
                *,
                competitor_red:competitor_red_id (name, last_name, categories (name)),
                competitor_blue:competitor_blue_id (name, last_name, categories (name)),
                winner:winner_id (name, last_name),
                rounds (name, competition_id, competitions (name))
            `)
            .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        allKumiteResults = data;
        displayKumiteResults(data);
        
    } catch (error) {
        console.error('Error loading kumite results:', error);
        document.getElementById('kumiteResults').innerHTML = 
            '<div class="empty-state"><p>Error al cargar resultados de Kumite</p></div>';
    }
}

// Mostrar resultados de Kata
function displayKataResults(results) {
    const container = document.getElementById('kataResults');
    
    if (results.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <h4>No hay resultados disponibles</h4>
                <p>Los resultados de Kata aparecerán aquí una vez se completen las evaluaciones</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = results.map((result, index) => {
        const rank = index + 1;
        const medalClass = rank === 1 ? 'gold' : rank === 2 ? 'silver' : rank === 3 ? 'bronze' : 'other';
        
        return `
            <div class="result-card">
                <div class="ranking-badge ${medalClass}">${rank}</div>
                
                <div class="competitor-info">
                    <div class="competitor-name">
                        ${result.competitors.name} ${result.competitors.last_name}
                    </div>
                    <div class="competitor-details">
                        <span class="detail-badge">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                <circle cx="12" cy="7" r="4"/>
                            </svg>
                            ${result.competitors.categories.name}
                        </span>
                        <span class="detail-badge">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                                <line x1="16" y1="2" x2="16" y2="6"/>
                                <line x1="8" y1="2" x2="8" y2="6"/>
                                <line x1="3" y1="10" x2="21" y2="10"/>
                            </svg>
                            ${result.rounds?.competitions?.name || 'Competencia'}
                        </span>
                    </div>
                </div>
                
                <div class="score-display">
                    <span class="score-label">Puntuación</span>
                    <span class="score-value">${result.final_score.toFixed(2)}</span>
                </div>
            </div>
        `;
    }).join('');
}

// Mostrar resultados de Kumite
function displayKumiteResults(results) {
    const container = document.getElementById('kumiteResults');
    
    if (results.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <h4>No hay resultados disponibles</h4>
                <p>Los resultados de Kumite aparecerán aquí una vez se completen los combates</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = results.map((match, index) => {
        const winnerName = match.winner ? 
            `${match.winner.name} ${match.winner.last_name}` : 
            'Empate';
        
        const winMethod = {
            'points': 'Por puntos',
            'hansoku': 'Por Hansoku',
            'draw': 'Empate'
        }[match.win_method] || match.win_method;
        
        return `
            <div class="result-card">
                <div class="ranking-badge other">#${index + 1}</div>
                
                <div class="competitor-info">
                    <div class="competitor-name">
                        ${match.competitor_red.name} ${match.competitor_red.last_name} 
                        <span style="color: #DC2626; font-weight: 700;">(AKA)</span>
                        vs
                        ${match.competitor_blue.name} ${match.competitor_blue.last_name}
                        <span style="color: #2563EB; font-weight: 700;">(AO)</span>
                    </div>
                    <div class="competitor-details">
                        <span class="detail-badge">
                            ${match.competitor_red.categories.name}
                        </span>
                        <span class="detail-badge">
                            Ganador: ${winnerName}
                        </span>
                        <span class="detail-badge">
                            ${winMethod}
                        </span>
                    </div>
                </div>
                
                <div class="score-display">
                    <span class="score-label">Marcador</span>
                    <span class="score-value">${match.red_score} - ${match.blue_score}</span>
                </div>
            </div>
        `;
    }).join('');
}

// Mostrar podio general
function displayPodium() {
    const container = document.getElementById('podiumContainer');
    
    // Agrupar resultados por categoría
    const resultsByCategory = {};
    
    allKataResults.forEach(result => {
        const categoryName = result.competitors.categories.name;
        if (!resultsByCategory[categoryName]) {
            resultsByCategory[categoryName] = [];
        }
        resultsByCategory[categoryName].push({
            name: `${result.competitors.name} ${result.competitors.last_name}`,
            score: result.final_score,
            type: 'kata'
        });
    });
    
    // Ordenar cada categoría por puntuación
    Object.keys(resultsByCategory).forEach(category => {
        resultsByCategory[category].sort((a, b) => b.score - a.score);
    });
    
    if (Object.keys(resultsByCategory).length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h4>No hay resultados disponibles</h4>
                <p>El podio se generará automáticamente cuando haya resultados</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = Object.entries(resultsByCategory).map(([category, results]) => {
        const top3 = results.slice(0, 3);
        const medals = ['🥇', '🥈', '🥉'];
        
        return `
            <div class="category-podium">
                <h4 class="category-title">${category}</h4>
                <div class="podium-places">
                    ${top3.map((result, index) => `
                        <div class="podium-place">
                            <div class="medal-icon">${medals[index]}</div>
                            <div class="place-name">${result.name}</div>
                            <div class="place-score">${result.score.toFixed(2)}</div>
                        </div>
                    `).join('')}
                    ${top3.length < 3 ? '<div class="podium-place"><p style="color: var(--color-text-secondary);">Sin asignar</p></div>'.repeat(3 - top3.length) : ''}
                </div>
            </div>
        `;
    }).join('');
}

// Cambiar entre tabs
function switchTab(tab) {
    // Actualizar botones
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Mostrar contenido
    document.getElementById('kataTab').style.display = tab === 'kata' ? 'block' : 'none';
    document.getElementById('kumiteTab').style.display = tab === 'kumite' ? 'block' : 'none';
    document.getElementById('podiumTab').style.display = tab === 'podium' ? 'block' : 'none';
    
    // Cargar podio si es necesario
    if (tab === 'podium') {
        displayPodium();
    }
}

// Aplicar filtros
function applyFilters() {
    const typeFilter = document.getElementById('typeFilter').value;
    const categoryFilter = document.getElementById('categoryFilter').value;
    const sortFilter = document.getElementById('sortFilter').value;
    
    let filteredKata = [...allKataResults];
    let filteredKumite = [...allKumiteResults];
    
    // Filtrar por categoría
    if (categoryFilter) {
        filteredKata = filteredKata.filter(r => r.competitor_id && 
            r.competitors.categories.id == categoryFilter);
    }
    
    // Ordenar
    if (sortFilter === 'name') {
        filteredKata.sort((a, b) => 
            `${a.competitors.name} ${a.competitors.last_name}`.localeCompare(
                `${b.competitors.name} ${b.competitors.last_name}`
            )
        );
    } else if (sortFilter === 'score') {
        filteredKata.sort((a, b) => b.final_score - a.final_score);
    }
    
    displayKataResults(filteredKata);
    displayKumiteResults(filteredKumite);
}

// Exportar resultados a CSV
function exportResults() {
    const currentTab = document.querySelector('.tab-btn.active').textContent.trim();
    
    let csv = '';
    let filename = '';
    
    if (currentTab.includes('Kata')) {
        csv = 'Posición,Nombre,Categoría,Puntuación\n';
        allKataResults.forEach((result, index) => {
            csv += `${index + 1},"${result.competitors.name} ${result.competitors.last_name}","${result.competitors.categories.name}",${result.final_score}\n`;
        });
        filename = 'resultados_kata.csv';
    } else if (currentTab.includes('Kumite')) {
        csv = 'Combate,Rojo,Azul,Marcador,Ganador\n';
        allKumiteResults.forEach((match, index) => {
            const winner = match.winner ? `${match.winner.name} ${match.winner.last_name}` : 'Empate';
            csv += `${index + 1},"${match.competitor_red.name} ${match.competitor_red.last_name}","${match.competitor_blue.name} ${match.competitor_blue.last_name}","${match.red_score}-${match.blue_score}","${winner}"\n`;
        });
        filename = 'resultados_kumite.csv';
    }
    
    // Crear y descargar archivo
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    
    alert('Resultados exportados correctamente');
}
