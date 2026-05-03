## Запуск

1. npm install
2. npm run dev

## Комментарии

1. Для проверок снизил порог победной силы удара. Можно увеличить в src/constants/gameConfig.ts (GAME_CONFIG.WIN_THRESHOLD)

## Описание структуры

```
./src/
│
├── assets/
│   ├── css/
│   │   ├── animations.css          # Глобальные @keyframes
│   │   ├── index.css               # Глобальные стили
│   │   └── variables.css           # Цвета, радиусы, отступы
│   └── images/                     # Изображения
│
├── components/
│   ├── features/                   # Компоненты, привязаные к домену
│   │   └── [ComponentName]/
│   │       ├── [componentName].constants.ts  # Локальные константы (состояния, конфиг, события)
│   │       ├── [componentName].types.ts      # Типы пропсов, внутренние типы, опционально
│   │       ├── [componentName].utils.ts      # Локальные хелперы, опционально
│   │       └── [ComponentName].vue
│   │
│   └── ui/                         # Переиспользуемые UI-компоненты
│       └── [ComponentName]/
│           ├── [componentName].constants.ts
│           ├── [componentName].types.ts
│           └── [ComponentName].vue
│
├── constants/                      # Глобальные константы
│   ├── gamePhases.ts               # Список фаз игры
│   ├── gameConfig.ts               # Общая конфигурация игры
│   └── *Map.ts                     # Маппинги: фаза игры → состояние компонента
│
├── composables/
│   ├── useGameEngine.ts            # Рутовый хук
│   ├── use[Feature].ts             # Хуки бизнес-фич (usePowerMeter)
│   └── use[Utility].ts             # Универсальные хуки (useTimeoutWatch)
│
├── utils/                          # Утилиты, чистые функции
│
├── App.vue
├── main.ts

```
