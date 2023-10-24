# Build layer
FROM node:lts-alpine AS build
RUN mkdir -p /usr/banter-boost-discord-bot-src/
WORKDIR /usr/banter-boost-discord-bot-src/
COPY package.json /usr/banter-boost-discord-bot-src/
RUN npm install
COPY . /usr/banter-boost-discord-bot-src/
RUN npm run build

# Image layer
FROM node:lts-alpine

ARG DISCORD_TOKEN
ARG TZ

ENV DISCORD_TOKEN=${DISCORD_TOKEN}
ENV TZ=${TZ}

ENV NODE_ENV=production

RUN mkdir -p /usr/banter-boost-discord-bot
WORKDIR /usr/banter-boost-discord-bot
COPY package.json /usr/banter-boost-discord-bot/
RUN npm install --omit=dev
COPY --from=build /usr/banter-boost-discord-bot-src/dist /usr/banter-boost-discord-bot

CMD ["npm", "run", "start:prod"]