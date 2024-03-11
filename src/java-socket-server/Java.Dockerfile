# Start from the stable Ubuntu 22.04 LTS version
FROM ubuntu:22.04

# Need to install wget to fetch sources from the internet
RUN apt-get update && apt-get install --no-install-recommends -y wget \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

# Download Java 17
RUN wget https://download.oracle.com/java/17/latest/jdk-17_linux-x64_bin.deb --no-check-certificate

# Install Java 17 and other necessary software
RUN apt-get update && apt-get install --no-install-recommends -y curl unzip \
 ./jdk-17_linux-x64_bin.deb \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

# Build systems use the JAVA_HOME environment variable
ENV JAVA_HOME=/usr/lib/jvm/jdk-17-oracle-x64/bin

# Define communication ports as environment variables to avoid hardcoding them
# in applications
ENV PROXY_SERVER_PORT=8000
ENV SQL_SERVER_PORT=3306

# These don't really do much, but allow readers to know these ports will be
# exposed
EXPOSE 8000
EXPOSE 3306

# The primary directory will be the /src in all apps
RUN mkdir src
WORKDIR /src

COPY . .

# MySQL plugin for connection Java Apps to MySQL
RUN wget --no-check-certificate https://dev.mysql.com/get/Downloads/Connector-J/mysql-connector-j-8.3.0.zip -O mysql_connector.zip
RUN unzip mysql_connector.zip

# Preserve any files generated within the container
RUN mkdir - artifacts
VOLUME /src/artifacts
ENV ARTIFACTS_ROOT=/src/artifacts

# The following commands may be changed depending on the how
# We decide to build and run the Java Server
RUN javac -d bin -cp .:mysql_connector ./*.java

CMD ["java", "-cp", "bin:mysql_connector", "JavaServer"]
