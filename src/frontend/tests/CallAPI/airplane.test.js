// tests/urlFetch.test.ts
import axios from "axios";

describe('URL Fetch **Airplane** Tests', () => {
  const BASE_URL = 'http://web_server:5000';

  test('GET request to /airplane', async () => {
    const response = await axios.get(`${BASE_URL}/airplane`);
    const responseBody = await response.data; 
    expect(response.config.method).toBe("get")
    expect(response.status).toBe(200);
    expect(() => JSON.parse(JSON.stringify(responseBody))).not.toThrow();
  });

  test('POST request to /airplane', async () => {
    const response = await axios.post(`${BASE_URL}/airplane`);
    const responseBody = await response.data; 
    expect(response.config.method).toBe("post")
    expect(response.status).toBe(200);
    expect(responseBody).toBe('Success on "/airplane" with method POST');
  });

  test('GET request to /airplane/{ID}', async () => {
    const id = Math.floor(Math.random() * (1000 - 1) + 1);
    const response = await axios.get(`${BASE_URL}/airplane/${id}`);
    const responseBody = await response.data; 
    expect(response.config.method).toBe("get")
    expect(response.status).toBe(200);
    expect(() => JSON.parse(JSON.stringify(responseBody))).not.toThrow();
  });

  test('PUT request to /airplane/{ID}', async () => {
    const id = Math.floor(Math.random() * (1000 - 1) + 1);
    const response = await axios.put(`${BASE_URL}/airplane/${id}`);
    const responseBody = await response.data; 
    expect(response.config.method).toBe("put")
    expect(response.status).toBe(200);
    expect(responseBody).toBe(`Success on "/airplane/{ID}" with method PUT\nairplane_id = ${id}`);
  });

  test('DELETE request to /airplane/{ID}', async () => {
    const id = Math.floor(Math.random() * (1000 - 1) + 1);
    const response = await axios.delete(`${BASE_URL}/airplane/${id}`);
    const responseBody = await response.data; 
    expect(response.config.method).toBe("delete")
    expect(response.status).toBe(200);
    expect(responseBody).toBe(`Success on "/airplane/{ID}" with method DELETE\nairplane_id = ${id}`);
  });

  test('POST error request to /airplane/{ID}', async () => {
    try {
        const id = Math.floor(Math.random() * (1000 - 1) + 1);
        await axios.post(`${BASE_URL}/airplane/${id}`);
    } catch (error) {
      expect(error.config.method).toBe("post")
        expect(error.response.status).toBe(405);
    };
  });

  test('PUT error request to /airplane', async () => {
    try {
        const id = Math.floor(Math.random() * (1000 - 1) + 1);
        await axios.put(`${BASE_URL}/airplane`);
    } catch (error) {
      expect(error.config.method).toBe("put")
        expect(error.response.status).toBe(405);
    };
  });

  test('DELETE error request to /airplane', async () => {
    try {
        const id = Math.floor(Math.random() * (1000 - 1) + 1);
        await axios.delete(`${BASE_URL}/airplane`);
    } catch (error) {
      expect(error.config.method).toBe("delete")
        expect(error.response.status).toBe(405);
    };
  });

});

