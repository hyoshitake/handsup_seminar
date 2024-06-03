FROM node:14.15.3
WORKDIR /usr/src/app
RUN npm ci
COPY app/ .
CMD ["node", "server.js"]
