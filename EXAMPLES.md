# Usage Examples - Basketball Stats Tracker

## Practical Use Cases

### Scenario 1: First Quarter - Home vs Away

**Time**: 0:00 - Game starts

1. Select #5 (Center) from the Home team
2. Press **+2** → Home: 2 points
3. Select #3 (Small Forward) from the Away team
4. Press **+3** → Away: 3 points
5. Select #1 (Point Guard) from Home
6. Press **Foul** → Home: 1 foul
7. Select #5 from Home
8. Press **Rebound** → Home: 1 rebound

**Result**: Home 2 - Away 3

---

### Scenario 2: Steal and Assist

1. Select #2 (Shooting Guard) from Home
2. Press **Steal** → Home: 1 steal
3. Select #1 (Point Guard) from Home
4. Press **Ast.** → Home: 1 assist

---

### Scenario 3: Technical Foul and Ejection

1. Select #4 (Power Forward) from Away
2. Press **Technical** → 1 technical foul
3. Press **Technical** again → 2 technical fouls
4. **Ejection modal opens automatically**
5. Select a bench player as substitute

---

### Scenario 4: Player Substitution

1. Press the **🔁 Subs** button
2. Modal opens with both teams
3. In "Home": press **○ BENCH** on a reserve → enters court
4. Press **● COURT** on a starter → goes to bench
5. Press **Close**

**Rule**: Maximum 5 per team on court.

---

### Scenario 5: Edit Teams

1. Press **👥 Edit Teams**
2. Modal opens with both teams
3. Click a player → editing fields appear
4. Change name or number
5. Press **✓ Save**
6. To change team name: press **✎ Edit name**

---

### Scenario 6: Undo Action

1. Select #3 from Home and press **+3** (mistake, should be +2)
2. Press **↶ Undo**
3. Last action is reverted
4. Select #3 from Home again
5. Press **+2** (correct action)

---

### Scenario 7: Quarter Change

1. Timer reaches 0:00
2. Press **Next →** → Quarter 2
3. Press **↻ Reset** → Returns to 10:00
4. Press **▶ Start** → Quarter 2 begins

---

### Scenario 8: Export and New Game

1. At game end, press **📥 Download**
2. `basket-stats-[timestamp].json` downloads
3. Press **🔄 New Game**
4. Everything resets (stats, events, timer)
5. Player names are preserved

---

## Complete Session Example

```
00:00 - Home #5 (Center): +2 Points
        Home: 2 | Away: 0

00:45 - Away #2 (Shooting Guard): +3 Points
        Home: 2 | Away: 3

01:30 - Home #1 (Point Guard): Foul
        Home: 1 Foul | Away: 0

02:15 - Home #5 (Center): Rebound
        Home Rebounds: 1

02:50 - Away #3 (Small Forward): +3 Points
        Home: 2 | Away: 6

03:20 - Home #3 (Small Forward): Assist (to #5)
        Home Assists: 1

04:00 - Home #5 (Center): +2 Points
        Home: 4 | Away: 6

04:30 - Home #2 (Shooting Guard): Steal
        Home Steals: 1
```

---

## Event Data (JSON)

```json
{
  "timestamp": "Minute 5 Quarter 1",
  "quarter": 1,
  "minute": 5,
  "second": 23,
  "playerId": "home-1",
  "playerName": "Shooting Guard",
  "playerNumber": 2,
  "team": "home",
  "action": "steal",
  "teamStats": {
    "totalPoints": 4,
    "totalFouls": 1,
    "field1Points": 0,
    "field2Points": 2,
    "field3Points": 0,
    "totalRebounds": 1,
    "totalAssists": 1,
    "totalSteals": 1,
    "totalTurnovers": 0
  }
}
```

---

## Tips

1. **Select player first** → Action buttons are disabled without selection
2. **Player must be on court** → Actions can't be recorded from bench
3. **Use Undo** → Faster than manual correction
4. **Export regularly** → Don't lose data
5. **Check event log** → Verify everything was recorded correctly
