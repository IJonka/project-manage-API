# Product Manager API

Backend API для управления продуктами.
Пользователи могут управлять своими продуктами, администратор — просматривать и удалять любые.

# Технологии

- Node.js
- Express
- MongoDB + Mongoose
- JWT Authentication

# Функционал

- Регистрация и логин
- JWT авторизация
- Роли user и admin
- CRUD продуктов
- Привязка продуктов к пользователю
- Pagination, фильтрация и сортировка

# Эндпоинты

### Auth

POST /auth/register  
POST /auth/login

### User

GET /products  
POST /products  
PUT /products/:id  
DELETE /products/:id

### Admin

GET /admin/products  
DELETE /admin/products/:id
