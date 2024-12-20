FROM node:14.15
WORKDIR /usr/src/app
COPY app/ .
RUN pwd
RUN ls -a
RUN npm ci
CMD ["node", "server.js"]
