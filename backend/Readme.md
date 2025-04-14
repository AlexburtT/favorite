// Внимание! Версия json-server должна быть не выше 0.17.4, так как выше версии не могут в ComonJS или ESmodule

# JSON Server with Poster Upload

Этот проект представляет собой сервер на базе `json-server`, который предоставляет REST API для управления данными из файла `db.json`. Дополнительно реализована возможность загрузки и удаления постеров через эндпоинты `/posters`.

## Описание проекта

-   **Основной функционал**: Сервер предоставляет REST API для работы с файлом `db.json` (CRUD операции).
-   **Загрузка файлов**: Реализована возможность загрузки постеров через эндпоинт `/posters`.
-   **Удаление файлов**: Можно удалять загруженные постеры через эндпоинт `/posters`.
-   **Безопасность**: Запрещено удаление файла `no_product_img.png`.

## Требования

Для запуска проекта необходимо установить Node.js версии 16 или выше.

## Установка

1. Клонируйте репозиторий:

    ```bash
    git clone https://github.com/your-repo-url.git
    cd server

    ```

2. Установите зависимости:
   npm install

3. Создайте файл db.json в корне проекта. Пример структуры файла:

    ```json
    {
    	"movies": [
    		{
    			"name": "The Matrix",
    			"releaseYear": 1999,
    			"genres": ["фантастика", "боевик"],
    			"poster": [],
    			"description": "Описание фильма",
    			"id": 1,
    			"viewed": false,
    			"favorite": false
    		}
    	]
    }
    ```

4. Создайте папку posters в корне проекта (если она отсутствует):
   mkdir posters

5. Поместите файл no_product_img.png в папку posters. Этот файл будет использоваться как заглушка для фильмов без постера.

## Запуск сервера

### Для разработки

    ```bash
    npm run dev
    ```

### Для продакшена

    ```bash
    npm start
    ```

После запуска сервер будет доступен по адресу: http://localhost:3000 .

## REST API для работы с db.json

Сервер предоставляет стандартные CRUD операции для работы с данными из файла db.json. Например:

    - GET /products — получить список всех продуктов.
    - POST /products — создать новый продукт.
    - PUT /products/:id — обновить продукт.
    - DELETE /products/:id — удалить продукт.

Документация json-server[https://github.com/typicode/json-server?spm=a2ty_o01.29997173.0.0.65ddc921Joatx3]

## Загрузка постера

    Метод : POST
    URL : /posters
    Тело запроса : Форма с полем poster (файл).

Пример запроса с использованием curl:

    ```bash
    curl -X POST http://localhost:3000/posters \
    -F "poster=@path/to/your/image.jpg"
    ```

Ответ:

    ```json
        {
            "path": "/posters/<unique-id>--image.jpg"
        }
    ```

## Удаление постера

    Метод : DELETE
    URL : /posters
    Параметры : path — путь к файлу постера (например, /posters/<unique-id>--image.jpg).

Пример запроса:

    ```bash
    curl -X DELETE "http://localhost:3000/posters?path=/posters/<unique-id>--image.jpg"
    ```

Ответ:

    ```json
    {
    "message": "Постер успешно удален"
    }
    ```

## Получение постера

Загруженные постеры доступны по URL:
http://localhost:3000/posters/<filename>

Например:
http://localhost:3000/posters/<unique-id>--image.jpg

## Конфигурация

Порт : Сервер работает на порту 3000. Если нужно изменить порт, отредактируйте файл main.js:
`javascript
        server.listen(3000, () => {
        console.info('JSON Server запущен на http://localhost:3000');
        });
    `
Папка для постеров : По умолчанию постеры сохраняются в папке posters. Если нужно изменить путь, отредактируйте параметр destination в конфигурации multer.
