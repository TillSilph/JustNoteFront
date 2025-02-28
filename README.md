# JustNoteFront  

JustNoteFront — это фронтенд-приложение для [JustNote](https://github.com/TillSilph/JustNote), реализующее интерфейс для работы с заметками. Поддерживает авторизацию через [GEA](https://github.com/strelok-js/GraphicExpressAuthorization) и обработку уведомлений по будильникам, которые получаются в [JustNoteNotification](https://github.com/TillSilph/JustNoteNotification), установленным в заметках.  

## Стек технологий  
- **React** — основа приложения  
- **Vite** — сборка и разработка  
- **@tanstack/react-query** — управление серверным состоянием  
- **Axios** — работа с API  
- **Socket.io-client** — обработка WS уведомлений
- **Dayjs** — работа с датами  
- **React-datepicker** — выбор даты и времени  

## Основные функции  
- Авторизация через GEA  
- Создание, редактирование и удаление заметок  
- Установка будильников на заметки  
- Уведомления о срабатывании будильников  
- Уведмоления через WebSocket  

## Запуск проекта  
1. Установите зависимости:  
   ```sh
   npm install
   ```  
2. Сборка:  
   ```sh
   npm run build
   ```  
3. Переход в папку prod:  
   ```sh
   cd prod
   ```  
4. Переход в папку prod:  
   ```sh
   node index.cjs
   ```  