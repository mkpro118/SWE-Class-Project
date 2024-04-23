from typing import Callable, Sequence

import functools
import json

from webserver.internals import models
from webserver.internals import proxyclient
from webserver.internals import proxyrequest
from views.mock import mock_data

jsonify = functools.partial(json.dumps, cls=models.ModelEncoder)
handler = proxyclient.ProxyClient()


def add_encoders(entity_type: type, types: Sequence[str]) -> Callable:
    '''Registers encoders for the given entity and request types

    Args:
        entity_type (type): One of the models.Model subclasses types
        types (Sequence[str]): [description]
    '''
    assert issubclass(entity_type, models.Model), (
        f'{entity_type = } is not the right entity type'
    )

    # Here we store the request encoders
    _map: dict[str, proxyrequest.ProxyRequestEncoder] = {}

    # Validate and convert str values to ProxyRequestType values
    # And add an encoder for that type.
    for type_ in types:
        pr_type = proxyrequest.ProxyRequestType.from_str(type_)
        _map[type_] = proxyrequest.ProxyRequestEncoder(pr_type, entity_type)

    def decorator(func: Callable) -> Callable:
        setattr(func, 'get_encoder', lambda type_: _map[type_])
        return func

    return decorator


def add_decoder(func: Callable) -> Callable:
    '''Registers a decoder for a given view handler'''
    setattr(func, 'decoder', proxyrequest.ProxyRequestDecoder())
    return func


def auto_handle_get(with_id: bool = False) -> Callable:
    '''Add a handler for GET requests, as most views have the same operations.

    Args:
        func (Callable): Intercept and handle GET requests for this view
    '''
    def decorator(func: Callable) -> Callable:
        @functools.wraps(func)
        def inner(request, *args, **kwargs):
            if request.method == 'GET':  # Handles GET requests only
                # Get the function's READ encoder
                encoder = func.get_encoder('READ')

                # If view looks up by id, parse id from params
                if with_id:
                    # views have names like "airplane_with_id",
                    # so remove the "_with_id"
                    kind = func.__name__.replace('_with_id', '')

                    # the params are named "airplane_id"
                    # so the kind from above + "_id" gives the kwargs key
                    ID = kwargs.get(f'{kind}_id', -1)

                    # get one entity, since we are looking up by specific ID
                    req = encoder.encode(limit=1, entities=[ID])
                else:
                    # Get everything
                    req = encoder.encode()

                # Use the function's ProxyClient handler to forward request
                resp = func.handler.get(req)

                # Decode the response using the function's decoder
                decoded = func.decoder.decode(resp)

                if 'error' in decoded:
                    return {'error': 'Failed to retrieve data!'}

                return jsonify(decoded['data'])

            # Non GET requests handled by default implementation
            return func(request, *args, **kwargs)
        return inner

    return decorator


@auto_handle_get()
@handler.register
@add_decoder
@add_encoders(models.Component, types=['READ', 'UPDATE'])
def component(request):
    if request.method == 'GET':
        encoder = airplane.get_encoder('READ')
        req = encoder.encode()
        resp = airplane.handler.get(req)
        decoded = airplane.decoder.decode(resp)

        if 'error' in decoded:
            return {'error': 'Failed to retrieve data!'}

        return jsonify(decoded['data'])
    return f'Success on "/component" with method {request.method}'


@auto_handle_get(with_id=True)
@handler.register
@add_decoder
@add_encoders(models.Component, types=['READ', 'UPDATE', 'DELETE'])
def component_with_id(request, component_id: int):
    if request.method == 'GET':
        data: models.Component = next(mock_data.component())
        data.ID = component_id
        return jsonify(data)
    return (
        f'Success on "/component/{{ID}}" with method {request.method}\n'
        f'{component_id = }'
    )


@auto_handle_get()
@handler.register
@add_decoder
@add_encoders(models.Airplane, types=['READ', 'DELETE'])
def airplane(request):
    if request.method == 'GET':
        return jsonify(list(mock_data.airplane(randint())))
    return f'Success on "/airplane" with method {request.method}'


@auto_handle_get(with_id=True)
@handler.register
@add_decoder
@add_encoders(models.Airplane, types=['READ', 'UPDATE', 'DELETE'])
def airplane_with_id(request, airplane_id: int):
    if request.method == 'GET':
        data: models.Airplane = next(mock_data.airplane())
        data.ID = airplane_id
        return jsonify(data)
    return (
        f'Success on "/airplane/{{ID}}" with method {request.method}\n'
        f'{airplane_id = }'
    )


@auto_handle_get()
@handler.register
@add_decoder
@add_encoders(models.AirplaneToComponent, types=['READ', 'UPDATE'])
def airplanecomponent(request):
    if request.method == 'GET':
        return jsonify(list(mock_data.airplane_to_component(randint())))
    return f'Success on "/airplanecomponent" with method {request.method}'


@auto_handle_get(with_id=True)
@handler.register
@add_decoder
@add_encoders(models.AirplaneToComponent, types=['READ', 'DELETE'])
def airplanecomponent_with_id(request, airplanecomponent_id: int):
    if request.method == 'GET':
        data: models.AirplaneToComponent = next(
            mock_data.airplane_to_component())
        data.ID = airplanecomponent_id
        return jsonify(data)
    return (
        f'Success on "/airplanecomponent/{{ID}}" with method {request.method}\n'
        f'{airplanecomponent_id = }'
    )


@auto_handle_get()
@handler.register
@add_decoder
@add_encoders(models.Facility, types=['READ', 'UPDATE'])
def facility(request):
    if request.method == 'GET':
        return jsonify(list(mock_data.facility(randint())))
    return f'Success on "/facility" with method {request.method}'


@auto_handle_get(with_id=True)
@handler.register
@add_decoder
@add_encoders(models.Facility, types=['READ', 'CREATE', 'DELETE'])
def facility_with_id(request, facility_id: int):
    if request.method == 'GET':
        data: models.Facility = next(mock_data.facility())
        data.ID = facility_id
        return jsonify(data)
    return (
        f'Success on "/facility/{{ID}}" with method {request.method}\n'
        f'{facility_id = }'
    )


@auto_handle_get()
@handler.register
@add_decoder
@add_encoders(models.Customer, types=['READ', 'UPDATE'])
def customer(request):
    if request.method == 'GET':
        return jsonify(list(mock_data.customer(randint())))
    return f'Success on "/customer" with method {request.method}'


@auto_handle_get(with_id=True)
@handler.register
@add_decoder
@add_encoders(models.Customer, types=['READ', 'DELETE'])
def customer_with_id(request, customer_id: int):
    if request.method == 'GET':
        data: models.Customer = next(mock_data.customer())
        data.ID = customer_id
        return jsonify(data)
    return (
        f'Success on "/customer/{{ID}}" with method {request.method}\n'
        f'{customer_id = }'
    )


@auto_handle_get()
@handler.register
@add_decoder
@add_encoders(models.Supplier, types=['READ', 'UPDATE'])
def supplier(request):
    if request.method == 'GET':
        return jsonify(list(mock_data.supplier(randint())))
    return f'Success on "/supplier" with method {request.method}'


@auto_handle_get(with_id=True)
@handler.register
@add_decoder
@add_encoders(models.Supplier, types=['READ', 'DELETE'])
def supplier_with_id(request, supplier_id: int):
    if request.method == 'GET':
        data: models.Supplier = next(mock_data.supplier())
        data.ID = supplier_id
        return jsonify(data)
    return (
        f'Success on "/supplier/{{ID}}" with method {request.method}\n'
        f'{supplier_id = }'
    )


@auto_handle_get()
@handler.register
@add_decoder
@add_encoders(models.SupplierToFacility, types=['READ', 'UPDATE'])
def supplierfacility(request):
    if request.method == 'GET':
        return jsonify(list(mock_data.supplier_to_facility(randint())))
    return f'Success on "/supplierfacility" with method {request.method}'


@auto_handle_get(with_id=True)
@handler.register
@add_decoder
@add_encoders(models.SupplierToFacility, types=['READ', 'DELETE'])
def supplierfacility_with_id(request, supplierfacility_id: int):
    if request.method == 'GET':
        data: models.SupplierToFacility = next(
            mock_data.supplier_to_facility())
        data.ID = supplierfacility_id
        return jsonify(data)
    return (
        f'Success on "/supplierfacility/{{ID}}" with method {request.method}\n'
        f'{supplierfacility_id = }'
    )


@auto_handle_get()
@handler.register
@add_decoder
@add_encoders(models.Manager, types=['READ', 'UPDATE'])
def manager(request):
    if request.method == 'GET':
        return jsonify(list(mock_data.manager(randint())))
    return f'Success on "/manager" with method {request.method}'


@auto_handle_get(with_id=True)
@handler.register
@add_decoder
@add_encoders(models.Manager, types=['READ', 'DELETE'])
def manager_with_id(request, manager_id: int):
    if request.method == 'GET':
        data: models.Manager = next(mock_data.manager())
        data.ID = manager_id
        return jsonify(data)
    return (
        f'Success on "/manager/{{ID}}" with method {request.method}\n'
        f'{manager_id = }'
    )
