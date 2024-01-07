FROM node:20.9.0-bullseye-slim

WORKDIR /opt/trick-surf-back

COPY . .

RUN npm i bun @antfu/ni -g
RUN ni --ignore-scripts

RUN nr build

ENV HOST 0.0.0.0
CMD ["nr", "start"]
