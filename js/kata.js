// Kata Evaluation Logic

let currentCompetitor = null;
let judgeScores = Array(7).fill().map(() => ({ technical: null, athletic: null }));

// Inicializar página
document.addEventListener('DOMContentLoaded', async () => {
    console.log('Kata evaluation page loaded');
    
    // Inicializar paneles de jueces
    initializeJudgePanels();
    
    // Cargar lista de competidores
    await loadCompetitors();
});

// Inicializar paneles de jueces (7 jueces)
function initializeJudgePanels() {
    const judgesGrid = document.getElementById('judgesGrid');
    
    for (let i = 1; i <= 7; i++) {
        const panel = createJudgePanel(i);
        judgesGrid.appendChild(panel);
    }
}

// Crear panel individual de juez
function createJudgePanel(judgeNumber) {
    const panel = document.createElement('div');
    panel.className = 'judge-panel';
    panel.id = `judge-${judgeNumber}`;
    
    panel.innerHTML = `
        <div class="judge-header">
            <div class="judge-number">${judgeNumber}</div>
            <h4 class="judge-title">Juez ${judgeNumber}</h4>
            <div class="judge-total" id="judge-total-${judgeNumber}">0.00</div>
        </div>
        
        <div class="score-group">
            <div class="score-label">
                <span>Técnica</span>
                <span class="score-percentage">70%</span>
            </div>
            <div class="score-input-wrapper">
                <input 
                    type="number" 
                    class="score-input" 
                    id="technical-${judgeNumber}"
                    placeholder="0.00"
                    min="0"
                    max="10"
                    step="0.1"
                    onchange="updateScore(${judgeNumber}, 'technical', this.value)"
                >
            </div>
        </div>
        
        <div class="score-group">
            <div class="score-label">
                <span>Atletismo</span>
                <span class="score-percentage">30%</span>
            </div>
            <div class="score-input-wrapper">
                <input 
                    type="number" 
                    class="score-input" 
                    id="athletic-${judgeNumber}"
                    placeholder="0.00"
                    min="0"
                    max="10"
                    step="0.1"
                    onchange="updateScore(${judgeNumber}, 'athletic', this.value)"
                >
            </div>
        </div>
    `;
    
    return panel;
}

// Actualizar puntuación de un juez
function updateScore(judgeNumber, type, value) {
    const index = judgeNumber - 1;
    const numValue = parseFloat(value);
    
    // Validar rango 0-10
    if (numValue < 0 || numValue > 10) {
        alert('La puntuación debe estar entre 0 y 10');
        document.getElementById(`${type}-${judgeNumber}`).value = '';
        return;
    }
    
    judgeScores[index][type] = numValue;
    
    // Calcular total ponderado del juez (técnica 70% + atletismo 30%)
    if (judgeScores[index].technical !== null && judgeScores[index].athletic !== null) {
        const total = (judgeScores[index].technical * 0.7) + (judgeScores[index].athletic * 0.3);
        document.getElementById(`judge-total-${judgeNumber}`).textContent = total.toFixed(2);
        
        // Marcar panel como completado
        document.getElementById(`judge-${judgeNumber}`).classList.add('completed');
    }
    
    // Calcular resultado final si todos los jueces han evaluado
    calculateFinalScore();
}

// Calcular puntuación final WKF
function calculateFinalScore() {
    // Verificar que todos los jueces hayan puntuado
    const allScoresComplete = judgeScores.every(score => 
        score.technical !== null && score.athletic !== null
    );
    
    if (!allScoresComplete) {
        document.getElementById('resultPanel').style.display = 'none';
        document.getElementById('saveBtn').disabled = true;
        return;
    }
    
    // Calcular totales ponderados de cada juez
    const judgeTotal = judgeScores.map(score => 
        (score.technical * 0.7) + (score.athletic * 0.3)
    );
    
    // Ordenar para encontrar mayor y menor
    const sortedScores = [...judgeTotal].sort((a, b) => a - b);
    
    // Eliminar la mayor y la menor (posiciones 0 y 6 del array ordenado)
    const lowestScore = sortedScores[0];
    const highestScore = sortedScores[6];
    
    // Tomar las 5 del medio (índices 1 a 5)
    const middleFive = sortedScores.slice(1, 6);
    
    // Calcular promedio de las 5 restantes
    const finalScore = middleFive.reduce((sum, score) => sum + score, 0) / 5;
    
    // Calcular promedios de técnica y atletismo para mostrar desglose
    const technicalScores = judgeScores.map(s => s.technical);
    const athleticScores = judgeScores.map(s => s.athletic);
    
    const sortedTech = [...technicalScores].sort((a, b) => a - b);
    const sortedAth = [...athleticScores].sort((a, b) => a - b);
    
    const avgTechnical = sortedTech.slice(1, 6).reduce((sum, s) => sum + s, 0) / 5;
    const avgAthletic = sortedAth.slice(1, 6).reduce((sum, s) => sum + s, 0) / 5;
    
    // Mostrar resultado
    document.getElementById('finalScore').textContent = finalScore.toFixed(2);
    document.getElementById('technicalScore').textContent = avgTechnical.toFixed(2);
    document.getElementById('athleticScore').textContent = avgAthletic.toFixed(2);
    document.getElementById('discardedScores').textContent = 
        `${lowestScore.toFixed(2)} (menor), ${highestScore.toFixed(2)} (mayor)`;
    document.getElementById('averagedScores').textContent = 
        middleFive.map(s => s.toFixed(2)).join(', ');
    
    document.getElementById('resultPanel').style.display = 'block';
    document.getElementById('saveBtn').disabled = false;
}

// Cargar lista de competidores desde Supabase
async function loadCompetitors() {
    try {
        const { data, error } = await supabase
            .from('competitors')
            .select('id, name, last_name, category_id, categories(name)')
            .order('last_name', { ascending: true });
        
        if (error) throw error;
        
        const select = document.getElementById('competitorSelect');
        data.forEach(competitor => {
            const option = document.createElement('option');
            option.value = competitor.id;
            option.textContent = `${competitor.name} ${competitor.last_name}`;
            option.dataset.category = competitor.categories?.name || 'Sin categoría';
            select.appendChild(option);
        });
        
        // Event listener para mostrar info del competidor
        select.addEventListener('change', function() {
            if (this.value) {
                currentCompetitor = data.find(c => c.id == this.value);
                document.getElementById('competitorName').textContent = 
                    `${currentCompetitor.name} ${currentCompetitor.last_name}`;
                document.getElementById('competitorCategory').textContent = 
                    this.options[this.selectedIndex].dataset.category;
                document.getElementById('infoDisplay').style.display = 'flex';
                this.style.display = 'none';
            }
        });
        
    } catch (error) {
        console.error('Error loading competitors:', error);
        alert('Error al cargar competidores. Verifique la conexión.');
    }
}

// Guardar evaluación en Supabase
async function saveEvaluation() {
    if (!currentCompetitor) {
        alert('Debe seleccionar un competidor');
        return;
    }
    
    const finalScoreValue = parseFloat(document.getElementById('finalScore').textContent);
    
    try {
        // Obtener round activo (simplificado: usamos el primer round disponible)
        const { data: rounds, error: roundError } = await supabase
            .from('rounds')
            .select('id')
            .eq('type', 'kata')
            .limit(1);
        
        if (roundError) throw roundError;
        
        if (!rounds || rounds.length === 0) {
            alert('No hay ronda activa. Contacte al administrador.');
            return;
        }
        
        // Preparar datos de puntuaciones individuales
        const scoresData = judgeScores.map((score, index) => ({
            round_id: rounds[0].id,
            competitor_id: currentCompetitor.id,
            judge_number: index + 1,
            technical_score: score.technical,
            athletic_score: score.athletic
        }));
        
        // Insertar puntuaciones
        const { error: scoresError } = await supabase
            .from('kata_scores')
            .insert(scoresData);
        
        if (scoresError) throw scoresError;
        
        // Insertar resultado final
        const { error: resultError } = await supabase
            .from('kata_results')
            .insert({
                round_id: rounds[0].id,
                competitor_id: currentCompetitor.id,
                final_score: finalScoreValue
            });
        
        if (resultError) throw resultError;
        
        alert('Evaluación guardada correctamente');
        
        // Reiniciar para nueva evaluación
        setTimeout(() => {
            window.location.reload();
        }, 1500);
        
    } catch (error) {
        console.error('Error saving evaluation:', error);
        alert('Error al guardar evaluación: ' + error.message);
    }
}

// Reiniciar evaluación
function resetEvaluation() {
    if (confirm('¿Está seguro de reiniciar la evaluación? Se perderán todos los datos.')) {
        judgeScores = Array(7).fill().map(() => ({ technical: null, athletic: null }));
        
        // Limpiar inputs
        for (let i = 1; i <= 7; i++) {
            document.getElementById(`technical-${i}`).value = '';
            document.getElementById(`athletic-${i}`).value = '';
            document.getElementById(`judge-total-${i}`).textContent = '0.00';
            document.getElementById(`judge-${i}`).classList.remove('completed');
        }
        
        // Ocultar resultado
        document.getElementById('resultPanel').style.display = 'none';
        document.getElementById('saveBtn').disabled = true;
    }
}
