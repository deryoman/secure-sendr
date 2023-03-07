FROM node:18 as build

WORKDIR /usr

COPY package.json ./
COPY package-lock.json ./
RUN npm ci

COPY . ./
RUN npm run build

FROM node:18-alpine as runtime

HEALTHCHECK CMD curl --fail http://localhost:8080 || exit 1

ENV SSENDR_SERVER_HOST="0.0.0.0"
ENV SSENDR_SERVER_PORT="8080"
ENV SSENDR_STATIC_ROOT_FOLDER="public"

RUN addgroup ssendr --gid 10002
RUN adduser ssendr \
  -h /home/ssendr \
  -D \
  -G ssendr \
  -u 10002

RUN apk upgrade --no-cache --available && apk add --no-cache \
    g++ \
    make \
    py3-pip \
    bash

USER 10002

WORKDIR /home/ssendr

COPY package.json ./
RUN npm install --omit=dev

COPY --from=build /usr/public ./public
COPY --from=build /usr/dist/server .

EXPOSE 8080

CMD [ "npm", "run", "start" ]
