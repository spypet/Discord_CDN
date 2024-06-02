FROM node:alpine

RUN mkdir -p /usr/src/discord_cdn
WORKDIR /usr/src/discord_cdn

COPY . /usr/src/discord_cdn
RUN npm install typescript -g
RUN yarn
RUN tsc

CMD [ "node", "./dist/server.js"]