FROM node:20.6.1-slim

WORKDIR /opt/trick-surf-back

COPY . .

RUN apt-get update -y
RUN apt-get install -y openssl

RUN npm i bun -g
RUN bun i --ignore-scripts

RUN bun install
RUN bun run build
RUN bun run prisma:generate

ENV HOST 0.0.0.0
CMD ["bun", "run", "start"]

