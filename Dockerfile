# ---- Node modules ----- #
FROM oven/bun AS node_modules

WORKDIR /opt/app

COPY ./package*.json ./bun* ./
COPY ./prisma/schema.prisma ./prisma/schema.prisma

RUN bun install --ignore-scripts
RUN bun prisma:generate

# ---- Build ------------ #
FROM node:22.2.0-bullseye-slim AS dist

WORKDIR /opt/app

COPY --from=node_modules /opt/app/node_modules ./node_modules
COPY . .

RUN npm run typecheck
RUN npm run lint
RUN npm run build

# ---- Release ---------- #
FROM gcr.io/distroless/nodejs22-debian12

WORKDIR /opt/app

COPY --from=dist /opt/app/dist dist

CMD [ "./dist/index.cjs" ]


