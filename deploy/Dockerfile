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

# ----- Runtime layer -----
FROM nginx:1.23.1

COPY ./deploy/nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./deploy/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html

USER nginx
EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]
