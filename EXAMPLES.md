#!/bin/bash
# Guía de Ejemplos - Basketball Stats Tracker

## 📋 Ejemplos de Uso Práctico

### Escenario 1: Primer Cuarto - Local vs Visitante

**Tiempo**: 0:00 - Comienza el partido
- **Acción 1**: Local #5 (Pívot) anota 2 puntos
- **Acción 2**: Visitante #3 (Alero) anota 3 puntos
- **Acción 3**: Local #1 (Base) hace falta
- **Acción 4**: Local #5 coge rebote

**Resultado esperado**:
- Local: 2 puntos
- Visitante: 3 puntos
- Local: 1 falta
- Evento log muestra 4 eventos en orden inverso

---

### Escenario 2: Cambio de Jugador

**Situación**: Es momento de hacer cambios en el cuarto 2

**Pasos**:
1. Ve a la sección "Cambios" (derecha)
2. Haz clic en jugador en banca para meterlo (se pone verde)
3. Haz clic en jugador en campo para sacarlo (se pone gris)
4. Máximo 5 jugadores por equipo en campo

**Código en la app**:
```javascript
const handleToggleOnField = (playerId: string) => {
  const teamOnField = Object.entries(onField)
    .filter(([id]) => ... && onField[id])
    .length;
  
  if (onField[playerId]) {
    setOnField(prev => ({ ...prev, [playerId]: false }));
  } else if (teamOnField < 5) {
    setOnField(prev => ({ ...prev, [playerId]: true }));
  }
};
```

---

### Escenario 3: Cronómetro - Parar y Editar

**Situación**: El árbitro paró el juego en minuto 7:34

**Pasos**:
1. Haz clic en "⏸ Pausar" para parar el cronómetro
2. Haz clic en "✎ Editar" para entrar en modo edición
3. Cambia el minuto a 7 y segundo a 34
4. Haz clic en "✓ Guardar"

**Hook TypeScript**:
```typescript
const setTimeManually = (minute: number, second: number) => {
  setTimer((prev) => ({
    ...prev,
    minute: Math.max(0, Math.min(10, minute)),
    second: Math.max(0, Math.min(59, second)),
  }));
};
```

---

### Escenario 4: Registro de Asistencia

**Situación**: Local #2 hace pase, Local #4 anota

**Pasos**:
1. Selecciona equipo "Local"
2. Haz clic en #2 (Escolta)
3. Haz clic en botón "Asistencia"
4. Evento registrado: "Q1 - 05:23 - #2 Escolta - Asistencia"

**Resultado en JSON**:
```json
{
  "timestamp": "Minuto 5 Cuarto 1",
  "quarter": 1,
  "minute": 5,
  "second": 23,
  "playerId": "home-1",
  "playerName": "Escolta",
  "playerNumber": 2,
  "team": "home",
  "action": "assist"
}
```

---

### Escenario 5: Cambio de Cuarto

**Situación**: Termina el cuarto 1, comienza el 2

**Pasos**:
1. Haz clic en "Siguiente →" en la sección del cronómetro
2. El contador debe estar en 0:00
3. Haz clic en "↻ Reiniciar" para volver a 10:00
4. Haz clic en "▶ Iniciar" para comenzar el cuarto 2

**Resultado**:
- Cronómetro: 10:00
- Contador: "Cuarto 2/4"
- Eventos ahora se registran con "Cuarto 2"

---

### Escenario 6: Descarga de Estadísticas

**Final del Partido**:
1. Haz clic en "📥 Descargar Estadísticas"
2. Se descarga archivo: `basket-stats-1731234567890.json`
3. Archivo contiene:
   - Fecha y hora del partido
   - Stats finales de ambos equipos
   - Listado de todos los jugadores
   - Historial completo de eventos

**Ejemplo de archivo descargado**:
```json
{
  "gameDate": "2025-11-11T14:30:00.000Z",
  "finalStats": {
    "home": {
      "totalPoints": 78,
      "totalFouls": 15,
      "field2Points": 28,
      "field3Points": 6,
      "totalRebounds": 45,
      "totalAssists": 18,
      "players": [
        {
          "id": "home-0",
          "number": 1,
          "name": "Base",
          "team": "home",
          "points2": 6,
          "points3": 2,
          "fouls": 2,
          "rebounds": 3,
          "assists": 8
        },
        // ... más jugadores
      ]
    },
    "away": { /* similar */ }
  },
  "events": [
    {
      "timestamp": "Minuto 5 Cuarto 1",
      "quarter": 1,
      "minute": 5,
      "second": 23,
      "playerId": "home-0",
      "playerName": "Base",
      "playerNumber": 1,
      "team": "home",
      "action": "points2",
      "teamStats": {
        "totalPoints": 2,
        "totalFouls": 0,
        "field2Points": 1,
        "field3Points": 0,
        "totalRebounds": 0,
        "totalAssists": 0
      }
    },
    // ... todos los eventos
  ]
}
```

---

## 🔧 Casos de Uso Avanzados

### Correción de Errores

**Problema**: Marcaste 3 puntos pero fueron 2

**Solución**:
1. No hay botón deshacer (limitación actual)
2. Opciones:
   - Editar manualmente el JSON descargado
   - Reiniciar con "🔄 Nuevo Partido"
   - Continuar rastreando (la app sigue funcionando)

### Múltiples Partidos en un Día

**Workflow**:
1. Completa el primer partido
2. Descarga estadísticas
3. Haz clic en "🔄 Nuevo Partido"
4. Comienza a rastrear el segundo partido
5. Descarga nuevamente

### Análisis de Datos

**Con el JSON descargado, puedes**:
```javascript
// Calcular promedio de puntos por jugador
const avgPoints = events
  .filter(e => e.playerId === 'home-0')
  .filter(e => e.action.includes('points'))
  .length;

// Ver eventos de un jugador específico
const playerEvents = events.filter(e => e.playerNumber === 5);

// Calcular porcentaje de faltas por equipo
const totalFouls = events.filter(e => e.team === 'home' && e.action === 'foul').length;
```

### Sincronización Manual (Cloud)

```javascript
// Guardar en Dropbox/Google Drive
const json = JSON.stringify(exportData);
fetch('https://tu-api.com/upload', {
  method: 'POST',
  body: json
});
```

---

## 📊 Ejemplo de Sesión Completa

### Local vs Visitante - Primer Cuarto

```
00:00 - Local #5 (Pívot): +2 Puntos
        Local: 2 | Visitante: 0

00:45 - Visitante #2 (Escolta): +3 Puntos
        Local: 2 | Visitante: 3

01:30 - Local #1 (Base): Falta
        Local: 1 Falta | Visitante: 0 Faltas

02:15 - Local #5 (Pívot): Rebote
        Local Rebotes: 1

02:50 - Visitante #3 (Alero): +3 Puntos
        Local: 2 | Visitante: 6

03:20 - Local #3 (Alero): Asistencia (a #5)
        Local Asistencias: 1

04:00 - Local #5 (Pívot): +2 Puntos
        Local: 4 | Visitante: 6

04:45 - Local #4 (Ala-Pívot): Falta
        Local: 2 Faltas | Visitante: 0 Faltas
```

### Resumen del Cuarto 1

**Local**:
- Puntos: 4 (2x2 puntos)
- Faltas: 2
- Rebotes: 1
- Asistencias: 1

**Visitante**:
- Puntos: 6 (2x3 puntos)
- Faltas: 0
- Rebotes: 0
- Asistencias: 0

---

## 🎯 Tips para Máximo Rendimiento

### 1. Preparación Previa
```bash
# Personaliza los nombres ANTES de comenzar
# Edita src/config/playersConfig.ts

# Prueba la app
npm run dev

# Verifica que se ve bien
```

### 2. Durante el Partido
```
✓ Pausa el cronómetro durante cambios
✓ Revisa el historial ocasionalmente
✓ Usa "Editar" si hay confusión con el tiempo
✓ Mantén el navegador en pantalla completa
```

### 3. Después del Partido
```
✓ Descarga las estadísticas inmediatamente
✓ Guarda el JSON en un lugar seguro
✓ Opcional: Imprime o envía por email
✓ Comienza el siguiente partido con "Nuevo Partido"
```

---

## 📱 Responsive Design

La app es completamente responsiva:

```
Desktop (lg):  3 columnas = Mejor UX
Tablet (md):   2 columnas = Bueno
Móvil (sm):    1 columna = Funcional
```

**Puntos de quiebre Tailwind**:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px

---

## 🚀 Optimizaciones Posibles

Si necesitas mejorar la app:

```typescript
// 1. Agregar localStorage para guardar automáticamente
useEffect(() => {
  localStorage.setItem('gameState', JSON.stringify({
    players, events, currentQuarter
  }));
}, [players, events, currentQuarter]);

// 2. Agregar undo/redo
const [history, setHistory] = useState([]);
const undo = () => {
  setPlayers(history[history.length - 2]);
};

// 3. Agregar análisis en tiempo real
const calculateStats = () => {
  return {
    bestPlayer: /* ... */,
    fieldGoalPercentage: /* ... */,
  };
};
```

---

## ✅ Checklist Final

Antes de usar en un partido real:

- [ ] Node.js instalado
- [ ] `npm install` ejecutado
- [ ] Nombres de jugadores personalizados
- [ ] `npm run dev` ejecutado exitosamente
- [ ] App visible en http://localhost:3000
- [ ] Todos los botones funcionan
- [ ] El cronómetro cuenta regresivo
- [ ] Puedes seleccionar jugadores
- [ ] Puedes registrar acciones
- [ ] Puedes hacer cambios
- [ ] El historial muestra eventos
- [ ] Puedes descargar JSON

---

¡Ahora estás listo para rastrear baloncesto! 🏀🚀
