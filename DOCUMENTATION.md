# 🏀 Basketball Stats Tracker - Documentación Completa

## Resumen del Proyecto

Una aplicación web moderna y reactiva para registrar estadísticas de baloncesto en tiempo real. Diseñada para capturar datos detallados de cada jugador, equipo y momento del partido.

### Características Principales ✨

- ✅ **Registro por Jugador**: 2 puntos, 3 puntos, faltas, rebotes, asistencias
- ✅ **Gestión de Equipo**: Selector de 5 v 5, cambios en cualquier momento
- ✅ **Control de Tiempo**: Cronómetro de 10 minutos, pausable y editable
- ✅ **Puntuación en Vivo**: Contador de puntos por equipo
- ✅ **Historial de Eventos**: Log con timestamps (minuto y cuarto)
- ✅ **Exportación de Datos**: Descargar estadísticas en JSON

---

## Instalación y Setup

### Requisitos Previos
- Node.js 16+ instalado
- npm o yarn

### Pasos de Instalación

```bash
# 1. Abre la carpeta del proyecto
cd "c:\Users\dalejo\Documents\DAR\Apps\Basket stats data"

# 2. Instala dependencias
npm install

# 3. Inicia el servidor de desarrollo
npm run dev

# 4. Abre en el navegador
# Se abrirá automáticamente en http://localhost:3000
```

### Alternativa - Script de Inicio (Windows)
```bash
# Ejecuta el archivo start.bat
# Esto instalará dependencias (si es necesario) e iniciará la app automáticamente
start.bat
```

---

## Estructura del Proyecto

```
basketball-stats/
├── src/
│   ├── components/                  # Componentes React
│   │   ├── PlayerGrid.tsx           # Selector de jugadores
│   │   ├── PlayerStatsDisplay.tsx    # Estadísticas del jugador
│   │   ├── ActionButtons.tsx         # Botones de acciones
│   │   ├── QuarterTimer.tsx          # Cronómetro y puntuación
│   │   ├── GameEventLog.tsx          # Historial de eventos
│   │   └── TeamSummary.tsx           # Resumen del equipo
│   ├── hooks/
│   │   └── useQuarterTimer.ts        # Hook para el cronómetro
│   ├── types/
│   │   └── index.ts                  # Tipos TypeScript
│   ├── config/
│   │   └── playersConfig.ts          # Configuración de jugadores
│   ├── App.tsx                       # Componente principal
│   ├── main.tsx                      # Entry point
│   ├── App.css                       # Estilos de la app
│   └── index.css                     # Estilos globales
├── public/                           # Archivos públicos
├── package.json                      # Dependencias
├── tsconfig.json                     # Configuración TypeScript
├── vite.config.ts                    # Configuración Vite
├── tailwind.config.js                # Configuración Tailwind
├── postcss.config.js                 # Configuración PostCSS
├── index.html                        # HTML principal
├── README.md                         # Información general
├── USAGE_GUIDE.md                    # Guía de uso
└── start.bat                         # Script de inicio (Windows)
```

---

## Flujo de la Aplicación

### Pantalla Principal - Layout de 3 Columnas

```
┌─────────────────┬─────────────────┬─────────────────┐
│                 │                 │                 │
│   IZQUIERDA     │    CENTRO       │    DERECHA      │
│                 │                 │                 │
│  • Cronómetro   │  • Equipo       │  • Acciones     │
│  • Score        │  • Jugadores    │  • Cambios      │
│  • Resúmenes    │  • Stats        │  • Historial    │
│                 │                 │                 │
└─────────────────┴─────────────────┴─────────────────┘
```

### Flujo de Usuario

1. **Selecciona Equipo** → Local o Visitante
2. **Selecciona Jugador** → Haz clic en su número/nombre
3. **Registra Acción** → +2, +3, Falta, Rebote, Asistencia
4. **Gestiona Tiempo** → Inicia, pausa, edita, cambia cuarto
5. **Realiza Cambios** → Saca/mete jugadores del campo
6. **Revisa Eventos** → Ve el historial de acciones
7. **Exporta Datos** → Descarga las estadísticas

---

## Tipos de Datos

### Player
```typescript
interface Player {
  id: string;              // Identificador único
  number: number;          // Número de dorsal
  name: string;            // Nombre del jugador
  team: 'home' | 'away';   // Equipo
  points2: number;         // Tiros de 2 anotados
  points3: number;         // Tiros de 3 anotados
  fouls: number;           // Faltas personales
  rebounds: number;        // Rebotes
  assists: number;         // Asistencias
}
```

### PlayEvent
```typescript
interface PlayEvent {
  timestamp: string;       // "Minuto 5 Cuarto 2"
  quarter: number;         // 1-4
  minute: number;          // 0-10
  second: number;          // 0-59
  playerId: string;        // ID del jugador
  playerName: string;      // Nombre del jugador
  playerNumber: number;    // Número de dorsal
  team: 'home' | 'away';   // Equipo
  action: string;          // 'points2' | 'points3' | 'foul' | 'rebound' | 'assist'
  teamStats: TeamStats;    // Stats del equipo al momento
}
```

### TeamStats
```typescript
interface TeamStats {
  totalPoints: number;     // Puntos totales
  totalFouls: number;      // Faltas totales
  field2Points: number;    // Tiros de 2 convertidos
  field3Points: number;    // Tiros de 3 convertidos
  totalRebounds: number;   // Rebotes totales
  totalAssists: number;    // Asistencias totales
}
```

---

## Funcionalidades Detalladas

### 1. Selección de Jugadores

**Componente**: `PlayerGrid.tsx`

- Muestra todos los jugadores del equipo seleccionado
- Grid responsive (2-4 columnas según pantalla)
- Resaltado verde = jugador en el campo
- Resaltado gris = jugador en banca

```typescript
// Uso
<PlayerGrid
  players={players}
  onField={onField}
  onSelectPlayer={handleSelectPlayer}
  team={selectedTeam}
/>
```

### 2. Acciones de Jugador

**Componente**: `ActionButtons.tsx`

- 5 botones de acción principales
- Deshabilitados si no hay jugador seleccionado
- Cada acción incrementa la estadística correspondiente

```typescript
const handleAction = (action: string) => {
  // Actualiza stats del jugador
  // Crea un evento con timestamp
  // Calcula stats del equipo
};
```

### 3. Cronómetro del Cuarto

**Componente**: `QuarterTimer.tsx`
**Hook**: `useQuarterTimer.ts`

- Cuenta regresiva de 10 minutos
- Pueden pausarse y reanudarse
- Edición manual de tiempo
- Navegación entre cuartos

```typescript
const { timer, toggleTimer, resetTimer, setTimeManually } = useQuarterTimer();
```

### 4. Gestión de Cambios

**En el panel de Cambios**:

- Máximo 5 jugadores por equipo en el campo
- Click para sacar/meter jugadores
- Visualización por equipo
- Contador de jugadores en el campo

### 5. Registro de Eventos

**Componente**: `GameEventLog.tsx`

- Historial de todos los eventos
- Mostrados en orden inverso (último primero)
- Información: jugador, acción, tiempo, equipo
- Scroll automático para muchos eventos

### 6. Resumen de Equipo

**Componente**: `TeamSummary.tsx`

- Puntos totales del equipo
- Faltas totales
- Rebotes totales
- Asistencias totales
- Listado de jugadores con puntos individuales

### 7. Exportación de Datos

**Formato**: JSON

```json
{
  "gameDate": "2024-01-15T14:30:00.000Z",
  "finalStats": {
    "home": {
      "totalPoints": 78,
      "totalFouls": 12,
      "field2Points": 25,
      "field3Points": 8,
      "totalRebounds": 45,
      "totalAssists": 18,
      "players": [/* array de jugadores */]
    },
    "away": {/* similar */}
  },
  "events": [/* array de todos los eventos */]
}
```

---

## Personalización

### Cambiar Nombres de Jugadores

Edita `src/config/playersConfig.ts`:

```typescript
export const TEAM_CONFIG = {
  home: {
    name: 'Equipo Local',
    players: [
      { number: 1, name: 'Tu Base' },
      { number: 2, name: 'Tu Escolta' },
      // ...
    ],
  },
  away: {
    name: 'Equipo Visitante',
    players: [
      { number: 1, name: 'Base Rival' },
      // ...
    ],
  },
};
```

Después: `npm run dev`

### Cambiar Colores (Tailwind)

Modifica `tailwind.config.js`:

```javascript
export default {
  theme: {
    extend: {
      colors: {
        // Tus colores personalizados
      },
    },
  },
}
```

### Cambiar Duración de Cuarto

En `src/hooks/useQuarterTimer.ts`:

```typescript
const [timer, setTimer] = useState<Timer>({
  minute: 10,  // ← Cambia aquí (en minutos)
  second: 0,
  isRunning: false,
});
```

---

## Scripts Disponibles

```bash
npm run dev      # Inicia servidor de desarrollo con hot reload
npm run build    # Compila para producción
npm run preview  # Vista previa de la compilación
npm run type-check  # Verifica tipos TypeScript
```

---

## Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| React | 18.2.0 | Framework UI |
| TypeScript | 5.3.0 | Tipado estático |
| Tailwind CSS | 3.3.0 | Estilos |
| Vite | 5.0.0 | Bundler |
| Vite React Plugin | 4.2.0 | Soporte JSX |

---

## Performance y Optimizaciones

- ✅ Componentes funcionales con hooks
- ✅ Re-renders optimizados con useState/useEffect
- ✅ Tipado TypeScript completo
- ✅ Build de producción minificado (~50KB gzip)
- ✅ CSS purificado con Tailwind
- ✅ Sin dependencias externas innecesarias

---

## Navegadores Soportados

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

---

## Limitaciones Actuales

- Sin función "deshacer" para eventos
- Sin sincronización en la nube
- Sin soporte para múltiples pantallas
- Sin importación de datos previos
- Sin autenticación

---

## Mejoras Futuras (Roadmap)

- [ ] Función "deshacer" última acción
- [ ] Soporte para timeouts
- [ ] Estadísticas avanzadas (porcentaje de tiro, etc.)
- [ ] Exportar a CSV/Excel
- [ ] Sincronización en la nube (Firebase)
- [ ] Modo oscuro
- [ ] Análisis de estadísticas
- [ ] Comparación de partidos
- [ ] API REST para integración

---

## Troubleshooting

### La app no inicia

```bash
# Limpia node_modules
rmdir /s node_modules
npm install
npm run dev
```

### Error de permisos (Windows)

```bash
# Ejecuta PowerShell como administrador
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Puerto 3000 en uso

```bash
# Cambia el puerto en vite.config.ts
server: {
  port: 3001,  // o el puerto que prefieras
}
```

---

## Contacto y Soporte

Para dudas, sugerencias o reportar bugs, puedes:
- Revisar la `USAGE_GUIDE.md` para guía de uso
- Verificar la estructura del proyecto
- Consultar la documentación de React: https://react.dev

---

## Licencia

MIT - Libre para uso personal y comercial

---

**Última actualización**: Noviembre 2025  
**Versión**: 1.0.0  
**Estado**: ✅ Producción

---

¡Disfruta rastreando baloncesto! 🏀✨
