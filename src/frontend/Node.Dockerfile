# Start from the stable Node 20.11.1 LTS version
FROM node:20.11.1

# Define communication ports as environment variables to avoid hardcoding them
# in applications
ENV BACKEND_SERVER_PORT=5000

# The primary directory will be the /src in all apps
RUN mkdir src
WORKDIR /src

COPY . .

# Install packages required by the react app
RUN npm install

# These don't really do much, but allow readers to know these ports will be
# exposed
EXPOSE 3000
EXPOSE 5000

# Preserve any files generated within the container
RUN mkdir -p artifacts
VOLUME /src/artifacts
ENV ARTIFACTS_ROOT=/src/artifacts

# Uncomment these when you want to build the project
# RUN npm run build
# ENV NODE_ENV production

# CMD ["npm", "start"]
