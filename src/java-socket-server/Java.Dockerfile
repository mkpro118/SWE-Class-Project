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
ENV WEBSERVER_HOST=web_server
ENV PROXYSERVER_HOST=proxy_server
ENV SQL_SERVER_HOST=sql_server
ENV WEBSERVER_PORT=5000
ENV PROXYSERVER_PORT=8000
ENV SQL_SERVER_PORT=3306
ENV USERNAME=username
ENV PASSWORD=password


# These don't really do much, but allow readers to know these ports will be
# exposed
EXPOSE 8000
EXPOSE 3306


# The primary directory will be the /src in all apps
RUN mkdir src
WORKDIR /src


# Preserve any files generated within the container
RUN mkdir -p artifacts
VOLUME /src/artifacts
ENV ARTIFACTS_ROOT=/src/artifacts


# MySQL plugin for connection Java Apps to MySQL
RUN wget --no-check-certificate https://dev.mysql.com/get/Downloads/Connector-J/mysql-connector-j-8.3.0.zip -O mysql_connector.zip
RUN unzip mysql_connector.zip

COPY . .

ARG base=src/main/java/com/cs506/project
ARG test=src/test/java/com/cs506/project
# The following commands may be changed depending on the how
# We decide to build and run the Java Server
# RUN javac -d bin -cp .:mysql_connector ./*.java

# For the integration tests, we will update this later
RUN javac -d bin ${base}/configs/ListenerConfig.java ${base}/configs/ServerConfig.java ${base}/configs/WorkerConfig.java
RUN javac -d bin ${base}/utils/ArgParser.java ${base}/utils/Option.java ${base}/utils/SocketIO.java
RUN javac -cp bin -d bin ${base}/server/ProxyServer.java ${base}/server/ProxyServerListener.java ${base}/server/ProxyServerTask.java ${base}/server/ProxyServerWorker.java
RUN javac -cp bin -d bin ${test}/server/IntegrationTestServer.java
RUN jar -cvfe IntegrationTestServer.jar com.cs506.project.server.IntegrationTestServer -C bin .

CMD ["java", "-jar", "IntegrationTestServer.jar"]
