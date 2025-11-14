# «Инклюзивный конструктор» — Front End

### Стек
TypeScript, React, Vite, Max UI, Max Bridge, Tailwind, motion (framer-motion), clsx

Инструменты: ESLint, Prettier, VS Code

### Зависимости
В проекте используется пакетный менеджер [pnpm](https://pnpm.io/installation) и соответствующий lock-файл.
Необходимые зависимости прописаны в файле `package.json`, а их версии зафиксированы в `pnpm-lock.yaml`.

### Конфигурация
В файле `.env` хранится конфигурация проекта. Все переданные переменные `VITE_*` являются публичными и попадают в итоговый бандл.
```environment
# Базовый адрес API бэкенда
VITE_BACKEND_URL=https://max-hackaton-be.peaceinwealth.ru
```

### Локальный запуск
1. Установка зависимостей
```shell
pnpm i
```

2. Запуск в режиме разработки
```shell
pnpm dev
```

### Сборка для продакшена
1. Установка зависимостей
```shell
pnpm i
```

2. Сборка
```shell
pnpm build
```
На выходе получаем папку `dist` с необходимой статикой.

### Сборка и запуск через Docker
Итоговый Docker-образ является образом Alpine Linux с предустановленным Nginx и настроенным на раздачу статики, полученной в результате сборки. В файле `.nginx/nginx.conf` содержится конфигурация Nginx.

1. Сборка
```shell
docker build -t max-hackaton-fe .
```

2. Запуск
```shell
docker run -p 80:80 -d max-hackaton-fe
```
Приложение доступно на порту 80.

### CI/CD
В данном репозитории настроен [GitHub Workflow](.github/workflows/deploy.yaml) для сборки проекта и деплоя с использованием GitHub Pages.

[Ссылка на деплой](https://kosheeta.github.io/max-hackaton-fe/) (примечание: приложение не будет работать корректно вне мессенджера MAX)
