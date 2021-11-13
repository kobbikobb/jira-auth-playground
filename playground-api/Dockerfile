FROM node:16

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY nodemon.json ./
RUN npm install

COPY . ./

CMD [ "npm", "start" ]

EXPOSE 8080