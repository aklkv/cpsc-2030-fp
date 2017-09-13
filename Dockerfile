FROM node:8

MAINTAINER Alexey Kulakov <akulakov@semios.com>

#Install global node modules
RUN npm install -g pm2@latest

# Install app
RUN rm -rf /var/www/*
ADD . /var/www

WORKDIR /var/www

RUN npm i

# Create Log directory
RUN mkdir /var/log/api

# Expose
EXPOSE 80

CMD npm start
