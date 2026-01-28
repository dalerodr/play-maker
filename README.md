# Basketball Stats Tracker 🏀

Una aplicación web para registrar estadísticas de baloncesto en tiempo real.

## Características

✨ **Registro en Tiempo Real**
- 📊 Estadísticas por jugador: 2 puntos, 3 puntos, faltas, rebotes, asistencias
- 👥 Selector de jugadores en el campo con sustituciones instantáneas
- 🕐 Cronómetro de 10 minutos por cuarto (pausable y editable)
- 📈 Contador de puntos por equipo en tiempo real

## Funcionalidades Principales

### 1. Gestión de Jugadores
- Vista de 5 v 5 (inicio por defecto)
- Cambios de jugadores en cualquier momento
- 12 jugadores por equipo (local y visitante)
- Números y nombres personalizables

### 2. Registro de Acciones
- **+2 Puntos**: Marca 2 puntos
- **+3 Puntos**: Marca 3 puntos
- **Falta**: Cuenta faltas personales
- **Rebote**: Registra rebotes
- **Asistencia**: Cuenta asistencias

### 3. Control de Tiempo
- Cronómetro de 10 minutos por cuarto
- Controles: Iniciar/Pausar, Reiniciar, Editar
- Navegación entre cuartos (1-4)
- Todos los eventos se registran con timestamp (minuto y cuarto)

### 4. Historial de Eventos
- Log de todos los eventos registrados
- Información: Jugador, acción, tiempo, equipo
- Desplazamiento para ver historial completo

### 5. Resumen por Equipo
- Puntos totales
- Faltas totales
- Rebotes totales
- Asistencias totales
- Estadísticas individuales de jugadores

### 6. Exportación de Datos
- Descarga de estadísticas en formato JSON
- Incluye: Datos finales, eventos registrados, timestamps
- Fácil de importar en otras aplicaciones

## Instalación

```bash
# Instalar dependencias
npm install

# Iniciar modo desarrollo
npm run dev

# Compilar para producción
npm run build

# Vista previa de producción
npm run preview
```

## Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── PlayerGrid.tsx          # Grid de selección de jugadores
│   ├── PlayerStatsDisplay.tsx   # Mostrar stats del jugador seleccionado
│   ├── ActionButtons.tsx        # Botones de acciones
│   ├── QuarterTimer.tsx         # Reloj del cuarto
│   ├── GameEventLog.tsx         # Registro de eventos
│   └── TeamSummary.tsx          # Resumen de equipo
├── hooks/
│   └── useQuarterTimer.ts       # Hook para el cronómetro
├── types/
│   └── index.ts                 # Tipos TypeScript
├── App.tsx                      # Componente principal
├── main.tsx                     # Entry point
└── index.css                    # Estilos globales
```

## Uso

1. **Selecciona un Equipo**: Local o Visitante
2. **Selecciona un Jugador**: Haz clic en su número o nombre
3. **Registra una Acción**: Presiona el botón correspondiente
4. **Gestiona el Tiempo**: Inicia, pausa o edita el cronómetro
5. **Realiza Cambios**: Saca y mete jugadores como sea necesario
6. **Revisa el Historial**: Ve todos los eventos en el registro
7. **Exporta los Datos**: Descarga las estadísticas finales

## Datos Registrados por Evento

```json
{
  "timestamp": "Minuto 5 Cuarto 2",
  "quarter": 2,
  "minute": 5,
  "second": 30,
  "playerId": "home-0",
  "playerName": "Jugador Local 1",
  "playerNumber": 1,
  "team": "home",
  "action": "points3",
  "teamStats": {
    "totalPoints": 45,
    "totalFouls": 8,
    "field2Points": 15,
    "field3Points": 5,
    "totalRebounds": 22,
    "totalAssists": 12
  }
}
```

## Tecnologías

- ⚛️ React 18
- 📘 TypeScript
- 🎨 Tailwind CSS
- ⚡ Vite
- 🎯 React Hooks

## Licencia

MIT
