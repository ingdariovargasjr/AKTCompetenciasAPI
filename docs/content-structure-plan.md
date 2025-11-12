# Plan de Estructura de Contenido - PWA Karate WKF

## 1. Inventario de Materiales
**Archivos de Contenido:**
- `user_input_files/pasted-text-2025-11-12T02-21-10.txt` (~307 líneas, especificaciones técnicas WKF)

**Recursos Visuales:**
- No disponibles actualmente (se requerirán íconos SVG de bibliotecas públicas)

**Archivos de Datos:**
- No disponibles (la aplicación generará datos en tiempo real vía Supabase)

**Gráficos:**
- No disponibles (se generarán dinámicamente según resultados)

## 2. Estructura del Sitio Web
**Tipo:** MPA (Multi-Page Application)

**Razonamiento:** 
- Múltiples módulos diferenciados con funcionalidades independientes (Kata, Kumite, Gestión, Resultados)
- Dos roles de usuario distintos con necesidades diferentes (Juez/Administrador)
- Alta densidad de información distribuida en múltiples contextos
- Workflows complejos que requieren navegación entre estados (registro → competencia → resultados)
- Más de 6 secciones principales con lógica de negocio independiente

## 3. Desglose de Páginas/Secciones

### Página 1: Dashboard Principal (`/`)
**Propósito**: Punto de entrada para seleccionar rol y navegar a módulos

**Mapeo de Contenido:**

| Sección | Patrón de Componente | Fuente de Datos | Contenido a Extraer | Recurso Visual (Solo contenido) |
|---------|---------------------|-----------------|---------------------|----------------------------------|
| Hero de Bienvenida | Hero Pattern | Manual | Título: "Sistema WKF de Puntuación", subtítulo: "Kata y Kumite" | - |
| Selector de Rol | Card Grid (2 cards) | Manual | Títulos: "Modo Juez" / "Modo Administrador", descripciones breves | - |
| Acceso Rápido | Button Group | Manual | Enlaces: "Nueva Competencia Kata", "Nueva Competencia Kumite", "Ver Resultados" | - |

### Página 2: Gestión de Competencias (`/admin/competitions`)
**Propósito**: Administradores crean y configuran competencias

**Mapeo de Contenido:**

| Sección | Patrón de Componente | Fuente de Datos | Contenido a Extraer | Recurso Visual |
|---------|---------------------|-----------------|---------------------|----------------|
| Encabezado de Página | Page Header | Manual | Título: "Gestión de Competencias" | - |
| Lista de Competencias | Data Table | Supabase: tabla `competitions` | Campos: nombre, fecha, tipo, estado, num_competidores | - |
| Formulario Nueva Competencia | Modal Form | Manual | Campos: nombre, categoría, rama, tipo, ronda | - |
| Categorías WKF | Info Cards Grid | `pasted-text` L124-243 | Divisiones por peso: Infantil, Cadete, Junior, U21, Senior | - |

### Página 3: Registro de Competidores (`/admin/competitors`)
**Propósito**: Registrar competidores/equipos con datos completos

**Mapeo de Contenido:**

| Sección | Patrón de Componente | Fuente de Datos | Contenido a Extraer | Recurso Visual |
|---------|---------------------|-----------------|---------------------|----------------|
| Encabezado | Page Header | Manual | Título: "Registro de Competidores" | - |
| Tabla Competidores | Data Table con filtros | Supabase: tabla `competitors` | Campos: nombre, país, dojo, categoría, peso, dorsal | - |
| Formulario Registro | Sidebar Form | Manual | Campos: nombre completo, fecha nacimiento, país/estado/dojo, peso, tipo | - |
| Asignación Automática | Alert Component | `pasted-text` L246-262 | Reglas: categoría por edad/peso, validaciones | - |

### Página 4: Evaluación Kata (`/judge/kata`)
**Propósito**: Interfaz para 7 jueces evaluar Kata en tiempo real

**Mapeo de Contenido:**

| Sección | Patrón de Componente | Fuente de Datos | Contenido a Extraer | Recurso Visual |
|---------|---------------------|-----------------|---------------------|----------------|
| Info Competidor | Compact Header | Supabase: competidor actual | Nombre, dojo, categoría | - |
| Panel de Puntuación | Custom Judge Panel (7 jueces) | Manual | Labels: "Juez 1-7", inputs: "Técnica (70%)", "Atletismo (30%)" | - |
| Cálculo en Tiempo Real | Score Display (grande) | `pasted-text` L51-82 | Lógica: elimina mayor/menor, promedia 5 restantes | - |
| Historial de Ronda | Timeline vertical | Supabase: tabla `kata_scores` | Competidores evaluados, puntajes finales | - |

### Página 5: Combate Kumite (`/judge/kumite`)
**Propósito**: Marcador en tiempo real para combates Kumite

**Mapeo de Contenido:**

| Sección | Patrón de Componente | Fuente de Datos | Contenido a Extraer | Recurso Visual |
|---------|---------------------|-----------------|---------------------|----------------|
| Marcador Principal | Split Screen (50/50) | Supabase: combate actual | Competidor Rojo vs Azul, puntajes acumulados | - |
| Temporizador | Large Timer Display | Manual | Tiempo configurable: 2-3 minutos, cuenta regresiva | - |
| Botones de Puntos | Button Grid (6 botones) | `pasted-text` L94-112 | Yuko (1), Waza-ari (2), Ippon (3) × 2 competidores | - |
| Penalizaciones | Alert Badges | `pasted-text` L94-112 | C1, C2, Hansoku, Kiken por competidor | - |
| Detección de Victoria | Modal Overlay | `pasted-text` L111-112 | Condiciones: diferencia 8 puntos, Hansoku, tiempo cumplido | - |

### Página 6: Dashboard de Resultados (`/results`)
**Propósito**: Visualizar ranking, medalleros y estadísticas

**Mapeo de Contenido:**

| Sección | Patrón de Componente | Fuente de Datos | Contenido a Extraer | Recurso Visual |
|---------|---------------------|-----------------|---------------------|----------------|
| Filtros | Horizontal Filter Bar | Manual | Filtros: categoría, ronda, rama (F/M), tipo (Individual/Equipo) | - |
| Tabla de Ranking | Data Table ordenable | Supabase: `kata_scores` + `kumite_matches` | Posición, nombre, dojo/país, puntaje/puntos, medalla | - |
| Medallero | Card Grid (3 cols) | Supabase: agregación | Oro, Plata, Bronce por Dojo/País | - |
| Estadísticas Generales | Stat Cards (4 cards) | Supabase: agregación | Total competidores, total combates, dojos participantes, categorías activas | - |
| Exportación | Button Group | Manual | Botones: "Exportar PDF", "Exportar CSV" | - |

### Página 7: Historial y Archivo (`/admin/history`)
**Propósito**: Consultar competencias pasadas

**Mapeo de Contenido:**

| Sección | Patrón de Componente | Fuente de Datos | Contenido a Extraer | Recurso Visual |
|---------|---------------------|-----------------|---------------------|----------------|
| Filtro por Fecha | Date Range Picker | Supabase: competencias archivadas | Rango de fechas, búsqueda por nombre | - |
| Lista de Eventos | Card List | Supabase: tabla `competitions` (archivadas) | Nombre evento, fecha, ubicación, total competidores | - |
| Detalle de Evento | Modal con tabs | Supabase: datos relacionados | Tabs: Resultados Kata, Resultados Kumite, Participantes | - |

## 4. Análisis de Contenido

**Densidad de Información:** Alta
- Aplicación data-driven con múltiples tablas y cálculos en tiempo real
- Formularios complejos con validaciones automáticas (categorías por edad/peso)
- Visualizaciones dinámicas (temporizadores, marcadores, rankings)

**Balance de Contenido:**
- Imágenes: 0% (aplicación funcional, no requiere imágenes decorativas)
- Datos/Tablas: 70% (tablas de competidores, resultados, rankings, estadísticas)
- Texto: 20% (labels, instrucciones, ayudas contextuales)
- Componentes Interactivos: 10% (botones de puntuación, temporizadores, filtros)
- **Tipo de Contenido:** Data-driven / Dashboard-oriented

**Consideraciones Especiales:**
- **Modo Juez**: Interfaz simplificada, solo evaluación (páginas 4 y 5)
- **Modo Administrador**: Acceso completo a gestión y resultados (páginas 2, 3, 6, 7)
- **PWA**: Manifest y Service Workers para instalación y offline-first
- **Dark Mode Toggle**: Disponible en todas las páginas vía switch en navegación
- **Responsive**: Tablet-first para jueces (uso en mesas), mobile-optimized para consultas
