FROM node:12.1.0 as prod
WORKDIR /app
COPY package*.json ./
RUN npm install
WORKDIR /app
COPY . .
RUN ls -al
ENV NODE_ENV=production
CMD ls -ltr && ls -al && npm install && npx sequelize db:create && npx sequelize db:migrate && npm start


# # dev config

FROM node:12.1.0 as dev
WORKDIR /app
COPY package*.json ./
RUN npm install
WORKDIR /app
COPY . .
RUN ls -al
ENV NODE_ENV=development
CMD ls -ltr && npm install && npx sequelize db:create && npx sequelize db:migrate && npm start
