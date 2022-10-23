FROM node:18-alpine
WORKDIR /app
COPY . /app/
RUN npm i 
RUN npm i -g nodemon 
CMD [ "nodemon", "app.js" ]
