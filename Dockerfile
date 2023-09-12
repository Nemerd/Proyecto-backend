FROM node

WORKDIR /Backend-tienda

COPY . .

RUN npm install

EXPOSE 8080

CMD [ "npm", "start" ]