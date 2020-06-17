FROM node:12.1.0
WORKDIR /app
CMD ls -ltr && npm install && npx sequelize db:create && npx sequelize db:migrate && npm run server