FROM node:14.4

ENV RABBITMQ_HOST rabbit

WORKDIR /usr/src/app

COPY ./package.json /usr/src/app/package.json
COPY ./package-lock.json /usr/src/app/package-lock.json
RUN npm i

COPY . /usr/src/app

CMD [ "npm", "start" ]