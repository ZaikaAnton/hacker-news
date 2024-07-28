FROM node:21.7.3-alpine AS builder

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]

RUN npm run build

FROM nginx:1.21.6-alpine

COPY --from=builder app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]