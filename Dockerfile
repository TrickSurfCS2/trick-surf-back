FROM node:20.9.0-bullseye-slim

WORKDIR /opt/trick-surf-back

COPY . .

RUN apt-get update -y
RUN apt-get install -y apt-utils openssl

RUN npm i bun @antfu/ni -g
RUN ni --ignore-scripts

RUN nr build
RUN bun run prisma:generate

ENV HOST 0.0.0.0
CMD ["nr", "start"]
