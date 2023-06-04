# Build docker image.
# Sử dung node
FROM node:16.14.0 as builder

ARG workdir=.
LABEL description="deploy react app"

WORKDIR /app

COPY ${workdir}/ /app/

COPY .env.local .env.production

RUN yarn
RUN yarn build

RUN yarn global add serve
CMD  ["serve", "-s", "build"]
