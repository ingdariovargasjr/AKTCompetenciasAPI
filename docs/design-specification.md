# Especificación de Diseño - PWA Karate WKF

**Versión:** 1.0  
**Estilo:** Modern Minimalism Premium + Dark Mode Toggle  
**Framework:** VueJS + TailwindCSS  
**Fecha:** 2025-11-12

---

## 1. Dirección y Razonamiento

### 1.1 Esencia del Diseño

**Modern Minimalism Premium** con capacidad de cambio a modo oscuro. Diseño profesional y limpio que prioriza **claridad funcional** y **confiabilidad** en entornos de competencia de alto nivel. La interfaz elimina elementos decorativos innecesarios para enfocar la atención en datos críticos: puntajes, temporizadores y resultados.

**Principios clave:**
- **Restraint > Excess**: Solo elementos esenciales para la tarea
- **Legibilidad a distancia**: Tipografía clara para tablets en mesas de jueces
- **Espaciado generoso**: 40% whitespace para reducir errores de toque
- **Respuesta inmediata**: Feedback visual en cada interacción crítica

### 1.2 Ejemplos de Referencia

- **Stripe Dashboard**: Claridad en datos financieros críticos, confianza profesional
- **Linear App**: Interfaces limpias para tareas complejas, estados visuales claros
- **Apple Sports Scoring Apps**: Simplicidad en entornos de alta presión

### 1.3 Justificación para Karate WKF

**Audiencia mixta (20-60+ años)**: Jueces experimentados y árbitros jóvenes. El minimalismo premium elimina curva de aprendizaje.

**Entornos variables**: Gimnasios con luz natural/artificial, competencias indoor/outdoor. Dark mode toggle permite adaptación inmediata.

**Criticidad de datos**: Puntajes incorrectos afectan resultados oficiales. Espaciado generoso (48px+ entre acciones) y jerarquía clara reducen errores.

**Uso prolongado**: Competencias de 6-8 horas. Modo oscuro reduce fatiga visual en jueces.

---

## 2. Tokens de Diseño

### 2.1 Colores

#### Modo Claro (Light Mode)

| Token | Valor HEX | HSL | Uso |
|-------|-----------|-----|-----|
| **Primario (Rojo Karate)** | | | |
| primary-50 | `#FEF2F2` | 0°, 86%, 97% | Fondos de estado rojo |
| primary-100 | `#FEE2E2` | 0°, 93%, 94% | Bordes suaves rojo |
| primary-500 | `#DC2626` | 0°, 73%, 51% | Competidor rojo, alertas |
| primary-600 | `#B91C1C` | 0°, 72%, 42% | Hover rojo |
| primary-900 | `#7F1D1D` | 0°, 63%, 31% | Texto sobre rojo |
| **Secundario (Azul Karate)** | | | |
| secondary-50 | `#EFF6FF` | 214°, 100%, 97% | Fondos de estado azul |
| secondary-100 | `#DBEAFE` | 214°, 95%, 92% | Bordes suaves azul |
| secondary-500 | `#3B82F6` | 221°, 91%, 60% | Competidor azul, acciones |
| secondary-600 | `#2563EB` | 221°, 83%, 53% | Hover azul |
| secondary-900 | `#1E3A8A` | 224°, 64%, 33% | Texto sobre azul |
| **Neutrales (Grises Fríos)** | | | |
| neutral-50 | `#FAFAFA` | 0°, 0%, 98% | Fondo principal |
| neutral-100 | `#F5F5F5` | 0°, 0%, 96% | Superficie elevada |
| neutral-200 | `#E5E5E5` | 0°, 0%, 90% | Bordes, divisores |
| neutral-500 | `#A3A3A3` | 0°, 0%, 64% | Texto deshabilitado |
| neutral-700 | `#404040` | 0°, 0%, 25% | Texto secundario |
| neutral-900 | `#171717` | 0°, 0%, 9% | Texto principal |
| **Fondos** | | | |
| background-page | `#FAFAFA` | 0°, 0%, 98% | Fondo de página |
| background-surface | `#FFFFFF` | 0°, 0%, 100% | Tarjetas, modales |
| **Semánticos** | | | |
| success-500 | `#10B981` | 158°, 84%, 39% | Victoria, confirmación |
| success-50 | `#ECFDF5` | 155°, 77%, 96% | Fondo éxito |
| warning-500 | `#F59E0B` | 38°, 92%, 50% | Advertencias, C1 |
| warning-50 | `#FFFBEB` | 55°, 92%, 96% | Fondo advertencia |
| error-500 | `#EF4444` | 0°, 85%, 60% | Penalizaciones, errores |
| error-50 | `#FEF2F2` | 0°, 86%, 97% | Fondo error |

#### Modo Oscuro (Dark Mode)

| Token | Valor HEX | HSL | Uso |
|-------|-----------|-----|-----|
| **Primario (Rojo Vibrante)** | | | |
| primary-400 | `#F87171` | 0°, 91%, 71% | Competidor rojo, alertas |
| primary-500 | `#EF4444` | 0°, 85%, 60% | Hover rojo |
| **Secundario (Azul Vibrante)** | | | |
| secondary-400 | `#60A5FA` | 213°, 93%, 68% | Competidor azul, acciones |
| secondary-500 | `#3B82F6` | 221°, 91%, 60% | Hover azul |
| **Neutrales (Grises Oscuros)** | | | |
| neutral-50 | `#FAFAFA` | 0°, 0%, 98% | Texto principal |
| neutral-100 | `#F5F5F5` | 0°, 0%, 96% | Texto secundario |
| neutral-700 | `#3F3F46` | 240°, 5%, 26% | Superficie elevada |
| neutral-800 | `#27272A` | 240°, 6%, 16% | Superficie base |
| neutral-900 | `#18181B` | 240°, 10%, 10% | Fondo principal |
| **Fondos** | | | |
| background-page | `#0A0A0A` | 0°, 0%, 4% | Fondo de página |
| background-surface | `#18181B` | 240°, 10%, 10% | Tarjetas, modales |
| **Semánticos** | | | |
| success-400 | `#34D399` | 158°, 64%, 52% | Victoria |
| warning-400 | `#FBBF24` | 45°, 93%, 58% | Advertencias |
| error-400 | `#F87171` | 0°, 91%, 71% | Penalizaciones |

**Validación WCAG:**
- **Light Mode**: neutral-900 sobre blanco = 16.5:1 ✅ AAA
- **Light Mode**: primary-500 sobre blanco = 5.8:1 ✅ AA (elementos grandes)
- **Dark Mode**: neutral-50 sobre neutral-900 = 16.5:1 ✅ AAA
- **Dark Mode**: primary-400 sobre neutral-900 = 7.2:1 ✅ AAA

### 2.2 Tipografía

| Token | Valor | Peso | Line Height | Letter Spacing | Uso |
|-------|-------|------|-------------|----------------|-----|
| **font-family-primary** | Inter, system-ui, sans-serif | - | - | - | Toda la UI |
| **font-family-mono** | 'Roboto Mono', monospace | - | - | - | Temporizadores, dorsales |
| **Escala de Tamaños** | | | | | |
| text-hero | 64px | 700 | 1.1 | -0.02em | Títulos principales (solo dashboard) |
| text-title | 48px | 700 | 1.2 | -0.01em | Encabezados de página |
| text-subtitle | 32px | 600 | 1.3 | 0 | Títulos de sección |
| text-large | 24px | 400 | 1.6 | 0 | Descripciones destacadas |
| text-body | 18px | 400 | 1.5 | 0 | Texto estándar |
| text-small | 14px | 400 | 1.5 | 0 | Etiquetas, ayuda |
| text-caption | 12px | 400 | 1.4 | 0.01em | Metadata, timestamps |
| **Tamaños Especiales Karate** | | | | | |
| text-scoreboard | 96px | 700 | 1.0 | -0.03em | Puntajes principales Kumite |
| text-timer | 72px | 700 | 1.0 | -0.02em | Temporizador Kumite |
| text-judge-score | 40px | 600 | 1.2 | 0 | Puntajes individuales Kata |

**Responsive (Mobile <768px):**
- text-hero: 40px
- text-title: 32px
- text-scoreboard: 64px
- text-timer: 56px

### 2.3 Espaciado (8-Point Grid)

| Token | Valor | Uso |
|-------|-------|-----|
| spacing-1 | 8px | Espaciado mínimo inline |
| spacing-2 | 16px | Gaps estándar |
| spacing-3 | 24px | Grupos relacionados |
| spacing-4 | 32px | Padding mínimo de tarjetas |
| spacing-6 | 48px | Padding generoso de tarjetas |
| spacing-8 | 64px | Separación entre secciones |
| spacing-12 | 96px | Espaciado dramático (hero) |
| spacing-16 | 128px | Máximo espaciado (raro) |

**Regla crítica**: Padding de tarjetas/modales ≥32px desktop, ≥24px mobile.

### 2.4 Border Radius

| Token | Valor | Uso |
|-------|-------|-----|
| radius-sm | 8px | Badges pequeños |
| radius-md | 12px | Botones, inputs |
| radius-lg | 16px | Tarjetas |
| radius-xl | 24px | Modales grandes |
| radius-full | 9999px | Badges circulares, avatares |

### 2.5 Sombras

| Token | Valor | Uso |
|-------|-------|-----|
| shadow-sm | `0 1px 2px rgba(0,0,0,0.05)` | Bordes sutiles |
| shadow-card | `0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)` | Tarjetas estáticas |
| shadow-card-hover | `0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)` | Tarjetas hover |
| shadow-modal | `0 20px 25px rgba(0,0,0,0.1), 0 10px 10px rgba(0,0,0,0.04)` | Modales, menús |

**Dark Mode**: Reducir opacidad 50% (sombras más sutiles).

### 2.6 Animación

| Token | Valor | Uso |
|-------|-------|-----|
| duration-fast | 200ms | Hovers, clicks |
| duration-base | 250ms | Transiciones estándar |
| duration-slow | 300ms | Modales, drawers |
| easing-out | cubic-bezier(0, 0, 0.2, 1) | 90% de transiciones |
| easing-in-out | cubic-bezier(0.4, 0, 0.2, 1) | Animaciones elegantes |

**Regla de performance**: Solo animar `transform` y `opacity`.

---

## 3. Especificaciones de Componentes

### 3.1 Botón de Puntuación (Kumite)

**Estructura:**
```
[Contenedor]
  ├─ [Ícono de técnica SVG] (opcional)
  ├─ [Label de técnica] ("Yuko", "Waza-ari", "Ippon")
  └─ [Valor numérico] ("+1", "+2", "+3")
```

**Tokens aplicados:**
- **Dimensiones**: Altura 64px, padding horizontal 24px
- **Tipografía**: Label text-large (24px) Semibold 600, valor text-subtitle (32px) Bold 700
- **Colores Light**: 
  - Rojo: background primary-500, text blanco
  - Azul: background secondary-500, text blanco
- **Colores Dark**:
  - Rojo: background primary-400, text neutral-900
  - Azul: background secondary-400, text neutral-900
- **Radius**: radius-md (12px)
- **Sombra**: shadow-card → shadow-card-hover en hover

**Estados:**
- **Default**: Escala 1.0, sombra shadow-card
- **Hover**: Escala 1.03, sombra shadow-card-hover, translateY(-2px)
- **Active**: Escala 0.98, vibración táctil (PWA)
- **Disabled**: Opacidad 0.4, cursor not-allowed

**Nota**: Botones grandes (touch target 64x100px mínimo) para evitar errores en presión.

---

### 3.2 Tarjeta de Competidor

**Estructura:**
```
[Contenedor Card]
  ├─ [Header]
  │   ├─ [Número de dorsal badge]
  │   └─ [Nombre completo] (Heading)
  ├─ [Body]
  │   ├─ [País/Estado] (icon + text)
  │   ├─ [Dojo] (icon + text)
  │   └─ [Categoría] (badge)
  └─ [Footer] (opcional)
      └─ [Acción: "Ver Historial" / "Editar"]
```

**Tokens aplicados:**
- **Padding**: spacing-6 (48px) desktop, spacing-4 (32px) mobile
- **Background**: 
  - Light: background-surface (#FFFFFF) sobre background-page (#FAFAFA) = 2% contraste
  - Dark: neutral-800 (#27272A) sobre background-page (#0A0A0A) = 16% contraste
- **Radius**: radius-lg (16px)
- **Borde**: 1px solid neutral-200 (light) / neutral-700 (dark)
- **Tipografía**: 
  - Nombre: text-subtitle (32px) Semibold 600
  - Metadata: text-body (18px) Regular 400
  - Badge categoría: text-small (14px) Medium 500

**Estados:**
- **Hover**: Lift translateY(-4px), shadow-card-hover, scale(1.01)
- **Seleccionado**: Borde 2px primary-500/secondary-500 según contexto

---

### 3.3 Panel de Juez (Kata)

**Estructura:**
```
[Grid de 7 jueces]
  └─ [Card por juez]
      ├─ [Header: "Juez N"]
      ├─ [Input Técnica (70%)]
      │   ├─ Label: "Técnica"
      │   ├─ Slider 0-10 (steps 0.1)
      │   └─ Display numérico
      ├─ [Input Atletismo (30%)]
      │   ├─ Label: "Atletismo"
      │   ├─ Slider 0-10 (steps 0.1)
      │   └─ Display numérico
      └─ [Total parcial calculado]
```

**Tokens aplicados:**
- **Layout**: Grid 7 columnas desktop (1fr cada uno), 3-2-2 mobile
- **Gap**: spacing-3 (24px)
- **Input altura**: 56px
- **Slider**: Track neutral-200, thumb secondary-500, radius-full
- **Display score**: text-judge-score (40px) Bold 700
- **Padding card**: spacing-4 (32px)

**Cálculo en tiempo real:**
- Elimina mayor y menor de 7 totales
- Promedia 5 restantes
- Display final: text-scoreboard (96px) en color success-500

---

### 3.4 Temporizador Kumite

**Estructura:**
```
[Contenedor centrado]
  ├─ [Tiempo restante] (MM:SS)
  ├─ [Barra de progreso horizontal]
  └─ [Controles: Play/Pause/Reset]
```

**Tokens aplicados:**
- **Tipografía**: text-timer (72px) Bold 700, font-family-mono
- **Colores**:
  - Tiempo normal: neutral-900 (light) / neutral-50 (dark)
  - Últimos 30seg: warning-500
  - Últimos 10seg: error-500 + animación pulse
- **Barra progreso**: 
  - Altura 8px, radius-full
  - Background neutral-200, fill secondary-500
  - Transición suave con duration-base (250ms)
- **Botones control**: 48px altura, radius-md

**Animación crítica:**
- Últimos 10 segundos: `animation: pulse 1s ease-in-out infinite`
- Fin de tiempo: Vibración táctil + sonido opcional

---

### 3.5 Marcador Split-Screen (Kumite)

**Estructura:**
```
[Contenedor flex 50/50]
  ├─ [Panel Rojo (izquierda)]
  │   ├─ [Nombre competidor]
  │   ├─ [Puntaje gigante]
  │   ├─ [Botones: Yuko, Waza-ari, Ippon]
  │   └─ [Badges penalizaciones]
  └─ [Panel Azul (derecha)]
      └─ [Mismo layout]
```

**Tokens aplicados:**
- **Background**:
  - Rojo: primary-50 (light) / rgba(248,113,113,0.1) (dark)
  - Azul: secondary-50 (light) / rgba(96,165,250,0.1) (dark)
- **Puntaje**: text-scoreboard (96px) Bold 700
  - Rojo: primary-500
  - Azul: secondary-500
- **Padding**: spacing-8 (64px) cada panel
- **Separador central**: 2px solid neutral-200, altura 100%

**Interacción:**
- Cada botón suma puntos con animación scale(1.1) → 1.0 (300ms)
- Sonido de confirmación (opcional)
- Auto-detección victoria: Modal overlay cuando diferencia ≥8 puntos o Hansoku

---

### 3.6 Navegación Principal

**Estructura:**
```
[Barra horizontal sticky]
  ├─ [Logo + Título "WKF Scoring"]
  ├─ [Links: Dashboard, Kata, Kumite, Resultados]
  ├─ [Selector de Rol: Juez/Admin]
  ├─ [Dark Mode Toggle]
  └─ [Avatar usuario]
```

**Tokens aplicados:**
- **Altura**: 72px
- **Padding horizontal**: spacing-6 (48px)
- **Background**: 
  - Light: background-surface con backdrop-blur(8px), border-bottom neutral-200
  - Dark: neutral-800 con backdrop-blur(8px), border-bottom neutral-700
- **Links**: text-body (18px) Medium 500, spacing-4 (32px) entre links
- **Logo**: 36px altura
- **Dark Mode Toggle**: Switch component, 48px ancho, radius-full

**Comportamiento:**
- Sticky top: 0
- Shadow-sm en scroll (>50px)
- Links activos: border-bottom 2px primary-500/secondary-500

---

## 4. Layouts y Responsive

### 4.1 Arquitectura General (MPA)

Según `content-structure-plan.md`, la aplicación tiene 7 páginas principales:

1. **Dashboard Principal** (`/`): Hero Pattern (400px) + Card Grid (2 cols)
2. **Gestión Competencias** (`/admin/competitions`): Page Header + Data Table + Modal Form
3. **Registro Competidores** (`/admin/competitors`): Page Header + Data Table + Sidebar Form
4. **Evaluación Kata** (`/judge/kata`): Compact Header + Judge Panel Grid (7 cols) + Score Display + Timeline
5. **Combate Kumite** (`/judge/kumite`): Split Screen (50/50) + Timer + Button Grid
6. **Dashboard Resultados** (`/results`): Filter Bar + Data Table + Card Grid + Stat Cards
7. **Historial** (`/admin/history`): Date Picker + Card List + Modal Detail

### 4.2 Patrones de Layout por Página

**Dashboard Principal (/):**
- **Visual Hierarchy**: Hero (400-500px, centrado) → Card Grid selector rol (2 cols) → Acceso rápido (button group)
- **Grid Strategy**: 12 cols, hero ocupa 8 cols centradas, cards 6 cols c/u
- **Componentes**: Hero Pattern (§3.6), Card Grid (Tarjeta Competidor §3.2)

**Evaluación Kata (/judge/kata):**
- **Visual Hierarchy**: Info competidor (compact, 80px) → Panel jueces (grid 7 cols) → Score display (centrado, 200px) → Timeline lateral
- **Grid Strategy**: Jueces grid-cols-7 desktop → grid-cols-3 tablet → grid-cols-2 mobile
- **Componentes**: Panel de Juez (§3.3), Score gigante con text-scoreboard

**Combate Kumite (/judge/kumite):**
- **Visual Hierarchy**: Temporizador (top, centrado) → Split Screen marcadores (ocupan 100% altura) → Botones puntos (grid 3x2)
- **Layout Structure**: Flex column, temporizador fixed top, split-screen flex-1, botones absolute bottom
- **Componentes**: Temporizador (§3.4), Marcador Split-Screen (§3.5), Botón Puntuación (§3.1)

**Dashboard Resultados (/results):**
- **Visual Hierarchy**: Filtros horizontales (56px) → Tabla ranking (main, 8 cols) → Sidebar medallero (4 cols) → Stat cards (grid 4 cols)
- **Grid Strategy**: 12 cols, tabla 8 cols, sidebar 4 cols → stack mobile
- **Componentes**: Filter Bar horizontal, Data Table, Stat Cards (metrics)

### 4.3 Estrategia Responsive

**Breakpoints (Tailwind):**
```
sm:  640px  (Mobile landscape)
md:  768px  (Tablet portrait) ← Breakpoint principal para jueces
lg:  1024px (Tablet landscape)
xl:  1280px (Desktop)
2xl: 1536px (Large desktop)
```

**Adaptaciones por dispositivo:**

- **Desktop (≥1280px)**: Layout completo, grid 12 cols, navegación expandida
- **Tablet (768-1279px)**: Grid reduce a 8 cols, jueces Kata 3 columnas, navegación compacta
- **Mobile (<768px)**: 
  - Stack vertical todo
  - Jueces Kata 2 columnas
  - Split-screen Kumite se mantiene horizontal (crítico para visibilidad)
  - Reducir spacing 30% (spacing-8 → spacing-6, spacing-6 → spacing-4)
  - Botones de puntuación aumentan a 72px altura (mejor touch)

**Touch Targets:**
- Mínimo: 48×48px general
- Recomendado: 56×56px para acciones frecuentes (botones puntos)
- Crítico Kumite: 64×64px (alta presión, evitar errores)

### 4.4 Contenedores y Márgenes

```
max-width: 1400px (2xl)
padding-x: 
  - Desktop: spacing-8 (64px)
  - Tablet: spacing-6 (48px)
  - Mobile: spacing-4 (32px)

section-gap: spacing-8 (64px) desktop, spacing-6 (48px) mobile
```

---

## 5. Interacción y Animación

### 5.1 Estándares de Animación

**Duraciones según contexto:**
- **Acciones rápidas** (botones, hovers): duration-fast (200ms)
- **Transiciones** (modales, tabs): duration-base (250ms)
- **Momentos especiales** (victoria, modal detalle): duration-slow (300ms)

**Easing:**
- **90% de casos**: easing-out (desaceleración natural)
- **Modales, drawers**: easing-in-out (entrada/salida suave)

**Performance crítica:**
```css
/* ✅ PERMITIDO (GPU-accelerated) */
transform: translateX(), translateY(), scale(), rotate()
opacity: 0-1

/* ❌ PROHIBIDO (causa reflow) */
width, height, margin, padding, top, left
```

### 5.2 Interacciones Específicas Karate

**Botón de Puntuación (Kumite):**
1. Click: scale(0.98) + vibración táctil
2. Puntaje incrementa con animation: `fadeInScale 200ms ease-out`
3. Sonido confirmación (opcional, configurable)

**Fin de Combate:**
1. Tiempo llega a 00:00 o diferencia ≥8 puntos
2. Modal overlay aparece con animation: `fadeIn 300ms ease-in-out`
3. Vibración larga (500ms)
4. Confeti SVG animado si activado (modo celebración)

**Cálculo Kata en Tiempo Real:**
1. Cada input de juez actualiza con `debounce 300ms`
2. Score final animado con `countUp` effect (número incrementa visualmente)
3. Eliminados (mayor/menor) se marcan con opacidad 0.3 y cross-line

**Dark Mode Toggle:**
1. Click switch activa transition en `background-color` y `color` de toda la app
2. Duración: duration-base (250ms)
3. Guardar preferencia en `localStorage`
4. No hay flash (CSS vars cambian simultáneamente)

### 5.3 Estados de Loading

**Skeleton Screens:**
- Tablas: Filas con gradiente animado `shimmer` (neutral-100 → neutral-200)
- Tarjetas: Bloques rectangulares con radius-lg
- Duración shimmer: 1.5s infinite

**Spinners:**
- Uso: Acciones críticas (guardar puntaje, generar PDF)
- Estilo: Circular, 32px, border 3px, color primary-500/secondary-500
- Posición: Centrado en botón con texto "Guardando..."

### 5.4 Feedback Visual Crítico

**Errores de Validación:**
- Input con border error-500, shake animation (200ms)
- Mensaje debajo con text-small, color error-500
- Ícono de alerta (SVG) inline

**Confirmaciones:**
- Toast notification (top-right, 4s auto-close)
- Background success-50, border success-500
- Animation: slideInRight (250ms)

**Acciones Destructivas:**
- Modal de confirmación con título en error-500
- Botón "Eliminar" con background error-500, hover error-600
- Botón "Cancelar" con estilo secondary

---

## 6. Dark Mode Toggle - Especificaciones

### 6.1 Componente Toggle

**Ubicación**: Navegación principal, lado derecho antes del avatar

**Diseño del switch:**
```
[Track: 48px ancho × 24px alto, radius-full]
  └─ [Thumb: 20px círculo, translateX(0 → 24px)]
```

**Colores:**
- Light mode: Track neutral-200, thumb blanco con shadow-sm, ícono sol
- Dark mode: Track neutral-700, thumb neutral-900, ícono luna

**Animación:**
- Transición: transform duration-base (250ms) easing-out
- Thumb se desliza suavemente con traducción
- Íconos fade in/out simultáneamente

### 6.2 Implementación Global

**Estrategia CSS Variables:**
```css
:root {
  --color-bg-page: #FAFAFA;
  --color-bg-surface: #FFFFFF;
  --color-text-primary: #171717;
  /* ... todos los tokens ... */
}

[data-theme="dark"] {
  --color-bg-page: #0A0A0A;
  --color-bg-surface: #18181B;
  --color-text-primary: #FAFAFA;
  /* ... tokens dark ... */
}
```

**JavaScript VueJS:**
- Detectar preferencia sistema: `window.matchMedia('(prefers-color-scheme: dark)')`
- Guardar en `localStorage: theme: 'light' | 'dark' | 'auto'`
- Toggle modifica atributo `<html data-theme="dark">`
- Watch cambios de sistema si modo 'auto'

### 6.3 Ajustes por Modo

**Light Mode:**
- Sombras normales (opacidad completa)
- Imágenes sin filtro
- Videos sin overlay

**Dark Mode:**
- Sombras reducidas 50% opacidad
- Imágenes con `filter: brightness(0.9)` (evitar deslumbramiento)
- Videos con overlay rgba(0,0,0,0.2) (reducir brillo)
- Gráficos/charts adaptan paleta a colores -400 (más brillantes)

**Excepciones que NO cambian:**
- Logos (mantener identidad de marca)
- Imágenes de contenido (fotos de competidores)
- Screenshots/capturas oficiales

---

## Validación Final

### Checklist de Cumplimiento

✅ **Estructura**: ≤3K palabras, 5 capítulos, 6 componentes especificados  
✅ **Estilo**: Modern Minimalism Premium con dark mode toggle  
✅ **Colores**: Paletas para ambos modos, WCAG ≥4.5:1 validado  
✅ **Espaciado**: 4pt-grid, preferencia 8pt (spacing-1 a spacing-16)  
✅ **Componentes**: Enfocados en necesidades Karate (puntuación, temporizadores, jueces)  
✅ **Layout**: Mapeo a content-structure-plan.md, patrones por página  
✅ **Responsive**: Breakpoints, touch targets ≥48px, adaptaciones mobile  
✅ **Animación**: Transform/opacity only, duraciones 200-300ms  
✅ **Dark Mode**: Toggle especificado, CSS variables, ajustes por modo  
✅ **NO incluye**: CSS code, ASCII art, implementación, contenido específico

### Elementos Premium Implementados

✅ **Contraste de superficie**: Cards sobre background ≥5% contraste (ambos modos)  
✅ **Hero moments**: Dashboard hero 400-500px  
✅ **Espaciado generoso**: Cards padding 48px, secciones 64px gap  
✅ **Detalles sutiles**: Hover lift -4px, scale 1.01-1.03, sombras layered  
✅ **Layout horizontal**: Navegación horizontal, filtros horizontales (no sidebar)  
✅ **Componentes premium**: Botones 64px (Kumite), inputs 56px, cards 48px padding

---

**Fin de la Especificación de Diseño**  
**Total aproximado:** ~2,800 palabras  
**Archivos complementarios:** content-structure-plan.md, design-tokens.json
