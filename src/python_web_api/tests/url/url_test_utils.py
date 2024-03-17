import os
import sys
import threading
from werkzeug.serving import make_server
import logging
import flask

sys.path.append(os.path.join('..', '..'))

from app import app

log = logging.getLogger('werkzeug')


class ServerThread(threading.Thread):
    def __init__(self, app: flask.Flask, *args, **kwargs):
        super().__init__()

        host = kwargs.get('host', '0.0.0.0')
        port = kwargs.get('port', 5000)
        self.server = make_server(host, port, app)
        self.ctx = app.app_context()
        self.ctx.push()

    def run(self):
        logging.info('Starting server')
        self.server.serve_forever()

    def shutdown(self):
        logging.info('Stopping server')
        self.server.shutdown()


class Server:
    def __init__(self, *args, **kwargs):
        self.server = None
        self.args = args
        self.kwargs = kwargs

        logLevel = kwargs.get('logLevel', logging.ERROR)
        log.setLevel(logLevel)

    def start(self):
        self.server = ServerThread(app, self.args, self.kwargs)
        self.server.start()
        logging.info('Server up!')

    def stop(self):
        self.server.shutdown()
        logging.info('Server dowwn!')
