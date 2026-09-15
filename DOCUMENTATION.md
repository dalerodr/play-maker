# Basketball Stats Tracker - Full Documentation

## Project Overview

A modern, reactive web application for tracking basketball game statistics in real time. Dark premium theme with glass morphism, responsive design, and accessible modals with safe scroll.

### Key Features

- ✅ **10 Action Types**: +1, +2, +3 points, foul, technical foul, unsporting foul, rebound, assist, steal, turnover
- ✅ **Team Management**: 5v5 default, substitutions at any time
- ✅ **Time Control**: 10-minute countdown, pausable and editable
- ✅ **Auto-Ejection**: At 5 personal fouls or 2 technical/unsporting fouls
- ✅ **Undo**: Button to revert last action
- ✅ **Team Editor**: Customizable player names and jersey numbers
- ✅ **Event History**: Log with timestamps, editing, and deletion
- ✅ **Data Export**: Download as JSON
- ✅ **Premium Theme**: Dark mode with glass morphism and animations
- ✅ **Safe Scroll**: Modals without background scrolling

---

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# TypeScript type check
npm run type-check
```

---

## Project Structure

```
src/
├── components/
│   ├── ActionButtons.tsx         # 10 action buttons
│   ├── EditTeamsModal.tsx        # Team editing modal
│   ├── FoulOutModal.tsx          # Ejection modal
│   ├── GameEventLog.tsx          # Event log
│   ├── PlayerActionSelector.tsx  # Player selector
│   ├── QuarterTimer.tsx          # Timer and scoreboard
│   ├── TabNavigation.tsx         # Tab navigation
│   └── tabs/
│       ├── ActionsTab.tsx        # Actions tab (3 layouts)
│       └── SummaryTab.tsx        # Summary tab
├── hooks/
│   ├── useBodyScrollLock.ts      # Modal scroll lock
│   ├── useGameState.ts           # Game state
│   ├── usePlayerActions.ts       # Player actions
│   └── useQuarterTimer.ts        # Timer
├── config/
│   └── playersConfig.ts          # Initial config
├── types/
│   └── index.ts                  # TypeScript types
├── App.tsx                       # Main component
├── App.css                       # App styles (glass morphism)
├── index.css                     # Global styles and modals
└── main.tsx                      # Entry point
```

---

## TypeScript Types

### Player
```typescript
interface Player {
  id: string;
  number: number;
  name: string;
  team: 'home' | 'away';
  points1: number;    // Free throws
  points2: number;    // 2-pointers
  points3: number;    // 3-pointers
  fouls: number;      // Personal fouls
  rebounds: number;   // Rebounds
  assists: number;    // Assists
  steals: number;     // Steals
  turnovers: number;  // Turnovers
  technicalFouls: number;    // Technical fouls
  unsportingFouls: number;   // Unsporting fouls
}
```

### PlayEvent
```typescript
interface PlayEvent {
  id?: string;
  timestamp: string;       // "Minute 5 Quarter 2"
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
  field1Points: number;    // Free throws
  field2Points: number;    // 2-pointers
  field3Points: number;    // 3-pointers
  totalRebounds: number;
  totalAssists: number;
  totalSteals: number;
  totalTurnovers: number;
}
```

---

## Detailed Features

### 1. Player Actions

**Component**: `ActionButtons.tsx`

10 action buttons:
- **+1, +2, +3**: Scoring (Bulls red)
- **Foul, Technical, Unsporting**: Fouls (amber/red)
- **Rebound**: Rebounds (white)
- **Assist**: Assists (neon green)
- **Steal, Turnover**: Steals/turnovers (purple/orange)

Disabled when no player is selected or player is on bench.

### 2. Ejection System

**Component**: `FoulOutModal.tsx`

Triggers automatically when:
- 5 personal fouls
- 2 technical fouls
- 2 unsporting fouls

Opens modal to select a bench replacement.

### 3. Timer

**Hook**: `useQuarterTimer.ts`

- 10-minute countdown
- Pause/resume
- Manual time editing
- Quarter navigation (1-4)

### 4. Substitutions

**Modal**: Inline in `App.tsx`

- Safe scroll via `useBodyScrollLock`
- Player list by team
- COURT/BENCH toggle button
- On-court player counter (max 5)

### 5. Team Editor

**Component**: `EditTeamsModal.tsx`

- Inline team name editing
- Player name and number editing
- Same safe scroll system

### 6. Event Log

**Component**: `GameEventLog.tsx`

- Reverse order (newest first)
- Edit event action
- Delete events
- Undo last action

### 7. Summary

**Component**: `SummaryTab.tsx`

- Per-team table with individual stats
- Total points, rebounds, assists, steals, turnovers, fouls

### 8. Responsive Layout

**3 layouts in `ActionsTab.tsx`**:
- **Desktop (lg)**: 3 columns - players | events | actions
- **Tablet (md)**: 2 columns - players | events + actions
- **Mobile**: Stacked - actions → players (scroll) → events

---

## Customization

### Player Names

Edit `src/config/playersConfig.ts`:

```typescript
export const TEAM_CONFIG = {
  home: {
    name: 'Home Team',
    players: [
      { number: 1, name: 'Your PG' },
      { number: 2, name: 'Your SG' },
      // ...
    ],
  },
  away: {
    name: 'Away Team',
    players: [
      { number: 1, name: 'Opponent PG' },
      // ...
    ],
  },
};
```

### Colors (Tailwind)

Modify `tailwind.config.js`:

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

### Quarter Duration

In `src/hooks/useQuarterTimer.ts`:

```typescript
const [timer, setTimer] = useState<Timer>({
  minute: 10,  // ← Change here
  second: 0,
  isRunning: false,
});
```

---

## Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run preview      # Preview production build
npm run type-check   # TypeScript type check
```

---

## Technologies

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18.2 | UI Framework |
| TypeScript | 5.3 | Static typing |
| Tailwind CSS | 3.3 | Utility-first CSS |
| Vite | 6.0 | Bundler and dev server |

---

## Optimizations

- ✅ Code splitting with React.lazy/Suspense
- ✅ Memoization with React.memo/useMemo/useCallback
- ✅ Custom hooks for logic separation
- ✅ Body scroll lock for modals
- ✅ Reusable CSS classes for modals
- ✅ Touch-friendly (min 44px targets)
- ✅ Safe area support (notch, Dynamic Island)

---

## License

MIT
