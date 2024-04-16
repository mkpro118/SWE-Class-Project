from setuptools import setup, Extension

module = Extension(
    'proxyserver',
    sources=['proxyserver.c']
)

setup(
    name='proxyserver',
    author='Mrigank Kumar',
    description='Provides proxyserver communication functions',
    ext_modules=[module]
)
