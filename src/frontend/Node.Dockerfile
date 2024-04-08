# Start from the stable Node 20.11.1 LTS version
FROM node:20.11.1

# Define communication ports as environment variables to avoid hardcoding them
# in applications
ENV WEBSERVER_HOST=web_server
ENV WEBSERVER_PORT=5000

# The primary directory will be the /src in all apps
RUN mkdir src
WORKDIR /src

# Preserve any files generated within the container
RUN mkdir -p artifacts
VOLUME /src/artifacts
ENV ARTIFACTS_ROOT=/src/artifacts

COPY . .

# Install packages required by the react app
RUN npm install

# These don't really do much, but allow readers to know these ports will be
# exposed
EXPOSE 5000

# Uncomment these when you want to build the project
# RUN npm run build
# ENV NODE_ENV production

# CMD ["npm", "start"]
CMD ["sleep", "infinity"]
