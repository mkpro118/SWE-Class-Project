# Start from the stable Python 3.11 version
FROM python:3.11

# Update software
RUN apt-get update && apt-get install --no-install-recommends -y \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

# Define communication ports as environment variables to avoid hardcoding them
# in applications
ENV SERVER_PORT=5000
ENV PROXY_SERVER_PORT=8000

# Environment variables required by Flask
ENV FLASK_APP=app.py

# Allow all hosts for now
ENV FLASK_RUN_HOST=0.0.0.0

# Change this to False for production
ENV FLASK_DEBUG=true

# These don't really do much, but allow readers to know these ports will be
# exposed
EXPOSE 5000
EXPOSE 8000

# The primary directory will be the /src in all apps
RUN mkdir src
WORKDIR /src

# Preserve any files generated within the container
RUN mkdir -p artifacts
VOLUME /src/artifacts
ENV ARTIFACTS_ROOT=/src/artifacts

COPY . .

# Install dependencies for the Web Server
RUN pip install -r requirements.txt

CMD ["flask", "run"]
