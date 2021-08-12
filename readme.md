# webbylab-test
webbylab-test это тестовое задание, которое реализует REST API для хранения информации о фильмах. 
## API имеет такие маршруты:
---
+ POST /api/v1/films  - для сохранения фильма;
+ DELETE /api/v1/films/:filmsId - для удаления фильма;
+ GET /api/v1/films/:filmsId - для просмотра информации о фильме;
+ GET /api/v1/films - для просмотра списка всех фильтров. К запросу можно добавить такие параметры:
  + ?sort= для сортрировки результатов (ASC/DESC);
  + ?name= для поиска по имени (Top);
  + ?actors= для поиска по актера (Cruise);
+ POST /api/v1/upload - для загрузки файла.
+ GET /upload - для открытия страницы загрузки файла.
## Установка
---
1. ``` git clone https://github.com/yrprtk/webbylab-test.git ```
2. при необходимости переопределить .env либо будут использованы значения по умолчанию
3. ```docker-compose up -d --build```