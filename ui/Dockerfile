FROM nginx:1.17.3

COPY ./src/build /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf

RUN echo "now building..."