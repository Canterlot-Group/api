FROM node:14

WORKDIR /app
COPY package*.json ./


RUN npm i
RUN npm i -D

COPY . .
RUN npm run build

EXPOSE 8123
WORKDIR /app/dist
CMD ["node", "."]
