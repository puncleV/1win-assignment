FROM node:12.13.1-alpine

WORKDIR /opt/app
ENV NODE_ENV=production
CMD ["npm", "start"]
LABEL MAINTAINER="Kozlov Viktor <victor@kozlov.io>" VERSION="v1.0.0"

COPY --chown=node:node ./package.json package.json
COPY --chown=node:node ./src src
COPY --chown=node:node ./config.js config.js

RUN npm install

USER node
