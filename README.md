# PWA Karate WKF - Sistema de Puntuación Profesional

## 🎯 Resumen del Proyecto

Sistema completo de puntuación y gestión de competencias de Karate bajo reglas WKF (World Karate Federation). Backend 100% funcional con base de datos, lógica de negocio y API desplegada.

---

## ✅ ESTADO ACTUAL: Backend Completo

### Backend Supabase (100% funcional)

- **8 Tablas creadas** con Row Level Security
- **50 Categorías WKF** predefinidas (Infantil, Cadete, Junior, U21, Senior)
- **3 Edge Functions** desplegadas y testeadas
- **URL Base:** https://tqpxdxdanzvlomwpitsn.supabase.co

### Edge Functions Disponibles

1. **calcular-puntuacion-kata** - Cálculo WKF automático (7 jueces, elimina mayor/menor, promedia 5)
2. **asignar-categoria** - Asignación automática por edad, peso y género
3. **generar-resultados** - Rankings y medalleros automáticos

### Documentación de Diseño

- ✅ **design-specification.md** - Especificaciones completas (~2,800 palabras)
- ✅ **content-structure-plan.md** - Arquitectura MPA con 7 páginas
- ✅ **design-tokens.json** - Tokens Tailwind listos para usar

---

## 📊 Base de Datos

| Tabla | Descripción | Registros |
|-------|-------------|-----------|
| `competitions` | Eventos y competencias | - |
| `categories` | Categorías WKF | 50 predefinidas |
| `competitors` | Competidores individuales | - |
| `teams` | Equipos para modalidad grupal | - |
| `rounds` | Rondas (preliminar, semifinal, final) | - |
| `kata_scores` | Puntuaciones por juez (7 jueces) | - |
| `kumite_matches` | Combates con puntos y penalizaciones | - |
| `kata_results` | Resultados finales calculados | - |

---

## 🚀 Uso de Edge Functions

### 1. Asignar Categoría Automática

```javascript
const { data } = await supabase.functions.invoke('asignar-categoria', {
  body: {
    birth_date: '2010-05-15',
    weight: 55,
    gender: 'Varonil', 
    competition_type: 'Kumite'
  }
})
// Resultado: { category: { name: 'Junior Varonil -55kg', ... } }
```

### 2. Calcular Puntuación Kata

```javascript
const { data } = await supabase.functions.invoke('calcular-puntuacion-kata', {
  body: {
    competitor_id: 'uuid',
    round_id: 'uuid'
  }
})
// Requiere 7 puntuaciones previas en kata_scores
```

### 3. Generar Resultados

```javascript
const { data } = await supabase.functions.invoke('generar-resultados', {
  body: {
    round_id: 'uuid',
    competition_type: 'Kata' // o 'Kumite'
  }
})
// Resultado: ranking con medallas asignadas
```

---

## 🎨 Sistema de Diseño

### Paleta de Colores

- **Rojo Karate (Primary):** `#DC2626` (light) / `#F87171` (dark)
- **Azul Karate (Secondary):** `#3B82F6` (light) / `#60A5FA` (dark)  
- **Neutrales:** `#FAFAFA` a `#171717`
- **Semánticos:** Success `#10B981`, Warning `#F59E0B`, Error `#EF4444`

### Tipografía

- **Familia:** Inter (UI general), Roboto Mono (temporizadores/dorsales)
- **Tamaños especiales:** 
  - Scoreboard: 96px (puntajes principales)
  - Timer: 72px (temporizador Kumite)
  - Judge Score: 40px (puntajes por juez)

### Espaciado

- Padding tarjetas: 32-48px
- Separación secciones: 64px
- Touch targets: Mínimo 64×64px (botones críticos Kumite)

---

## 📱 Arquitectura Frontend (MPA)

### 7 Páginas Principales

1. **`/`** - Dashboard Principal
   - Hero de bienvenida
   - Selector de rol (Juez / Administrador)
   - Acceso rápido a módulos

2. **`/admin/competitions`** - Gestión de Competencias
   - Lista de eventos
   - Crear/editar competencias
   - Ver categorías WKF

3. **`/admin/competitors`** - Registro de Competidores
   - Formulario de registro
   - Tabla con filtros
   - Asignación automática de categoría

4. **`/judge/kata`** - Evaluación Kata
   - Panel de 7 jueces
   - Técnica (70%) + Atletismo (30%)
   - Cálculo WKF en tiempo real

5. **`/judge/kumite`** - Combate Kumite
   - Marcador split-screen (Rojo/Azul)
   - Temporizador 2-3 minutos
   - Botones Yuko/Waza-ari/Ippon
   - Sistema de penalizaciones

6. **`/results`** - Dashboard de Resultados
   - Ranking automático
   - Filtros por categoría/ronda/rama
   - Medalleros por Dojo/País
   - Exportación PDF/CSV

7. **`/admin/history`** - Historial y Archivo
   - Competencias pasadas
   - Búsqueda por fecha
   - Consulta de resultados históricos

---

## 🔧 Setup para Desarrollador

### 1. Instalar Dependencias

```bash
# Opción A: React
npm create vite@latest karate-wkf-pwa -- --template react-ts
cd karate-wkf-pwa
npm install @supabase/supabase-js lucide-react react-router-dom
npm install -D tailwindcss autoprefixer postcss

# Opción B: Vue
npm create vite@latest karate-wkf-pwa -- --template vue-ts
cd karate-wkf-pwa
npm install @supabase/supabase-js lucide-vue-next vue-router
npm install -D tailwindcss autoprefixer postcss
```

### 2. Configurar Supabase

```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tqpxdxdanzvlomwpitsn.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxcHhkeGRhbnp2bG9td3BpdHNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5MDM5MDYsImV4cCI6MjA3ODQ3OTkwNn0.uozxzOah2CgMLMT2_aVjJYTRZoBoBvCSViG8SqvAH4c'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### 3. Aplicar Design Tokens a Tailwind

Copiar configuración de `docs/design-tokens.json` a `tailwind.config.js`

### 4. Implementar PWA

- Crear `public/manifest.json`
- Agregar `public/sw.js` (service worker)
- Generar íconos 192×192 y 512×512

---

## 📚 Documentación Completa

- **ENTREGA.md** - Documentación técnica completa (442 líneas)
- **docs/design-specification.md** - Especificaciones de diseño (~2,800 palabras)
- **docs/content-structure-plan.md** - Arquitectura y estructura (131 líneas)
- **docs/design-tokens.json** - Tokens de diseño (147 líneas)

---

## 🎓 Categorías WKF Incluidas

### Kumite (por división de peso)

- **Cadete:** -47kg, -54kg, -61kg, +61kg (F) | -52kg, -57kg, -63kg, -70kg, +70kg (M)
- **Junior:** -48kg, -53kg, -59kg, +59kg (F) | -55kg, -61kg, -68kg, -76kg, +76kg (M)
- **U21:** -50kg, -55kg, -61kg, -68kg, +68kg (F) | -60kg, -67kg, -75kg, -84kg, +84kg (M)
- **Senior:** -50kg, -55kg, -61kg, -68kg, +68kg (F) | -60kg, -67kg, -75kg, -84kg, +84kg (M)

### Kata

- Todas las categorías (sin división de peso)

F = Femenil | M = Varonil

---

## ⚙️ Funcionalidades Técnicas

### Cálculo Kata (WKF)
1. 7 jueces puntúan: Técnica (70%) + Atletismo (30%)
2. Se calcula total por juez
3. Se eliminan el mayor y el menor
4. Se promedian los 5 puntajes restantes
5. Resultado final se guarda en `kata_results`

### Detección Victoria Kumite
- Diferencia ≥8 puntos
- Hansoku (descalificación)
- Kiken (abandono)
- Tiempo cumplido (gana quien tiene más puntos)

### Auto-guardado
Después de cada ronda, los resultados se guardan automáticamente en la base de datos.

---

## 📞 Soporte

**Desarrollado por:** MiniMax Agent  
**Fecha:** 2025-11-12  
**Versión Backend:** 1.0 (Funcional)  
**Versión Frontend:** Pendiente

---

## 📄 Licencia

Proyecto de demostración. Backend funcional disponible para integración.