FROM ubuntu:22.04

RUN apt-get update && apt-get install --no-install-recommends -y wget \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

RUN wget https://download.oracle.com/java/17/latest/jdk-17_linux-x64_bin.deb --no-check-certificate

RUN apt-get update && apt-get install --no-install-recommends -y curl unzip \
 ./jdk-17_linux-x64_bin.deb \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

ENV JAVA_HOME=/usr/lib/jvm/jdk-17-oracle-x64/bin
ENV PROXY_SERVER_PORT=8000
ENV SQL_SERVER_PORT=3306

EXPOSE 8000
EXPOSE 3306

RUN mkdir src
WORKDIR /src

COPY . .

RUN wget --no-check-certificate https://dev.mysql.com/get/Downloads/Connector-J/mysql-connector-j-8.3.0.zip -O mysql_connector.zip
RUN unzip mysql_connector.zip

# Preserve any files generated within the container
RUN mkdir - artifacts
VOLUME /src/artifacts
ENV ARTIFACTS_ROOT=/src/artifacts

# The following commands may be changed depending on the how
# We decide to build and run the Java Server
# RUN javac ./*.java -cp .:mysql_connector

# CMD ["java", "Main", "-cp", ".:mysql_connector"]
