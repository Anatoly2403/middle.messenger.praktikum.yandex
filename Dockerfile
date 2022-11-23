FROM node:14.18.3

WORKDIR  /app

COPY . .

RUN npm install

RUN npm run build-all

EXPOSE 3000

CMD [ "node", "server/app.js" ]