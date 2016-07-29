FROM nodesource/trusty:latest
MAINTAINER Alexey Kulakov <akulakov@semios.com>

ENV TERM xterm

RUN apt-get update -y && \
    apt-get install -y nano vim

# Install nodemon
RUN npm install -g nodemon

# Install app
RUN rm -rf /var/www/*
ADD . /var/www
RUN  cd /var/www && npm install

# Expose
EXPOSE 80

WORKDIR /var/www

CMD npm run start
