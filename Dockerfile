FROM docker-hub.ai/centos

MAINTAINER wangyongkang

ADD src /data/src

WORKDIR /data/src

EXPOSE 8022 8080 8443

ENV PORT 8080

RUN mkdir -p /raid/data/logs

RUN npm config set registry="http://registry.cnpmjs.org"

RUN npm install

CMD node bin/www >> /raid/data/logs/api.log 1>>  /raid/data/logs/api.log 2>> /raid/data/logs/api.log
