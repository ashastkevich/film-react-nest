http://89.169.190.133/

# Production запуск

1. Создайте файл окружения для production, например `.env`, используя переменные из `.env.example`:
   - `DATABASE_DRIVER`
   - `DATABASE_HOST`
   - `DATABASE_PORT`
   - `DATABASE_NAME`
   - `DATABASE_USERNAME`
   - `DATABASE_PASSWORD`
   - `POSTGRES_USER`
   - `POSTGRES_PASSWORD`
   - `POSTGRES_DB`
   - `PGADMIN_DEFAULT_EMAIL`
   - `PGADMIN_DEFAULT_PASSWORD`
   - `OWNER`

2. Запустите production-сервисы с помощью Docker Compose:
   docker compose -f docker-compose-pub.yml up -d

3. Используемые production-образы:
   - `ghcr.io/ashastkevich/film-react-nest-frontend:latest`
   - `ghcr.io/ashastkevich/film-react-nest-backend:latest`
   - `ghcr.io/ashastkevich/film-react-nest-server:latest`
   - `postgres:16.4`
   - `dpage/pgadmin4`
