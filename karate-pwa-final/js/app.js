// Aplicación Principal
document.addEventListener('DOMContentLoaded', async () => {
    console.log('Karate WKF PWA loaded');
    
    // Verificar estado del backend
    await checkBackendStatus();
    
    // Registrar Service Worker
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register('/sw.js');
            console.log('Service Worker registered:', registration);
        } catch (error) {
            console.error('Service Worker registration failed:', error);
        }
    }
});

// Verificar estado del backend de Supabase
async function checkBackendStatus() {
    try {
        if (supabase) {
            const { data, error } = await supabase
                .from('categories')
                .select('count')
                .limit(1);
            
            if (!error) {
                console.log('Backend conectado correctamente');
                updateStatus('online');
            } else {
                console.error('Error conectando con backend:', error);
                updateStatus('offline');
            }
        }
    } catch (error) {
        console.error('Error verificando backend:', error);
        updateStatus('offline');
    }
}

// Actualizar indicador de estado
function updateStatus(status) {
    const statusElement = document.querySelector('.footer-status span');
    if (statusElement) {
        if (status === 'online') {
            statusElement.textContent = 'En línea';
            statusElement.className = 'status-online';
        } else {
            statusElement.textContent = 'Fuera de línea';
            statusElement.className = 'status-offline';
        }
    }
}

// Función helper para mostrar notificaciones
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Estilos inline para la notificación
    Object.assign(notification.style, {
        position: 'fixed',
        top: '90px',
        right: '20px',
        padding: '16px 24px',
        borderRadius: '12px',
        backgroundColor: type === 'success' ? '#ECFDF5' : type === 'error' ? '#FEF2F2' : '#EFF6FF',
        color: type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6',
        boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
        zIndex: '1000',
        animation: 'slideInRight 250ms ease-out'
    });
    
    document.body.appendChild(notification);
    
    // Remover después de 4 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 250ms ease-in';
        setTimeout(() => notification.remove(), 250);
    }, 4000);
}
