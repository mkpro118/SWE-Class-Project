# Start from the latest stable version of MySQL Server
FROM mysql/mysql-server:latest

# The primary directory will be the /src in all apps
RUN mkdir src
WORKDIR /src

# Preserve any files generated within the container
RUN mkdir -p artifacts
VOLUME /src/artifacts

COPY . .

# The file that contains required sensitive information
ENV MYSQL_ROOT_PASSWORD_FILE=/src/secrets
