FROM node:10.16-slim

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json yarn.lock /usr/src/app/
RUN yarn
COPY . /usr/src/app

CMD [ "node", "index" ]