FROM python:3.11

RUN apt-get update && apt-get install --no-install-recommends -y \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

ENV SERVER_PORT=5000
ENV PROXY_SERVER_PORT=8000
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_DEBUG=true

EXPOSE 5000
EXPOSE 8000

RUN mkdir src
WORKDIR /src

COPY . .

RUN pip install -r requirements.txt

# Preserve any files generated within the container
RUN mkdir -p artifacts
VOLUME /src/artifacts
ENV ARTIFACTS_ROOT=/src/artifacts

# CMD ["python3", "server.py"]
