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


server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;

    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl default_server;
    listen [::]:443 ssl default_server;
    server_name _;

    ssl_certificate /etc/letsencrypt/live/xsolare.pro-0001/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/xsolare.pro-0001/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    location / {
        try_files $uri $uri/ =404;
    }

    location /prac/ {
        proxy_pass http://172.17.0.3:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /api/ {
        proxy_pass http://172.17.0.5:3001/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

