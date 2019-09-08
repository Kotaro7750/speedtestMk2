FROM node:12 as builder
COPY ./src /root/src
WORKDIR /root/src
RUN npm install
RUN npm run build

FROM nginx:1.17.3

RUN apt update
RUN apt install php7.2 -y
COPY --from=builder /root/src/build /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf

RUN echo "now building..."