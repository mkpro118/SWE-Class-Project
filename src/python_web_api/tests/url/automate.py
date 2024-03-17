from dataclasses import dataclass


@dataclass
class Meta:
    filename: str
    classname: str
    url: str


lol = (
    Meta('component', 'Component', 'component'),
    Meta('airplane', 'Airplane', 'airplane'),
    Meta('airplane_to_component', 'AirplaneToComponent', 'airplanecomponent'),
    Meta('facility', 'Facility', 'facility'),
    Meta('customer', 'Customer', 'customer'),
    Meta('supplier', 'Supplier', 'supplier'),
    Meta('supplier_to_facility', 'SupplierToFacility', 'supplierfacility'),
    Meta('manager', 'Manager', 'manager'),
)

for x in lol:
    with open(f'test_{x.filename}.py', 'w') as f:
        f.write(f'''import unittest
import requests
import random
from url_test_utils import Server


class Test{x.classname}(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.server = Server(host='0.0.0.0', port=5000)
        cls.server.start()

        while True:
            with requests.get('http://127.0.0.1:5000/', timeout=5) as resp:
                if resp.ok:
                    break

    @classmethod
    def tearDownClass(cls):
        cls.server.stop()

    def test_{x.url}_get(self):
        with requests.get('http://127.0.0.1:5000/{x.url}') as resp:
            self.assertTrue(resp.ok)
            self.assertEqual(resp.status_code, 200)

            text = resp.text.lower()

            expected_msg = r'success\\s+on\\s+"/{x.url}"\\s+with\\s+method\\s+get'
            self.assertRegex(text, expected_msg)

    def test_{x.url}_get_with_id(self):
        x = random.randint(1, 10000)
        with requests.get(f'http://127.0.0.1:5000/{x.url}/{{x}}') as resp:
            self.assertTrue(resp.ok)
            self.assertEqual(resp.status_code, 200)

            text = resp.text.lower()

            expected_msg = r'success\\s+on\\s+"/{x.url}/[{{]id[}}]"\\s+with\\s+method\\s+get'
            self.assertRegex(text, expected_msg)

            expected_id = f'{x.url}_id\\\\s+=\\\\s+{{x}}'
            self.assertRegex(text, expected_id)

    def test_{x.url}_post(self):
        with requests.post('http://127.0.0.1:5000/{x.url}') as resp:
            self.assertTrue(resp.ok)
            self.assertEqual(resp.status_code, 200)

            text = resp.text.lower()

            expected_msg = r'success\\s+on\\s+"/{x.url}"\\s+with\\s+method\\s+post'
            self.assertRegex(text, expected_msg)

    def test_{x.url}_post_with_id(self):
        x = random.randint(1, 10000)
        with requests.post('http://127.0.0.1:5000/{x.url}/{{x}}') as resp:
            self.assertFalse(resp.ok)
            self.assertEqual(resp.status_code, 404)

    def test_{x.url}_put(self):
        with requests.put('http://127.0.0.1:5000/{x.url}') as resp:
            self.assertTrue(resp.ok)
            self.assertEqual(resp.status_code, 200)

            text = resp.text.lower()

            expected_msg = r'success\\s+on\\s+"/{x.url}"\\s+with\\s+method\\s+[Gg][Ee][Tt]'
            self.assertRegex(text, expected_msg)

    def test_{x.url}_put_with_id(self):
        x = random.randint(1, 10000)
        with requests.put(f'http://127.0.0.1:5000/{x.url}/{{x}}') as resp:
            self.assertTrue(resp.ok)
            self.assertEqual(resp.status_code, 200)

            text = resp.text.lower()

            expected_msg = r'success\\s+on\\s+"/{x.url}/[{{]id[}}]"\\s+with\\s+method\\s+put'
            self.assertRegex(text, expected_msg)

            expected_id = f'{x.url}_id\\\\s+=\\\\s+{{x}}'
            self.assertRegex(text, expected_id)

    def test_{x.url}_delete(self):
        x = random.randint(1, 10000)
        with requests.delete(f'http://127.0.0.1:5000/{x.url}') as resp:
            self.assertFalse(resp.ok)
            self.assertEqual(resp.status_code, 405)

    def test_{x.url}_delete_with_id(self):
        x = random.randint(1, 10000)
        with requests.delete(f'http://127.0.0.1:5000/{x.url}/{{x}}') as resp:
            self.assertTrue(resp.ok)
            self.assertEqual(resp.status_code, 200)

            text = resp.text.lower()

            expected_msg = r'success\\s+on\\s+"/{x.url}/[{{]id[}}]"\\s+with\\s+method\\s+delete'
            self.assertRegex(text, expected_msg)

            expected_id = f'{x.url}_id\\\\s+=\\\\s+{{x}}'
            self.assertRegex(text, expected_id)


if __name__ == '__main__':
    unittest.main()
''')
