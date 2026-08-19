# Basketball Stats Tracker 🏀

Aplicación web moderna para registrar estadísticas de baloncesto en tiempo real. Tema dark premium con efectos glass morphism, diseño responsivo y modales con scroll seguro.

## Características

✨ **Registro en Tiempo Real**
- 📊 10 acciones por jugador: +1, +2, +3 puntos, falta, falta técnica, falta antideportiva, rebote, asistencia, robo, pérdida
- 👥 Selector de jugadores en el campo con sustituciones instantáneas
- 🕐 Cronómetro de 10 minutos por cuarto (pausable y editable)
- 📈 Contador de puntos por equipo en tiempo real
- ⚠️ Expulsión automática a 5 faltas personales o 2 faltas técnicas/antideportivas

## Funcionalidades Principales

### 1. Gestión de Jugadores
- 5 v 5 por defecto (Base, Escolta, Alero, Ala-Pívot, Pívot)
- Cambios de jugadores en cualquier momento
- 12 jugadores por equipo (local y visitante)
- Números y nombres personalizables

### 2. Registro de Acciones
- **+1 Punto**: Tiros libres
- **+2 Puntos**: Tiros de campo cercanos
- **+3 Puntos**: Tiros de larga distancia
- **Falta**: Faltas personales
- **Falta Técnica**: Acumula hacia expulsión
- **Falta Antideportiva**: Acumula hacia expulsión
- **Rebote**: Registra rebotes
- **Asistencia**: Cuenta asistencias
- **Robo**: Registra robos de balón
- **Pérdida**: Registra pérdidas de balón

### 3. Control de Tiempo
- Cronómetro de 10 minutos por cuarto
- Controles: Iniciar/Pausar, Reiniciar, Editar
- Navegación entre cuartos (1-4)
- Todos los eventos se registran con timestamp (minuto y cuarto)

### 4. Gestión de Cambios
- Modal con scroll seguro (no scrollea el fondo)
- Máximo 5 jugadores por equipo en el campo
- Click para sacar/meter jugadores
- Contador visual de jugadores en cancha

### 5. Edición de Equipos
- Modal para editar nombres y números de jugadores
- Edición de nombres de equipo
- Mismo sistema de scroll seguro que cambios

### 6. Historial de Eventos
- Log de todos los eventos registrados
- Información: Jugador, acción, tiempo, equipo
- Edición y eliminación de eventos
- Función deshacer última acción

### 7. Resumen por Equipo
- Puntos totales por tipo (1pt, 2pt, 3pt)
- Faltas, rebotes, asistencias, robos, pérdidas
- Estadísticas individuales de jugadores

### 8. Exportación de Datos
- Descarga de estadísticas en formato JSON
- Incluye: Datos finales, eventos registrados, timestamps

### 9. Diseño Premium
- Tema oscuro con glass morphism
- Fondo sutil con imagen Bulls
- Animaciones suaves
- Totalmente responsivo (desktop, tablet, móvil)

## Instalación

```bash
# Instalar dependencias
npm install

# Iniciar modo desarrollo
npm run dev

# Compilar para producción
npm run build

# Verificar tipos
npm run type-check
```

## Estructura del Proyecto

```
src/
├── components/
│   ├── ActionButtons.tsx         # Botones de acciones (10 tipos)
│   ├── EditTeamsModal.tsx        # Modal para editar equipos
│   ├── FoulOutModal.tsx          # Modal de expulsión por faltas
│   ├── GameEventLog.tsx          # Registro de eventos
│   ├── PlayerActionSelector.tsx  # Selector de jugadores en cancha
│   ├── QuarterTimer.tsx          # Cronómetro y puntuación
│   ├── TabNavigation.tsx         # Navegación entre tabs
│   └── tabs/
│       ├── ActionsTab.tsx        # Tab de acciones (3 layouts)
│       └── SummaryTab.tsx        # Tab de resumen
├── hooks/
│   ├── useBodyScrollLock.ts      # Bloqueo de scroll para modales
│   ├── useGameState.ts           # Estado del juego
│   ├── usePlayerActions.ts       # Acciones de jugadores
│   └── useQuarterTimer.ts        # Cronómetro
├── config/
│   └── playersConfig.ts          # Configuración inicial
├── types/
│   └── index.ts                  # Tipos TypeScript
├── App.tsx                       # Componente principal
├── App.css                       # Estilos de la app
├── index.css                     # Estilos globales y modales
└── main.tsx                      # Entry point
```

## Uso

1. **Selecciona Jugadores**: Haz clic en los jugadores de cada equipo
2. **Registra Acciones**: Selecciona un jugador y presiona el botón correspondiente
3. **Gestiona Cambios**: Usa el botón "Cambios" para sacar/meter jugadores
4. **Edita Equipos**: Usa "Editar Equipos" para cambiar nombres/números
5. **Controla el Tiempo**: Inicia, pausa o edita el cronómetro
6. **Deshacer**: Usa "↶ Deshacer" si cometes un error
7. **Exporta**: Descarga las estadísticas al finalizar

## Tecnologías

- ⚛️ React 18
- 📘 TypeScript 5.3
- 🎨 Tailwind CSS 3.3
- ⚡ Vite 5.0
- 🎯 React Hooks
- 🎨 Custom Bulls Theme

## Licencia

MIT
