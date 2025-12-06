# API

Проект взаимодействует с внешним REST API для получения данных о товарах. При недоступности сервера используется резервный локальный источник.

## Базовый URL
```
http://noxer-test.ru/webapp/api/
```


## Эндпоинты

### `GET /products/on_main`

**Назначение**: Загрузка данных для главной страницы — товары, категории, параметры проекта.

**Пример запроса**:
```js
    fetch('http://noxer-test.ru/webapp/api/products/on_main')
```

**Успешный ответ (200 OK)**:
```json
{
  "products": [
    {
      "id": 1,
      "name": "Игровая мышь",
      "price": 2500,
      "old_price": 3000,
      "images": [{ "image_url": "f.jpg", "MainImage": true }],
      "marks": [{ "Mark_Name": "Хит", "color_code": "#FF0000" }]
    }
  ],
  "categories": [
    {
      "Category_ID": 1,
      "Category_Name": "Аксессуары",
      "Category_Image": "acc.jpg"
    }
  ],
  "special_project_parameters_json": {
    "fast_search_strings": {
      "parameters_list": ["мыши", "клавиатуры", "наушники"]
    }
  }
}
```

## Резервный источник данных

Если сервер недоступен, приложение автоматически загружает данные из:

```
    /public/data.json
```

Файл имеет **тот же формат**, что и API-ответ, и должен находиться в папке `public/`.

## Изображения товаров

Изображения хранятся по адресу:

```
https://noxer-test.ru/webapp/user_files/{filename}
```

Пример:
```html
<img src="https://noxer-test.ru/webapp/user_files/f.jpg" />
```

## Безопасность

- API не требует аутентификации (публичный доступ).
- Все данные читаются только (GET-запросы).
- Запись (корзина, избранное) хранится локально в `localStorage` и Redux.
