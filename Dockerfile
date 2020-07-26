FROM node:12.1.0 as prod
WORKDIR /app
COPY package*.json ./
RUN npm install
WORKDIR /app
COPY . .
ENV NODE_ENV=production
CMD ls -ltr && npm install && npx sequelize db:create && npx sequelize db:migrate && npm run server


# dev config

FROM node:12.1.0 as dev
WORKDIR /app
ENV NODE_ENV=development
CMD ls -ltr && npm install && npx sequelize db:create && npx sequelize db:migrate && npm run server
