# Basketball Stats Tracker - Documentación Completa

## Resumen del Proyecto

Aplicación web moderna y reactiva para registrar estadísticas de baloncesto en tiempo real. Tema dark premium con glass morphism, diseño responsivo y modales accesibles.

### Características Principales

- ✅ **10 tipos de acciones**: +1, +2, +3 puntos, falta, falta técnica, falta antideportiva, rebote, asistencia, robo, pérdida
- ✅ **Gestión de Equipo**: 5 v 5 por defecto, cambios en cualquier momento
- ✅ **Control de Tiempo**: Cronómetro de 10 minutos, pausable y editable
- ✅ **Expulsión automática**: A 5 faltas personales o 2 faltas técnicas/antideportivas
- ✅ **Deshacer**: Botón para revertir última acción
- ✅ **Edición de equipos**: Nombres y números personalizables
- ✅ **Historial de eventos**: Log con timestamps, edición y eliminación
- ✅ **Exportación de datos**: Descarga en JSON
- ✅ **Tema premium**: Dark mode con glass morphism y animaciones
- ✅ **Scroll seguro**: Modales sin scrollear el fondo

---

## Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Verificar tipos TypeScript
npm run type-check
```

---

## Estructura del Proyecto

```
src/
├── components/
│   ├── ActionButtons.tsx         # 10 botones de acciones
│   ├── EditTeamsModal.tsx        # Modal editar equipos
│   ├── FoulOutModal.tsx          # Modal expulsión por faltas
│   ├── GameEventLog.tsx          # Registro de eventos
│   ├── PlayerActionSelector.tsx  # Selector de jugadores
│   ├── QuarterTimer.tsx          # Cronómetro y puntuación
│   ├── TabNavigation.tsx         # Navegación entre tabs
│   └── tabs/
│       ├── ActionsTab.tsx        # Tab acciones (3 layouts)
│       └── SummaryTab.tsx        # Tab resumen
├── hooks/
│   ├── useBodyScrollLock.ts      # Bloqueo scroll modales
│   ├── useGameState.ts           # Estado del juego
│   ├── usePlayerActions.ts       # Acciones de jugadores
│   └── useQuarterTimer.ts        # Cronómetro
├── config/
│   └── playersConfig.ts          # Configuración inicial
├── types/
│   └── index.ts                  # Tipos TypeScript
├── App.tsx                       # Componente principal
├── App.css                       # Estilos app (glass morphism)
├── index.css                     # Estilos globales y modales
└── main.tsx                      # Entry point
```

---

## Tipos de Datos

### Player
```typescript
interface Player {
  id: string;
  number: number;
  name: string;
  team: 'home' | 'away';
  points1: number;    // Tiros libres
  points2: number;    // Tiros de 2
  points3: number;    // Tiros de 3
  fouls: number;      // Faltas personales
  rebounds: number;   // Rebotes
  assists: number;    // Asistencias
  steals: number;     // Robos
  turnovers: number;  // Pérdidas
  technicalFouls: number;    // Faltas técnicas
  unsportingFouls: number;   // Faltas antideportivas
}
```

### PlayEvent
```typescript
interface PlayEvent {
  id?: string;
  timestamp: string;       // "Minuto 5 Cuarto 2"
  quarter: number;         // 1-4
  minute: number;
  second: number;
  playerId: string;
  playerName: string;
  playerNumber: number;
  team: 'home' | 'away';
  action: 'points1' | 'points2' | 'points3' | 'foul' | 
          'technical_foul' | 'unsporting_foul' | 'rebound' | 
          'assist' | 'steal' | 'turnover';
  teamStats: TeamStats;
}
```

### TeamStats
```typescript
interface TeamStats {
  totalPoints: number;
  totalFouls: number;
  field1Points: number;    // Tiros libres
  field2Points: number;    // Tiros de 2
  field3Points: number;    // Tiros de 3
  totalRebounds: number;
  totalAssists: number;
  totalSteals: number;
  totalTurnovers: number;
}
```

---

## Funcionalidades Detalladas

### 1. Acciones de Jugador

**Componente**: `ActionButtons.tsx`

10 botones de acción:
- **+1, +2, +3**: Puntuación (Bulls rojo)
- **Falta, Técnica, Anti.**: Faltas (ámbar/rojo)
- **Rebote**: Rebotes (blanco)
- **Ast.**: Asistencias (neón verde)
- **Robo, Pérd.**: Robos/pérdidas (púrpura/naranja)

Deshabilitados si no hay jugador seleccionado o no está en cancha.

### 2. Expulsión por Faltas

**Componente**: `FoulOutModal.tsx`

Se activa automáticamente cuando:
- 5 faltas personales
- 2 faltas técnicas
- 2 faltas antideportivas

Muestra modal para seleccionar sustituto del banquillo.

### 3. Cronómetro

**Hook**: `useQuarterTimer.ts`

- Cuenta regresiva de 10 minutos
- Pausa/reanudación
- Edición manual de tiempo
- Navegación entre cuartos (1-4)

### 4. Gestión de Cambios

**Modal**: Inline en `App.tsx`

- Scroll seguro con `useBodyScrollLock`
- Lista de jugadores por equipo
- Botón CANCHA/BANCA para cada jugador
- Contador de jugadores en cancha (máx 5)

### 5. Edición de Equipos

**Componente**: `EditTeamsModal.tsx`

- Edición inline de nombres de equipo
- Edición de nombre y número por jugador
- Mismo sistema de scroll seguro

### 6. Historial de Eventos

**Componente**: `GameEventLog.tsx`

- Orden inverso (último primero)
- Edición de acción de eventos
- Eliminación de eventos
- Función deshacer última acción

### 7. Resumen

**Componente**: `SummaryTab.tsx`

- Tabla por equipo con estadísticas individuales
- Puntos totales, rebotes, asistencias, robos, pérdidas, faltas

### 8. Layout Responsivo

**3 layouts en `ActionsTab.tsx`**:
- **Desktop (lg)**: 3 columnas - jugadores, eventos, acciones
- **Tablet (md)**: 2 columnas - jugadores | eventos + acciones
- **Móvil**: stacked - acciones, jugadores (scroll horizontal), eventos

---

## Personalización

### Nombres de Jugadores

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

### Colores (Tailwind)

Modifica `tailwind.config.js`:

```javascript
colors: {
  bulls: {
    red: '#CE1141',
    'red-dark': '#a70d2a',
    black: '#222222',
    gold: '#F5E6C8',
    neon: '#39FF14',
  },
}
```

### Duración de Cuarto

En `src/hooks/useQuarterTimer.ts`:

```typescript
const [timer, setTimer] = useState<Timer>({
  minute: 10,  // ← Cambiar aquí
  second: 0,
  isRunning: false,
});
```

---

## Scripts

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Compilar para producción
npm run preview      # Vista previa de producción
npm run type-check   # Verificar tipos TypeScript
```

---

## Tecnologías

| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| React | 18.2 | Framework UI |
| TypeScript | 5.3 | Tipado estático |
| Tailwind CSS | 3.3 | Estilos utility-first |
| Vite | 5.0 | Bundler y dev server |

---

## Optimizaciones

- ✅ Code splitting con React.lazy/Suspense
- ✅ Memoización con React.memo/useMemo/useCallback
- ✅ Custom hooks para separar lógica
- ✅ Body scroll lock para modales
- ✅ CSS classes reutilizables para modales
- ✅ Touch-friendly (min 44px targets)
- ✅ Safe area support (notch, Dynamic Island)

---

## Licencia

MIT
