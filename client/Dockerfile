FROM node:14.15-alpine as builder
LABEL maintainer="Julio Cesar <julio@blackdevs.com.br>"

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --production=true
COPY . .
RUN npm run build

FROM nginx:1-alpine as runtime

EXPOSE 80

COPY --from=builder --chown=nginx:nginx /app/dist /usr/share/nginx/html
