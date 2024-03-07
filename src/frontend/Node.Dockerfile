FROM node:20.11.1

ENV BACKEND_SERVER_PORT=5000

RUN mkdir src
WORKDIR /src

COPY . .

RUN npm install

EXPOSE 3000
EXPOSE 5000

# Preserve any files generated within the container
RUN mkdir -p artifacts
VOLUME /src/artifacts
ENV ARTIFACTS_ROOT=/src/artifacts

# Frontend should change this depending on how they want to run their app
# CMD ["npm", "start"]
