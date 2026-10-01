# Basketball Stats Tracker 🏀

A modern web application for tracking basketball game statistics in real time. Dark premium theme with glass morphism effects, responsive design, and safe-area modals.

<p align="center">
  <a href="https://play-maker.dalejorodriguez.workers.dev">
    👉 Basketball Stats Tracker 👈
  </a>
</p>

<div align="center">
  <video
    src="https://github.com/user-attachments/assets/357468f9-0a06-4ed4-9622-d9991f09ae35"
    controls
    preload="metadata"
    width="100%"
  ></video>
</div>

<p align="center">
  <a href="https://github.com/dalerodr/play-maker/blob/main/screenshots/Bulls Utah 97 - Game Summary.png">
    <img src="https://github.com/dalerodr/play-maker/blob/main/screenshots/Bulls Utah 97 - Game Summary.png" alt="Game Summary" width="500">
  </a>
  <a href="https://github.com/dalerodr/play-maker/blob/main/screenshots/Bulls Utah 97 - Team Settings.png">
    <img src="https://github.com/dalerodr/play-maker/blob/main/screenshots/Bulls Utah 97 - Team Settings.png" alt="Team Settings" width="500">
  </a>
</p>

## Features

✨ **Real-Time Tracking**
- 📊 10 action types per player: +1, +2, +3 points, foul, technical foul, unsporting foul, rebound, assist, steal, turnover
- 👥 On-field player selector with instant substitutions
- 🕐 10-minute quarter timer (pausable and editable)
- 📈 Live team score counter
- ⚠️ Automatic ejection at 5 personal fouls or 2 technical/unsporting fouls

## Main Features

### 1. Player Management
- 5v5 default lineup (Point Guard, Shooting Guard, Small Forward, Power Forward, Center)
- Substitutions at any time
- 12 players per team (home and away)
- Customizable names and jersey numbers

### 2. Action Tracking
- **+1 Point**: Free throws
- **+2 Points**: Close-range field goals
- **+3 Points**: Three-pointers
- **Foul**: Personal fouls
- **Technical Foul**: Counts toward ejection
- **Unsporting Foul**: Counts toward ejection
- **Rebound**: Rebounds
- **Assist**: Assists
- **Steal**: Steals
- **Turnover**: Turnovers

### 3. Time Control
- 10-minute quarter countdown timer
- Controls: Start/Pause, Reset, Edit
- Quarter navigation (1-4)
- All events logged with timestamp (minute and quarter)

### 4. Substitution Management
- Modal with safe scroll (no background scrolling)
- Maximum 5 players per team on court
- Click to sub players in/out
- Visual player count on court

### 5. Team Editor
- Modal for editing player names and jersey numbers
- Team name editing
- Same safe scroll system as substitutions

### 6. Event History
- Log of all recorded events
- Event info: player, action, time, team
- Event editing and deletion
- Undo last action button

### 7. Team Summary
- Total points by type (1pt, 2pt, 3pt)
- Fouls, rebounds, assists, steals, turnovers
- Individual player statistics

### 8. Data Export
- Download statistics as JSON
- Includes: final stats, event log, timestamps

### 9. Premium Design
- Dark theme with glass morphism
- Subtle Bulls background image
- Smooth animations
- Fully responsive (desktop, tablet, mobile)

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Type check
npm run type-check
```

## Project Structure

```
src/
├── components/
│   ├── ActionButtons.tsx         # Action buttons (10 types)
│   ├── EditTeamsModal.tsx        # Team editing modal
│   ├── FoulOutModal.tsx          # Ejection modal
│   ├── GameEventLog.tsx          # Event log
│   ├── PlayerActionSelector.tsx  # On-field player selector
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
│   └── playersConfig.ts          # Initial player config
├── types/
│   └── index.ts                  # TypeScript types
├── App.tsx                       # Main component
├── App.css                       # App styles (glass morphism)
├── index.css                     # Global styles and modals
└── main.tsx                      # Entry point
```

## Usage

1. **Select Players**: Click players from each team
2. **Record Actions**: Select a player and press the corresponding button
3. **Manage Subs**: Use the "Subs" button to sub players in/out
4. **Edit Teams**: Use "Edit Teams" to change names/numbers
5. **Control Time**: Start, pause, or edit the timer
6. **Undo**: Use the undo button if you make a mistake
7. **Export**: Download statistics when the game ends

## Technologies

- ⚛️ React 18
- 📘 TypeScript 5.3
- 🎨 Tailwind CSS 3.3
- ⚡ Vite 6.0
- 🎯 React Hooks
- 🎨 Custom Bulls Theme

## License

MIT
