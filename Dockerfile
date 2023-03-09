FROM node:18 as build

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine as runtime

HEALTHCHECK CMD curl --fail http://localhost:3000 || exit 1

ENV SSENDR_STATIC_ROOT_FOLDER="public"
ENV SSENDR_DATABASE_PATH="file:/home/ssendr/database.sqlite"

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

COPY --from=build /app/public ./public
COPY --from=build /app/dist/server .
COPY --from=build /app/prisma ./prisma

# Entrypoint
COPY --from=build --chown=ssendr /app/entrypoint.sh .
RUN chmod +x entrypoint.sh

EXPOSE 3000

ENV PORT 3000

ENTRYPOINT [ "/home/ssendr/entrypoint.sh" ]
#CMD [ "npm", "run", "start" ]
