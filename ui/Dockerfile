FROM node:12 as builder
COPY ./src /root/src
WORKDIR /root/src
RUN npm install
RUN npm run build

#FROM nginx:1.17.3
#
#RUN apt update
#RUN apt install php-fpm -y
#COPY --from=builder /root/src/build /usr/share/nginx/html
#COPY default.conf /etc/nginx/conf.d/default.conf
#
#RUN echo "now building..."

FROM php:7.1-apache

COPY --from=builder /root/src/build /var/www/html
COPY ./src/telemetry/ /var/www/html/
COPY ./000-default.conf /etc/apache2/sites-available/000-default.conf