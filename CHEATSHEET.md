# 🏀 REFERENCIA RÁPIDA - Basketball Stats Tracker

## ⚡ INICIAR (30 segundos)

```
Doble clic en: start.bat
→ Espera 5 segundos
→ Se abre la app automáticamente
¡LISTO!
```

---

## 🎮 ACCIONES PRINCIPALES

| Acción | Botón | Efecto |
|--------|-------|--------|
| Anotar 2 | +2 Puntos (Azul) | +2 al jugador y equipo |
| Anotar 3 | +3 Puntos (Rojo) | +3 al jugador y equipo |
| Falta | Falta (Amarillo) | +1 falta al jugador y equipo |
| Rebote | Rebote (Verde) | +1 rebote al jugador y equipo |
| Asistencia | Asistencia (Púrpura) | +1 asistencia al jugador |

---

## 🕐 CONTROLES DEL TIEMPO

| Control | Efecto |
|---------|--------|
| ▶ Iniciar | Comienza cuenta regresiva |
| ⏸ Pausar | Detiene el cronómetro |
| ↻ Reiniciar | Vuelve a 10:00 |
| ✎ Editar | Cambia minuto/segundo |
| Anterior ← | Cuarto anterior |
| Siguiente → | Cuarto siguiente |

---

## 👥 CAMBIOS DE JUGADORES

**Regla**: Máximo 5 por equipo en el campo

```
Verde = En el campo ✓
Gris = En banca ✗

Haz clic para cambiar estado
```

---

## 📊 INFORMACIÓN QUE VES

```
IZQUIERDA:
  • Cronómetro (10:00)
  • Score local vs visitante
  • Resumen de ambos equipos

CENTRO:
  • Selector de equipo
  • Grid de jugadores
  • Stats del jugador seleccionado

DERECHA:
  • Botones de acciones
  • Control de cambios (5v5)
  • Historial de eventos
```

---

## 💾 DESCARGAR DATOS

```
Botón: 📥 Descargar Estadísticas

Descarga: basket-stats-[NÚMERO].json

Contiene:
  • Stats de ambos equipos
  • Datos de cada jugador
  • TODOS los eventos con timestamps
  • Fecha y hora del partido
```

---

## 🔄 NUEVO PARTIDO

```
Botón: 🔄 Nuevo Partido

Resetea:
  • Todos los contadores a 0
  • Cronómetro a 10:00
  • Cuarto 1
  • Todos los eventos
  
(NO afecta la configuración de nombres)
```

---

## ⚙️ PERSONALIZAR NOMBRES

**Archivo**: `src/config/playersConfig.ts`

**Cambiar**:
```typescript
{ number: 1, name: "MI NOMBRE AQUÍ" }
```

**Guardar y recargar** la app

---

## 🆘 PROBLEMAS COMUNES

| Problema | Solución |
|----------|----------|
| Acción no registra | Selecciona jugador (debe estar resaltado) |
| Cronómetro no funciona | Recarga la página (F5) |
| Quiero deshacer | No hay deshacer - usa "Nuevo Partido" |
| Puerto 3000 ocupado | Cambia en vite.config.ts |
| No se ve bien en móvil | Usa en desktop para mejor UX |

---

## 🎯 FLUJO TÍPICO DE PARTIDA

```
1. Ejecuta start.bat
   ↓
2. Selecciona equipo (Local/Visitante)
   ↓
3. Selecciona jugador (haz clic)
   ↓
4. Registra acción (botón de acción)
   ↓
5. Pausa cuando hay cambios (⏸)
   ↓
6. Cambios de jugadores (panel derecha)
   ↓
7. Fin cuarto: Siguiente → (siguiente cuarto)
   ↓
8. Fin partido: Descargar Estadísticas
   ↓
9. Nuevo partido: 🔄 Nuevo Partido
```

---

## 📱 DATOS POR EVENTO

```json
{
  "timestamp": "Minuto 5 Cuarto 2",
  "quarter": 2,
  "minute": 5,
  "second": 23,
  "playerId": "home-0",
  "playerNumber": 1,
  "playerName": "Base",
  "team": "home",
  "action": "points2",
  "teamStats": {
    "totalPoints": 45,
    "totalFouls": 8,
    "rebounds": 22,
    "assists": 12
  }
}
```

---

## 🎓 FORMATO DE EQUIPOS

```
Local (azul):
  • 5 en campo (inicial: #1-5)
  • 7 en banca (reservas: #6-12)

Visitante (rojo):
  • 5 en campo (inicial: #1-5)
  • 7 en banca (reservas: #6-12)
```

---

## 🔧 TECLAS Y ATAJOS

| Atajo | Función |
|-------|---------|
| F5 | Recargar página |
| Ctrl+S | Guardar página (exportar) |

(La app NO tiene atajos de teclado, usa mouse)

---

## 📊 ESTADÍSTICAS FINALES

**Por Equipo**:
- Total de puntos
- Total de faltas
- Total de rebotes
- Total de asistencias
- Desglose de 2pts y 3pts

**Por Jugador**:
- Puntos (2pts + 3pts)
- Faltas
- Rebotes
- Asistencias

---

## 🌐 NAVEGADORES COMPATIBLES

✓ Chrome 90+
✓ Firefox 88+
✓ Safari 14+
✓ Edge 90+

---

## 💡 CONSEJOS PROFESIONALES

1. **Pausa durante cambios** - Mantén control del tiempo
2. **Revisa el historial** - Verifica eventos registrados
3. **Exporta a tiempo** - Descarga al terminar cada cuarto
4. **Usa desktop** - Mejor experiencia que móvil
5. **Personaliza nombres** - Antes de empezar el partido

---

## 🚀 MEJORAS FUTURAS (Roadmap)

- [ ] Botón deshacer
- [ ] Estadísticas avanzadas
- [ ] Exportar a Excel
- [ ] Sincronizar en nube
- [ ] Modo oscuro

---

## 📞 SOPORTE

**Documentación completa**:
- USAGE_GUIDE.md - Guía paso a paso
- DOCUMENTATION.md - Detalles técnicos
- EXAMPLES.md - Casos de uso

---

## 🎉 ¡LISTO!

Tu app de Basketball Stats está lista.

**Próximo paso**: Ejecuta `start.bat` y comienza a rastrear 🏀

---

*Última actualización: Noviembre 2025*
*Versión: 1.0.0*
