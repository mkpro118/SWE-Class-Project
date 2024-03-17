from flask import Flask, request
import os

app = Flask(__name__)


@app.route('/')
def home():
    return 'Success!'


@app.route('/component', methods=['GET', 'POST'])
def component():
    return f'Success on "/component" with method {request.method}'


@app.route('/component/<int:component_id>', methods=['GET', 'PUT', 'DELETE'])
def component_with_id(component_id: int):
    return (
        f'Success on "/component/{{ID}}" with method {request.method}\n'
        f'{component_id = }'
    )


@app.route('/airplane', methods=['GET', 'POST'])
def airplane():
    return f'Success on "/airplane" with method {request.method}'


@app.route('/airplane/<int:airplane_id>', methods=['GET', 'PUT', 'DELETE'])
def airplane_with_id(airplane_id: int):
    return (
        f'Success on "/airplane/{{ID}}" with method {request.method}\n'
        f'{airplane_id = }'
    )


@app.route('/airplanecomponent', methods=['GET', 'POST'])
def airplanecomponent():
    return f'Success on "/airplanecomponent" with method {request.method}'


@app.route('/airplanecomponent/<int:airplanecomponent_id>', methods=['GET', 'DELETE'])
def airplanecomponent_with_id(airplanecomponent_id: int):
    return (
        f'Success on "/airplanecomponent/{{ID}}" with method {request.method}\n'
        f'{airplanecomponent_id = }'
    )


@app.route('/facility', methods=['GET', 'POST'])
def facility():
    return f'Success on "/facility" with method {request.method}'


@app.route('/facility/<int:facility_id>', methods=['GET', 'PUT', 'DELETE'])
def facility_with_id(facility_id: int):
    return (
        f'Success on "/facility/{{ID}}" with method {request.method}\n'
        f'{facility_id = }'
    )


@app.route('/customer', methods=['GET', 'POST'])
def customer():
    return f'Success on "/customer" with method {request.method}'


@app.route('/customer/<int:customer_id>', methods=['GET', 'DELETE'])
def customer_with_id(customer_id: int):
    return (
        f'Success on "/customer/{{ID}}" with method {request.method}\n'
        f'{customer_id = }'
    )


@app.route('/supplier', methods=['GET', 'POST'])
def supplier():
    return f'Success on "/supplier" with method {request.method}'


@app.route('/supplier/<int:supplier_id>', methods=['GET', 'DELETE'])
def supplier_with_id(supplier_id: int):
    return (
        f'Success on "/supplier/{{ID}}" with method {request.method}\n'
        f'{supplier_id = }'
    )


@app.route('/supplierfacility', methods=['GET', 'POST'])
def supplierfacility():
    return f'Success on "/supplierfacility" with method {request.method}'


@app.route('/supplierfacility/<int:supplierfacility_id>', methods=['GET', 'DELETE'])
def supplierfacility_with_id(supplierfacility_id: int):
    return (
        f'Success on "/supplierfacility/{{ID}}" with method {request.method}\n'
        f'{supplierfacility_id = }'
    )


@app.route('/manager', methods=['GET', 'POST'])
def manager():
    return f'Success on "/manager" with method {request.method}'


@app.route('/manager/<int:manager_id>', methods=['GET', 'DELETE'])
def manager_with_id(manager_id: int):
    return (
        f'Success on "/manager/{{ID}}" with method {request.method}\n'
        f'{manager_id = }'
    )


if __name__ == '__main__':
    app.run(host=os.environ.get('FLASK_RUN_HOST', '0.0.0.0'),
            port=os.environ.get('SERVER_PORT', 5000),
            debug=os.environ.get('FLASK_DEBUG', True))
