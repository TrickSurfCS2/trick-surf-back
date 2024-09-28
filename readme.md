# Backend service for TrickSurf

## Endpoints

Вот таблица с описанием всех роутов, которые были определены в предоставленном коде, с указанием того, что они возвращают, основываясь на схеме Prisma:

| Метод | Путь                  | Описание                                                                                                                             |
| ----- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| GET   | `/user/`              | Массив объектов `User`, содержащих информацию о всех пользователях.                                                                  |
| GET   | `/user/:id`           | Объект `User`, содержащий информацию о пользователе с указанным `id`. Если пользователь не найден, возвращает ошибку 404.            |
| GET   | `/user/:id/permisson` | Массив объектов `UserPermission`, содержащих информацию о разрешениях пользователя с указанным `id`.                                 |
| GET   | `/trigger/`           | Массив объектов `Trigger`, содержащих информацию о всех триггерах. Может быть отфильтрован по `mapId`, `name`, `fullName`, `id`.     |
| GET   | `/trick/`             | Массив объектов `Trick`, содержащих информацию о всех трюках.                                                                        |
| GET   | `/trick/list`         | Массив объектов `Trick`, содержащих информацию о трюках, отфильтрованных по `mapId`.                                                 |
| GET   | `/trick/:trickId/wr`  | Объект `TrickRecord`, содержащий информацию о рекордах трика по `time` и `speed`. Если таковые не найдены, возвращает поля с `null`. |
| GET   | `/map/`               | Массив объектов `Map`, содержащих информацию о всех картах.                                                                          |

## Local Development

> Required dependencies

- `bun` is used to install packages
- `node` is a runtime environment

> Run project

- `bun i` installing dependencies
- `bun run dev` starting development mode

```md
✨ default server listening on the port 8080

🌱 REST endpoints
http://localhost:8080/api
```

### In order for everything to work correctly, the PostgreSQL database must be up and running.

```bash
docker run -p 5432:5432 \
  --name surfgxds-postgres \
  -e POSTGRES_PASSWORD=surfgxds \
  -e POSTGRES_USER=surfgxds \
  -e POSTGRES_DB=surfgxds_dev \
  -d \
  --restart always \
  postgres:latest
```

After launching, perform migrations and seeding of all data, this can be done by writing:

- `bun run prisma:reset`
