// tests/urlFetch.test.ts
import axios from "axios";

describe('URL Fetch **Facility** Tests', () => {
  const BASE_URL = 'http://127.0.0.1:5000';

  test('GET request to /facility', async () => {
    const response = await axios.get(`${BASE_URL}/facility`);
    const responseBody = await response.data; 
    expect(response.config.method).toBe("get")
    expect(response.status).toBe(200);
    expect(() => JSON.parse(JSON.stringify(responseBody))).not.toThrow();
  });

  test('POST request to /facility', async () => {
    const response = await axios.post(`${BASE_URL}/facility`);
    const responseBody = await response.data; 
    expect(response.config.method).toBe("post")
    expect(response.status).toBe(200);
    expect(responseBody).toBe('Success on "/facility" with method POST');
  });

  test('GET request to /facility/{ID}', async () => {
    const id = Math.floor(Math.random() * (1000 - 1) + 1);
    const response = await axios.get(`${BASE_URL}/facility/${id}`);
    const responseBody = await response.data; 
    expect(response.config.method).toBe("get")
    expect(response.status).toBe(200);
    expect(() => JSON.parse(JSON.stringify(responseBody))).not.toThrow();
  });

  test('PUT request to /facility/{ID}', async () => {
    const id = Math.floor(Math.random() * (1000 - 1) + 1);
    const response = await axios.put(`${BASE_URL}/facility/${id}`);
    const responseBody = await response.data; 
    expect(response.config.method).toBe("put")
    expect(response.status).toBe(200);
    expect(responseBody).toBe(`Success on "/facility/{ID}" with method PUT\nfacility_id = ${id}`);
  });

  test('DELETE request to /facility/{ID}', async () => {
    const id = Math.floor(Math.random() * (1000 - 1) + 1);
    const response = await axios.delete(`${BASE_URL}/facility/${id}`);
    const responseBody = await response.data; 
    expect(response.config.method).toBe("delete")
    expect(response.status).toBe(200);
    expect(responseBody).toBe(`Success on "/facility/{ID}" with method DELETE\nfacility_id = ${id}`);
  });

  test('POST error request to /facility/{ID}', async () => {
    try {
        const id = Math.floor(Math.random() * (1000 - 1) + 1);
        await axios.post(`${BASE_URL}/facility/${id}`);
    } catch (error) {
      expect(error.config.method).toBe("post")
        expect(error.response.status).toBe(405);
    };
  });

  test('PUT error request to /facility', async () => {
    try {
        const id = Math.floor(Math.random() * (1000 - 1) + 1);
        await axios.put(`${BASE_URL}/facility`);
    } catch (error) {
      expect(error.config.method).toBe("put")
        expect(error.response.status).toBe(405);
    };
  });

  test('DELETE error request to /facility', async () => {
    try {
        const id = Math.floor(Math.random() * (1000 - 1) + 1);
        await axios.delete(`${BASE_URL}/facility`);
    } catch (error) {
      expect(error.config.method).toBe("delete")
        expect(error.response.status).toBe(405);
    };
  });

});

