# Quick Reference - Basketball Stats Tracker

## Get Started

```bash
npm install
npm run dev
```

---

## Available Actions

| Action | Button | Color | Effect |
|--------|--------|-------|--------|
| +1 Point | +1 | Red | Free throws |
| +2 Points | +2 | Red | Field goals |
| +3 Points | +3 | Red | Three-pointers |
| Foul | Foul | Amber | +1 personal foul |
| Technical Foul | Technical | Dark amber | +1 technical foul (cumulative) |
| Unsporting Foul | Unspt. | Dark red | +1 unsporting foul (cumulative) |
| Rebound | Rebound | White | +1 rebound |
| Assist | Ast. | Neon green | +1 assist |
| Steal | Steal | Purple | +1 steal |
| Turnover | TO | Orange | +1 turnover |

**Rule**: Select an on-court player first, then press the action button.

---

## Auto-Ejection

| Condition | Result |
|-----------|--------|
| 5 personal fouls | Ejection + substitution modal |
| 2 technical fouls | Ejection + substitution modal |
| 2 unsporting fouls | Ejection + substitution modal |

---

## Timer Controls

| Control | Effect |
|---------|--------|
| ▶ Start | Begin countdown |
| ⏸ Pause | Stop timer |
| ↻ Reset | Return to 10:00 |
| ✎ Edit | Change minute/second |
| ← Previous | Previous quarter |
| Next → | Next quarter |

---

## Main Buttons

| Button | Function |
|--------|----------|
| ↶ Undo | Revert last action |
| 🔁 Subs | Open substitution modal |
| 👥 Edit Teams | Open team editor modal |
| 📥 Download | Export stats to JSON |
| 🔄 New Game | Reset everything (keeps config) |

---

## Tabs

| Tab | Content |
|-----|---------|
| Actions | On-field players + event log + action buttons |
| Summary | Per-team statistics table |

---

## Responsive Layout

| Device | Layout |
|--------|--------|
| Desktop (lg+) | 3 columns: players \| events \| actions |
| Tablet (md) | 2 columns: players \| events + actions |
| Mobile | Stacked: actions → players (scroll) → events |

---

## Limits

| Concept | Limit |
|---------|-------|
| Players per team | 12 |
| On court per team | 5 |
| Free throws per player | Unlimited |
| Personal fouls before ejection | 5 |
| Technical fouls before ejection | 2 |
| Unsporting fouls before ejection | 2 |
| Quarter duration | 10 minutes |
| Quarters per game | 4 |

---

## Important Files

| File | Purpose |
|------|---------|
| `src/config/playersConfig.ts` | Initial player names and numbers |
| `tailwind.config.js` | Bulls colors and animations |
| `src/hooks/useQuarterTimer.ts` | Quarter duration |

---

## Customization

### Change player names
Edit `src/config/playersConfig.ts` and reload the app.

### Change colors
Edit `tailwind.config.js` → `theme.extend.colors.bulls`.

### Change quarter duration
Edit `src/hooks/useQuarterTimer.ts` → `minute: 10`.

---

## Tech Stack

- React 18 + TypeScript 5.3
- Tailwind CSS 3.3
- Vite 6.0
- Dark premium theme with glass morphism
- Modals with safe scroll (useBodyScrollLock)
