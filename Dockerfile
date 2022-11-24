FROM node:14.18.3

WORKDIR  /app

COPY package.json /app

RUN npm install

COPY . .

RUN npm run build-all

EXPOSE 3000

CMD [ "node", "server/app.js" ]