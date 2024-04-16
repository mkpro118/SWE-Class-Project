from flask import Flask, request
import os
import random
import functools
import json
import models
import mock_data
from flask_cors import CORS, cross_origin

app = Flask(__name__)
jsonify = functools.partial(json.dumps, cls=models.ModelEncoder)
randint = functools.partial(random.randint, 3, 10)
CORS(app, support_credentials=True)

mock_data.deterministic()


def try_deterministic(func):
    '''Makes Mock Data deterministic'''

    lookup = 'id' in func.__name__

    kind = func.__name__.replace('_with_id', '')
    assert kind in mock_data.deterministic._static_vars, (
        f'Decorator is not applicable for {func}')

    @functools.wraps(func)
    def inner(*args, **kwargs):
        # Only patch get requests
        if request.method.upper() != 'GET':
            return func(*args, **kwargs)

        # Get deterministic data
        data = mock_data.deterministic(kind=kind)

        # If this was an ID function, lookup that ID
        if lookup:
            ID = kwargs.get(func.__name__, -1)
            resp = list(filter(lambda x: x.ID == ID, data))

            if resp:  # If ID was found, return that record
                return jsonify(resp)
            else:  # Else return random record
                return func(*args, **kwargs)

        # If this was not an ID function, but still marked deterministic,
        # return deterministic list of records
        return jsonify(data)

    return inner


@app.route('/')
def home():
    return 'Success!'


@app.route('/component', methods=['GET', 'POST'])
@try_deterministic
def component():
    if request.method == 'GET':
        return jsonify(list(mock_data.component(randint())))
    return f'Success on "/component" with method {request.method}'


@app.route('/component/<int:component_id>', methods=['GET', 'PUT', 'DELETE'])
@try_deterministic
def component_with_id(component_id: int):
    if request.method == 'GET':
        data: models.Component = next(mock_data.component())
        data.ID = component_id
        return jsonify(data)
    return (
        f'Success on "/component/{{ID}}" with method {request.method}\n'
        f'{component_id = }'
    )


@app.route('/airplane', methods=['GET', 'POST'])
@try_deterministic
def airplane():
    if request.method == 'GET':
        return jsonify(list(mock_data.airplane(randint())))
    return f'Success on "/airplane" with method {request.method}'


@app.route('/airplane/<int:airplane_id>', methods=['GET', 'PUT', 'DELETE'])
@try_deterministic
def airplane_with_id(airplane_id: int):
    if request.method == 'GET':
        data: models.Airplane = next(mock_data.airplane())
        data.ID = airplane_id
        return jsonify(data)
    return (
        f'Success on "/airplane/{{ID}}" with method {request.method}\n'
        f'{airplane_id = }'
    )


@app.route('/airplanecomponent', methods=['GET', 'POST'])
@try_deterministic
def airplanecomponent():
    if request.method == 'GET':
        return jsonify(list(mock_data.airplane_to_component(randint())))
    return f'Success on "/airplanecomponent" with method {request.method}'


@app.route('/airplanecomponent/<int:airplanecomponent_id>', methods=['GET', 'DELETE'])
@try_deterministic
def airplanecomponent_with_id(airplanecomponent_id: int):
    if request.method == 'GET':
        data: models.AirplaneToComponent = next(
            mock_data.airplane_to_component())
        data.ID = airplanecomponent_id
        return jsonify(data)
    return (
        f'Success on "/airplanecomponent/{{ID}}" with method {request.method}\n'
        f'{airplanecomponent_id = }'
    )


@app.route('/facility', methods=['GET', 'POST'])
@try_deterministic
def facility():
    if request.method == 'GET':
        return jsonify(list(mock_data.facility(randint())))
    return f'Success on "/facility" with method {request.method}'


@app.route('/facility/<int:facility_id>', methods=['GET', 'PUT', 'DELETE'])
@try_deterministic
def facility_with_id(facility_id: int):
    if request.method == 'GET':
        data: models.Facility = next(mock_data.facility())
        data.ID = facility_id
        return jsonify(data)
    return (
        f'Success on "/facility/{{ID}}" with method {request.method}\n'
        f'{facility_id = }'
    )


@app.route('/customer', methods=['GET', 'POST'])
def customer():
    if request.method == 'GET':
        return jsonify(list(mock_data.customer(randint())))
    return f'Success on "/customer" with method {request.method}'


@app.route('/customer/<int:customer_id>', methods=['GET', 'DELETE'])
def customer_with_id(customer_id: int):
    if request.method == 'GET':
        data: models.Customer = next(mock_data.customer())
        data.ID = customer_id
        return jsonify(data)
    return (
        f'Success on "/customer/{{ID}}" with method {request.method}\n'
        f'{customer_id = }'
    )


@app.route('/supplier', methods=['GET', 'POST'])
def supplier():
    if request.method == 'GET':
        return jsonify(list(mock_data.supplier(randint())))
    return f'Success on "/supplier" with method {request.method}'


@app.route('/supplier/<int:supplier_id>', methods=['GET', 'DELETE'])
def supplier_with_id(supplier_id: int):
    if request.method == 'GET':
        data: models.Supplier = next(mock_data.supplier())
        data.ID = supplier_id
        return jsonify(data)
    return (
        f'Success on "/supplier/{{ID}}" with method {request.method}\n'
        f'{supplier_id = }'
    )


@app.route('/supplierfacility', methods=['GET', 'POST'])
def supplierfacility():
    if request.method == 'GET':
        return jsonify(list(mock_data.supplier_to_facility(randint())))
    return f'Success on "/supplierfacility" with method {request.method}'


@app.route('/supplierfacility/<int:supplierfacility_id>', methods=['GET', 'DELETE'])
def supplierfacility_with_id(supplierfacility_id: int):
    if request.method == 'GET':
        data: models.SupplierToFacility = next(
            mock_data.supplier_to_facility())
        data.ID = supplierfacility_id
        return jsonify(data)
    return (
        f'Success on "/supplierfacility/{{ID}}" with method {request.method}\n'
        f'{supplierfacility_id = }'
    )


@app.route('/manager', methods=['GET', 'POST'])
def manager():
    if request.method == 'GET':
        return jsonify(list(mock_data.manager(randint())))
    return f'Success on "/manager" with method {request.method}'


@app.route('/manager/<int:manager_id>', methods=['GET', 'DELETE'])
def manager_with_id(manager_id: int):
    if request.method == 'GET':
        data: models.Manager = next(mock_data.manager())
        data.ID = manager_id
        return jsonify(data)
    return (
        f'Success on "/manager/{{ID}}" with method {request.method}\n'
        f'{manager_id = }'
    )


if __name__ == '__main__':
    host = os.environ.get('FLASK_RUN_HOST', '0.0.0.0')
    port = int(os.environ.get('SERVER_PORT', 5000))
    debug = bool(os.environ.get('FLASK_DEBUG', True))
    app.run(host=host, port=port, debug=debug)
