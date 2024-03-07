FROM mysql/mysql-server:latest

RUN mkdir src
WORKDIR /src

COPY . .

ENV MYSQL_ROOT_PASSWORD_FILE=/src/secrets

# Preserve any files generated within the container
RUN mkdir -p artifacts
VOLUME /src/artifacts
