# mypy: disable-error-code="attr-defined"

import random
import faker
from typing import Callable, Generator

from models import (
    Airplane,
    AirplaneToComponent,
    Component,
    Customer,
    Facility,
    Manager,
    Supplier,
    SupplierToFacility,
)

data_faker = faker.Faker()


def static_vars(**kwargs) -> Callable[[Callable], Callable]:
    '''Decorator to add static variables to a function.

    This decorator adds static variables to a function. It takes keyword
    arguments where the keys are the variable names and the values are the
    variable values. The variables are added as attributes to the function
    object.
    '''
    def decorator(func: Callable) -> Callable:
        for key, value in kwargs.items():
            setattr(func, key, value)

        return func

    return decorator


@static_vars(ID=1_000_000, faker=faker.Faker())
def airplane(n: int = 1) -> Generator[Airplane, None, None]:
    '''Generate a specified number of airplane records.

    Args:
        n (int): The number of airplane records to generate. Must be a
            positive integer. Defaults to 1.

    Yields:
        Airplane: A generator that yields airplane records.
    '''
    n = max(1, n)
    while n > 0:
        yield Airplane(airplane.ID,
                       airplane.faker.name().split(' ')[0],
                       random.choice(('In-Progress', 'Finished', 'Unstarted')),
                       round(random.random() * 1e7, 2),
                       airplane.faker.date(),
                       airplane.faker.date(),
                       random.randint(int(1e6), int(2e6)),
                       random.randint(100, 400),
                       'Big',
                       random.choice((True, False)))
        airplane.ID += 1
        n -= 1


@static_vars(ID=1_000_000)
def airplane_to_component(n: int = 1) -> Generator[AirplaneToComponent, None, None]:
    '''Generate a specified number of airplane to component records.

    Args:
        n (int): The number of airplane to component records to generate.
        Must be a positive integer. Defaults to 1.

    Yields:
        AirplaneToComponent: A generator that yields airplane to component
        records.
    '''
    n = max(1, n)
    while n > 0:
        yield AirplaneToComponent(airplane_to_component.ID,
                                  random.randint(int(1e6), int(2e6)),
                                  random.randint(int(1e6), int(2e6)),
                                  )
        airplane_to_component.ID += 1
        n -= 1


@static_vars(ID=1_000_000, faker=faker.Faker())
def component(n: int = 1) -> Generator[Component, None, None]:
    '''Generate a specified number of component records.

    Args:
        n (int): The number of component records to generate. Must be a
            positive integer. Defaults to 1.

    Yields:
        Component: A generator that yields component records.
    '''
    n = max(1, n)
    while n > 0:
        yield Component(
            component.ID,
            component.faker.name().split(' ')[0],
            component.faker.sentence(),
            random.choice(('Wings', 'Engines', 'Wheels', 'Gears', 'Flaps')),
            random.randint(int(1e6), int(2e6)),
            round(random.random() * 1e4, 2),
            random.choice(('In-Progress', 'Finished', 'Unstarted'))
        )
        component.ID += 1
        n -= 1


@static_vars(ID=1_000_000, faker=faker.Faker())
def customer(n: int = 1) -> Generator[Customer, None, None]:
    '''Generate a specified number of airplane records.

    Args:
        n (int): The number of airplane records to generate. Must be a
            positive integer. Defaults to 1.

    Yields:
        Customer: A generator that yields airplane records.
    '''
    n = max(1, n)
    while n > 0:
        yield Customer(
            customer.ID,
            customer.faker.name(),
            customer.faker.sentence()
        )
        customer.ID += 1
        n -= 1


@static_vars(ID=1_000_000, faker=faker.Faker())
def facility(n: int = 1) -> Generator[Facility, None, None]:
    '''Generate a specified number of facility records.

    Args:
        n (int): The number of facility records to generate. Must be a
            positive integer. Defaults to 1.

    Yields:
        Facility: A generator that yields facility records.
    '''
    n = max(1, n)
    while n > 0:
        yield Facility(
            facility.ID,
            facility.faker.name(),
            float(random.randint(-90, 90)),
            float(random.randint(-180, 180)),
            facility.faker.sentence(),
            random.randint(0, 100),
            random.randint(0, 100),
            random.randint(0, 100),
            random.randint(0, 100),
            random.randint(0, 100),
            random.randint(int(1e6), int(2e6)),
        )
        facility.ID += 1
        n -= 1


@static_vars(ID=1_000_000, faker=faker.Faker())
def manager(n: int = 1) -> Generator[Manager, None, None]:
    '''Generate a specified number of manager records.

    Args:
        n (int): The number of manager records to generate. Must be a
            positive integer. Defaults to 1.

    Yields:
        Manager: A generator that yields manager records.
    '''
    n = max(1, n)
    while n > 0:
        yield Manager(
            manager.ID,
            manager.faker.name(),
            manager.faker.password(),
            random.choice(('Facility', 'Warehouse', 'Regional')),
            random.randint(1, 3),
            random.randint(int(1e6), int(2e6))
        )
        manager.ID += 1
        n -= 1


@static_vars(ID=1_000_000, faker=faker.Faker())
def supplier(n: int = 1) -> Generator[Supplier, None, None]:
    '''Generate a specified number of supplier records.

    Args:
        n (int): The number of supplier records to generate. Must be a
            positive integer. Defaults to 1.

    Yields:
        Supplier: A generator that yields supplier records.
    '''
    n = max(1, n)
    while n > 0:
        types = random.choices(('Wings', 'Engines', 'Wheels', 'Gears', 'Flaps'),
                               k=random.randint(1, 4))
        yield Supplier(
            supplier.ID,
            supplier.faker.name(),
            supplier.faker.sentence(),
            ','.join(types),
            ','.join([str(random.randint(int(1e6), int(2e6)))
                      for _ in range(random.randint(1, 5))])
        )
        supplier.ID += 1
        n -= 1


@static_vars(ID=1_000_000, faker=faker.Faker())
def supplier_to_facility(n: int = 1) -> Generator[SupplierToFacility, None, None]:
    '''Generate a specified number of supplier records.

    Args:
        n (int): The number of supplier records to generate. Must be a
            positive integer. Defaults to 1.

    Yields:
        Supplier: A generator that yields supplier records.
    '''
    n = max(1, n)
    while n > 0:
        yield SupplierToFacility(
            supplier_to_facility.ID,
            random.randint(int(1e6), int(2e6)),
            random.randint(int(1e6), int(2e6))
        )
        supplier_to_facility.ID += 1
        n -= 1
