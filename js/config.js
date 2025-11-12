// Configuración de Supabase
const SUPABASE_URL = 'https://tqpxdxdanzvlomwpitsn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxcHhkeGRhbnp2bG9td3BpdHNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5MDM5MDYsImV4cCI6MjA3ODQ3OTkwNn0.uozxzOah2CgMLMT2_aVjJYTRZoBoBvCSViG8SqvAH4c';

// Cliente Supabase global
let supabase;

// Inicializar Supabase cuando esté disponible
document.addEventListener('DOMContentLoaded', () => {
    if (typeof window.supabase !== 'undefined') {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log('Supabase client initialized');
    } else {
        console.error('Supabase library not loaded');
    }
});
