FROM node:12.1.0
WORKDIR /app
CMD ls -ltr && npm install && npm run server