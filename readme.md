# Backend service for TrickSurf

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
