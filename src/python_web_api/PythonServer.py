import socket
from random import randint
from time import sleep, perf_counter

config = 'proxy_server', 8000
print('Sleeping for 5s')
for _ in range(5):
    print('.', end='', flush=True)
    sleep(1)
print(flush=True)
try:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.connect(config)
        start_time = perf_counter()

        while perf_counter() - start_time < 30:
            s = f'{randint(0, 10)}-{randint(0, 10)}'
            print(f'Sending: {s}')
            sock.sendall(bytearray(s, 'utf-8'))

            # Don't sleep 0 seconds, it messes with parsing
            t = randint(1, 5)
            print(f'Sleeping: {t:.2f} seconds')

            sleep(t)
except (KeyboardInterrupt, ConnectionResetError):
    pass
finally:
    print("Stopping client!")

