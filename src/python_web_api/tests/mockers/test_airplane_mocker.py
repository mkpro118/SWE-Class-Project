import random
import unittest
import types
import models
import mock_data


class TestAirplaneMocker(unittest.TestCase):
    def test_single(self):
        generator = mock_data.airplane(1)

        self.assertIsInstance(generator, types.GeneratorType)

        for count, element in enumerate(generator):
            self.assertIsInstance(element, models.Airplane)
            self.assertLess(count, 1)

    def test_no_params(self):
        generator = mock_data.airplane()

        self.assertIsInstance(generator, types.GeneratorType)

        for count, element in enumerate(generator):
            self.assertIsInstance(element, models.Airplane)
            self.assertLess(count, 1)

    def test_negative_param(self):
        n = random.randint(-1000, -1)
        generator = mock_data.airplane(n)

        self.assertIsInstance(generator, types.GeneratorType)

        for count, element in enumerate(generator):
            self.assertIsInstance(element, models.Airplane)
            self.assertLess(count, 1)

    def test_multiple(self):
        n = random.randint(1, 1000)
        generator = mock_data.airplane(n)

        self.assertIsInstance(generator, types.GeneratorType)

        for count, element in enumerate(generator):
            self.assertIsInstance(element, models.Airplane)
            self.assertLess(count, n)


if __name__ == '__main__':
    unittest.main()
