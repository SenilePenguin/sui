FROM busybox

LABEL maintainer="SenilePenguin"

WORKDIR /opt/html

COPY . /opt/html

EXPOSE 80

ENTRYPOINT [ "httpd", "-f", "-v", "-u", "1000" ]
