# Guía de Ejemplos - Basketball Stats Tracker

## Ejemplos de Uso Práctico

### Escenario 1: Primer Cuarto - Local vs Visitante

**Tiempo**: 0:00 - Comienza el partido

1. Selecciona #5 (Pívot) del equipo Local
2. Presiona **+2** → Local: 2 puntos
3. Selecciona #3 (Alero) del equipo Visitante
4. Presiona **+3** → Visitante: 3 puntos
5. Selecciona #1 (Base) del Local
6. Presiona **Falta** → Local: 1 falta
7. Selecciona #5 del Local
8. Presiona **Rebote** → Local: 1 rebote

**Resultado**: Local 2 - Visitante 3

---

### Escenario 2: Robo y Asistencia

1. Selecciona #2 (Escolta) del Local
2. Presiona **Robo** → Local: 1 robo
3. Selecciona #1 (Base) del Local
4. Presiona **Ast.** → Local: 1 asistencia

---

### Escenario 3: Falta Técnica y Expulsión

1. Selecciona #4 (Ala-Pívot) del Visitante
2. Presiona **Técnica** → 1 falta técnica
3. Presiona **Técnica** de nuevo → 2 faltas técnicas
4. **Se abre modal de expulsión automáticamente**
5. Selecciona un reserva del banquillo para sustituir

---

### Escenario 4: Cambio de Jugador

1. Presiona el botón **🔁 Cambios**
2. Se abre el modal con ambos equipos
3. En "Local": presiona **○ BANCA** en un reserva → entra a cancha
4. Presiona **● CANCHA** en un titular → sale a banca
5. Presiona **Cerrar**

**Regla**: Máximo 5 por equipo en cancha.

---

### Escenario 5: Editar Equipos

1. Presiona **👥 Editar Equipos**
2. Se abre el modal con ambos equipos
3. Haz clic en un jugador → se abren campos de edición
4. Cambia nombre o número
5. Presiona **✓ Guardar**
6. Para cambiar nombre del equipo: presiona **✎ Editar nombre**

---

### Escenario 6: Deshacer Acción

1. Selecciona #3 del Local y presiona **+3** (error, era +2)
2. Presiona **↶ Deshacer**
3. La última acción se revierte
4. Selecciona #3 del Local de nuevo
5. Presiona **+2** (acción correcta)

---

### Escenario 7: Cambio de Cuarto

1. El cronómetro llega a 0:00
2. Presiona **Siguiente →** → Cuarto 2
3. Presiona **↻ Reiniciar** → Vuelve a 10:00
4. Presiona **▶ Iniciar** → Comienza el cuarto 2

---

### Escenario 8: Exportar y Nuevo Partido

1. Al finalizar el partido, presiona **📥 Descargar**
2. Se descarga `basket-stats-[timestamp].json`
3. Presiona **🔄 Nuevo Partido**
4. Todo se resetea (estadísticas, eventos, tiempo)
5. Los nombres de jugadores se mantienen

---

## Ejemplo de Sesión Completa

```
00:00 - Local #5 (Pívot): +2 Puntos
        Local: 2 | Visitante: 0

00:45 - Visitante #2 (Escolta): +3 Puntos
        Local: 2 | Visitante: 3

01:30 - Local #1 (Base): Falta
        Local: 1 Falta | Visitante: 0

02:15 - Local #5 (Pívot): Rebote
        Local Rebotes: 1

02:50 - Visitante #3 (Alero): +3 Puntos
        Local: 2 | Visitante: 6

03:20 - Local #3 (Alero): Asistencia (a #5)
        Local Asistencias: 1

04:00 - Local #5 (Pívot): +2 Puntos
        Local: 4 | Visitante: 6

04:30 - Local #2 (Escolta): Robo
        Local Robos: 1
```

---

## Datos por Evento (JSON)

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

1. **Selecciona jugador primero** → Los botones de acción se deshabilitan sin selección
2. **Jugador debe estar en canca** → No se pueden registrar acciones desde banca
3. **Usa Deshacer** → Más rápido que corregir manualmente
4. **Exporta periódicamente** → No pierdas datos
5. **Revisa el historial** → Verifica que todo se registró correctamente
