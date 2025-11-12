// Kumite Match Logic

let matchState = {
    redCompetitor: null,
    blueCompetitor: null,
    redScore: 0,
    blueScore: 0,
    redPenalties: [],
    bluePenalties: [],
    duration: 180, // segundos
    timeRemaining: 180,
    isPaused: true,
    isFinished: false,
    timerInterval: null
};

// Inicializar página
document.addEventListener('DOMContentLoaded', async () => {
    console.log('Kumite match page loaded');
    
    // Cargar lista de competidores
    await loadCompetitors();
});

// Cargar competidores
async function loadCompetitors() {
    try {
        const { data, error } = await supabase
            .from('competitors')
            .select('id, name, last_name')
            .order('last_name', { ascending: true });
        
        if (error) throw error;
        
        const selectRed = document.getElementById('competitorRed');
        const selectBlue = document.getElementById('competitorBlue');
        
        data.forEach(competitor => {
            const optionRed = document.createElement('option');
            optionRed.value = competitor.id;
            optionRed.textContent = `${competitor.name} ${competitor.last_name}`;
            optionRed.dataset.name = `${competitor.name} ${competitor.last_name}`;
            selectRed.appendChild(optionRed);
            
            const optionBlue = optionRed.cloneNode(true);
            selectBlue.appendChild(optionBlue);
        });
        
    } catch (error) {
        console.error('Error loading competitors:', error);
        alert('Error al cargar competidores');
    }
}

// Iniciar combate
function startMatch() {
    const redSelect = document.getElementById('competitorRed');
    const blueSelect = document.getElementById('competitorBlue');
    const durationSelect = document.getElementById('duration');
    
    if (!redSelect.value || !blueSelect.value) {
        alert('Debe seleccionar ambos competidores');
        return;
    }
    
    if (redSelect.value === blueSelect.value) {
        alert('Debe seleccionar competidores diferentes');
        return;
    }
    
    // Configurar estado del combate
    matchState.redCompetitor = {
        id: redSelect.value,
        name: redSelect.options[redSelect.selectedIndex].dataset.name
    };
    matchState.blueCompetitor = {
        id: blueSelect.value,
        name: blueSelect.options[blueSelect.selectedIndex].dataset.name
    };
    matchState.duration = parseInt(durationSelect.value);
    matchState.timeRemaining = matchState.duration;
    
    // Mostrar marcador
    document.getElementById('setupSection').style.display = 'none';
    document.getElementById('scoreboardSection').style.display = 'block';
    
    // Actualizar nombres
    document.getElementById('nameRed').textContent = matchState.redCompetitor.name;
    document.getElementById('nameBlue').textContent = matchState.blueCompetitor.name;
    
    // Iniciar temporizador
    updateTimerDisplay();
    startTimer();
}

// Iniciar temporizador
function startTimer() {
    matchState.isPaused = false;
    matchState.timerInterval = setInterval(() => {
        if (!matchState.isPaused && matchState.timeRemaining > 0) {
            matchState.timeRemaining--;
            updateTimerDisplay();
            
            // Verificar fin de tiempo
            if (matchState.timeRemaining === 0) {
                endMatch();
            }
        }
    }, 1000);
}

// Actualizar display del temporizador
function updateTimerDisplay() {
    const minutes = Math.floor(matchState.timeRemaining / 60);
    const seconds = matchState.timeRemaining % 60;
    const display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    const timerElement = document.getElementById('timerDisplay');
    timerElement.textContent = display;
    
    // Cambiar color según tiempo restante
    timerElement.classList.remove('warning', 'danger');
    if (matchState.timeRemaining <= 30) {
        timerElement.classList.add('danger');
    } else if (matchState.timeRemaining <= 60) {
        timerElement.classList.add('warning');
    }
}

// Pausar/Reanudar
function togglePause() {
    matchState.isPaused = !matchState.isPaused;
    
    const pauseBtn = document.getElementById('pauseBtn');
    if (matchState.isPaused) {
        pauseBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
        `;
    } else {
        pauseBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="6" y="4" width="4" height="16"/>
                <rect x="14" y="4" width="4" height="16"/>
            </svg>
        `;
    }
}

// Añadir punto
function addPoint(color, points) {
    if (matchState.isFinished) return;
    
    if (color === 'red') {
        matchState.redScore += points;
        document.getElementById('scoreRed').textContent = matchState.redScore;
    } else {
        matchState.blueScore += points;
        document.getElementById('scoreBlue').textContent = matchState.blueScore;
    }
    
    // Verificar victoria por diferencia de 8 puntos
    const diff = Math.abs(matchState.redScore - matchState.blueScore);
    if (diff >= 8) {
        setTimeout(() => {
            alert('Victoria por diferencia de 8 puntos');
            endMatch();
        }, 100);
    }
}

// Añadir penalización
function addPenalty(color, type) {
    if (matchState.isFinished) return;
    
    const penalties = color === 'red' ? matchState.redPenalties : matchState.bluePenalties;
    penalties.push(type);
    
    // Actualizar display
    const penaltiesElement = document.getElementById(color === 'red' ? 'penaltiesRed' : 'penaltiesBlue');
    penaltiesElement.textContent = penalties.join(', ');
    
    // Verificar Hansoku (descalificación automática)
    if (type === 'Hansoku') {
        setTimeout(() => {
            const winner = color === 'red' ? 'Azul' : 'Rojo';
            alert(`Hansoku - Victoria por descalificación para el competidor ${winner}`);
            endMatch();
        }, 100);
    }
}

// Finalizar combate
async function endMatch() {
    if (matchState.isFinished) return;
    
    matchState.isFinished = true;
    clearInterval(matchState.timerInterval);
    
    // Determinar ganador
    let winner, winMethod;
    if (matchState.redScore > matchState.blueScore) {
        winner = matchState.redCompetitor.id;
        winMethod = 'points';
    } else if (matchState.blueScore > matchState.redScore) {
        winner = matchState.blueCompetitor.id;
        winMethod = 'points';
    } else {
        winner = null; // Empate
        winMethod = 'draw';
    }
    
    // Verificar hansoku
    if (matchState.redPenalties.includes('Hansoku')) {
        winner = matchState.blueCompetitor.id;
        winMethod = 'hansoku';
    } else if (matchState.bluePenalties.includes('Hansoku')) {
        winner = matchState.redCompetitor.id;
        winMethod = 'hansoku';
    }
    
    // Guardar en Supabase
    await saveMatch(winner, winMethod);
    
    // Mostrar resultado
    const winnerName = winner === matchState.redCompetitor.id ? 
        matchState.redCompetitor.name : 
        winner === matchState.blueCompetitor.id ? 
        matchState.blueCompetitor.name : 
        'Empate';
    
    setTimeout(() => {
        if (confirm(`Combate finalizado.\nGanador: ${winnerName}\n\n¿Volver al inicio?`)) {
            window.location.reload();
        }
    }, 500);
}

// Guardar combate en Supabase
async function saveMatch(winnerId, winMethod) {
    try {
        // Obtener round activo (simplificado)
        const { data: rounds, error: roundError } = await supabase
            .from('rounds')
            .select('id')
            .eq('type', 'kumite')
            .limit(1);
        
        if (roundError) throw roundError;
        
        if (!rounds || rounds.length === 0) {
            console.warn('No hay ronda kumite activa');
            return;
        }
        
        // Insertar resultado del combate
        const { error } = await supabase
            .from('kumite_matches')
            .insert({
                round_id: rounds[0].id,
                competitor_red_id: matchState.redCompetitor.id,
                competitor_blue_id: matchState.blueCompetitor.id,
                red_score: matchState.redScore,
                blue_score: matchState.blueScore,
                red_penalties: matchState.redPenalties.join(','),
                blue_penalties: matchState.bluePenalties.join(','),
                winner_id: winnerId,
                win_method: winMethod
            });
        
        if (error) throw error;
        
        console.log('Match saved successfully');
        
    } catch (error) {
        console.error('Error saving match:', error);
        alert('Error al guardar el combate: ' + error.message);
    }
}
