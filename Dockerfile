FROM node AS builder

WORKDIR /fit-app
COPY . .
COPY package.json .

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]