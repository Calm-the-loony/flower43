FROM node:20-bullseye

WORKDIR /app

COPY . .

RUN npm ci

EXPOSE 5000

CMD ["node", "app.js"]
