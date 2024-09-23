<br />

```md
✨ default server listening on the port 8080

🌱 REST endpoints
http://localhost:8080/api
```

Startup guideline

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
