FROM nodesource/trusty:latest
MAINTAINER Alexey Kulakov <akulakov@semios.com>

ENV TERM xterm

RUN apt-get update -y && \
    apt-get install -y nano

#Install global node modules
RUN npm install -g pm2

# Install app
RUN rm -rf /var/www/*
ADD . /var/www
RUN  cd /var/www && npm install

# Create Log directory
RUN mkdir /var/log/api

# Expose
EXPOSE 80

WORKDIR /var/www

CMD npm run start-watch && pm2 logs
