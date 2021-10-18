FROM node:14.15-alpine
LABEL maintainer="Julio Cesar <julio@blackdevs.com.br>"

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install
COPY . .

EXPOSE 8080

CMD ["yarn", "run", "dev"]