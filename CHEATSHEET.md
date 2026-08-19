# REFERENCIA RÁPIDA - Basketball Stats Tracker

## INICIAR

```bash
npm install
npm run dev
```

---

## ACCIONES DISPONIBLES

| Acción | Botón | Color | Efecto |
|--------|-------|-------|--------|
| +1 Punto | +1 | Rojo | Tiros libres |
| +2 Puntos | +2 | Rojo | Tiros de campo |
| +3 Puntos | +3 | Rojo | Tiros de larga distancia |
| Falta | Falta | Ámbar | +1 falta personal |
| Falta Técnica | Técnica | Ámbar oscuro | +1 falta técnica (acumula) |
| Falta Antideportiva | Anti. | Rojo oscuro | +1 falta antideportiva (acumula) |
| Rebote | Rebote | Blanco | +1 rebote |
| Asistencia | Ast. | Neón verde | +1 asistencia |
| Robo | Robo | Púrpura | +1 robo |
| Pérdida | Pérd. | Naranja | +1 pérdida |

**Regla**: Selecciona un jugador en cancha primero, luego presiona la acción.

---

## EXPULSIÓN AUTOMÁTICA

| Condición | Resultado |
|-----------|-----------|
| 5 faltas personales | Expulsión + modal de sustitución |
| 2 faltas técnicas | Expulsión + modal de sustitución |
| 2 faltas antideportivas | Expulsión + modal de sustitución |

---

## CONTROLES DEL TIEMPO

| Control | Efecto |
|---------|--------|
| ▶ Iniciar | Comienza cuenta regresiva |
| ⏸ Pausar | Detiene el cronómetro |
| ↻ Reiniciar | Vuelve a 10:00 |
| ✎ Editar | Cambia minuto/segundo |
| Anterior ← | Cuarto anterior |
| Siguiente → | Cuarto siguiente |

---

## BOTONES PRINCIPALES

| Botón | Función |
|-------|---------|
| ↶ Deshacer | Revierte la última acción |
| 🔁 Cambios | Abre modal de sustituciones |
| 👥 Editar Equipos | Abre modal para editar nombres/números |
| 📥 Descargar | Exporta estadísticas a JSON |
| 🔄 Nuevo Partido | Resetea todo (mantiene configuración) |

---

## TABS

| Tab | Contenido |
|-----|-----------|
| Acciones | Jugadores en cancha + eventos + botones de acción |
| Resumen | Tabla de estadísticas por equipo |

---

## LAYOUT RESPONSIVO

| Dispositivo | Layout |
|-------------|--------|
| Desktop (lg+) | 3 columnas: jugadores \| eventos \| acciones |
| Tablet (md) | 2 columnas: jugadores \| eventos + acciones |
| Móvil | Stacked: acciones → jugadores (scroll) → eventos |

---

## MÁXIMOS

| Concepto | Límite |
|----------|--------|
| Jugadores por equipo | 12 |
| En cancha por equipo | 5 |
| Tiros libres por jugador | Sin límite |
| Faltas personales antes de expulsión | 5 |
| Faltas técnicas antes de expulsión | 2 |
| Faltas antideportivas antes de expulsión | 2 |
| Duración de cuarto | 10 minutos |
| Cuartos por partido | 4 |

---

## ARCHIVOS IMPORTANTES

| Archivo | Propósito |
|---------|-----------|
| `src/config/playersConfig.ts` | Nombres y números iniciales |
| `tailwind.config.js` | Colores Bulls y animaciones |
| `src/hooks/useQuarterTimer.ts` | Duración del cuarto |

---

## PERSONALIZAR

### Cambiar nombres de jugadores
Edita `src/config/playersConfig.ts` y recarga la app.

### Cambiar colores
Modifica `tailwind.config.js` → `theme.extend.colors.bulls`.

### Cambiar duración de cuarto
Modifica `src/hooks/useQuarterTimer.ts` → `minute: 10`.

---

## TECNOLOGÍAS

- React 18 + TypeScript 5.3
- Tailwind CSS 3.3
- Vite 5.0
- Tema dark premium con glass morphism
- Modales con scroll seguro (useBodyScrollLock)
