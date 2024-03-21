import unittest
import requests
import random
from tests.urls.url_test_utils import Server


class TestFacility(unittest.TestCase):
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

    def test_facility_get(self):
        with requests.get('http://127.0.0.1:5000/facility') as resp:
            self.assertTrue(resp.ok)
            self.assertEqual(resp.status_code, 200)

            text = resp.text.lower()

            expected_msg = r'success\s+on\s+"/facility"\s+with\s+method\s+get'
            self.assertRegex(text, expected_msg)

    def test_facility_get_with_id(self):
        x = random.randint(1, 10000)
        with requests.get(f'http://127.0.0.1:5000/facility/{x}') as resp:
            self.assertTrue(resp.ok)
            self.assertEqual(resp.status_code, 200)

            text = resp.text.lower()

            expected_msg = r'success\s+on\s+"/facility/[{]id[}]"\s+with\s+method\s+get'
            self.assertRegex(text, expected_msg)

            expected_id = f'facility_id\\s+=\\s+{x}'
            self.assertRegex(text, expected_id)

    def test_facility_post(self):
        with requests.post('http://127.0.0.1:5000/facility') as resp:
            self.assertTrue(resp.ok)
            self.assertEqual(resp.status_code, 200)

            text = resp.text.lower()

            expected_msg = r'success\s+on\s+"/facility"\s+with\s+method\s+post'
            self.assertRegex(text, expected_msg)

    def test_facility_post_with_id(self):
        x = random.randint(1, 10000)
        with requests.post(f'http://127.0.0.1:5000/facility/{x}') as resp:
            self.assertFalse(resp.ok)
            self.assertEqual(resp.status_code, 405)

    def test_facility_put(self):
        with requests.put('http://127.0.0.1:5000/facility') as resp:
            self.assertFalse(resp.ok)
            self.assertEqual(resp.status_code, 405)

    def test_facility_put_with_id(self):
        x = random.randint(1, 10000)
        with requests.put(f'http://127.0.0.1:5000/facility/{x}') as resp:
            self.assertTrue(resp.ok)
            self.assertEqual(resp.status_code, 200)

            text = resp.text.lower()

            expected_msg = r'success\s+on\s+"/facility/[{]id[}]"\s+with\s+method\s+put'
            self.assertRegex(text, expected_msg)

            expected_id = f'facility_id\\s+=\\s+{x}'
            self.assertRegex(text, expected_id)

    def test_facility_delete(self):
        with requests.delete(f'http://127.0.0.1:5000/facility') as resp:
            self.assertFalse(resp.ok)
            self.assertEqual(resp.status_code, 405)

    def test_facility_delete_with_id(self):
        x = random.randint(1, 10000)
        with requests.delete(f'http://127.0.0.1:5000/facility/{x}') as resp:
            self.assertTrue(resp.ok)
            self.assertEqual(resp.status_code, 200)

            text = resp.text.lower()

            expected_msg = r'success\s+on\s+"/facility/[{]id[}]"\s+with\s+method\s+delete'
            self.assertRegex(text, expected_msg)

            expected_id = f'facility_id\\s+=\\s+{x}'
            self.assertRegex(text, expected_id)


if __name__ == '__main__':
    unittest.main()