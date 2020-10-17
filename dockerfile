FROM node:14-alpine

WORKDIR /usr/src/app

RUN npm install -g http-server

ARG VUE_APP_API_URL

ENV VUE_APP_API_URL $VUE_APP_API_URL

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD [ "http-server", "dist"]