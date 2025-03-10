FROM nginxinc/nginx-unprivileged
EXPOSE 8080
COPY ./docker/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY ./index.html /usr/share/nginx/html/index.html