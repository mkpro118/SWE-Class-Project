// tests/urlFetch.test.ts
import axios from "axios";

describe('URL Fetch **Manager** Tests', () => {
  const BASE_URL = 'http://127.0.0.1:5000';

  test('GET request to /manager', async () => {
    const response = await axios.get(`${BASE_URL}/manager`);
    const responseBody = await response.data;
    expect(response.config.method).toBe("get")
    expect(response.status).toBe(200);
    expect(() => JSON.parse(JSON.stringify(responseBody))).not.toThrow();
  });

  test('POST request to /manager', async () => {
    const response = await axios.post(`${BASE_URL}/manager`);
    const responseBody = await response.data;
    expect(response.config.method).toBe("post")
    expect(response.status).toBe(200);
    expect(responseBody).toBe('Success on "/manager" with method POST');
  });

  test('GET request to /manager/{ID}', async () => {
    const id = Math.floor(Math.random() * (1000 - 1) + 1);
    const response = await axios.get(`${BASE_URL}/manager/${id}`);
    const responseBody = await response.data;
    expect(response.config.method).toBe("get")
    expect(response.status).toBe(200);
    expect(() => JSON.parse(JSON.stringify(responseBody))).not.toThrow();
  });

  test('DELETE request to /manager/{ID}', async () => {
    const id = Math.floor(Math.random() * (1000 - 1) + 1);
    const response = await axios.delete(`${BASE_URL}/manager/${id}`);
    const responseBody = await response.data;
    expect(response.config.method).toBe("delete")
    expect(response.status).toBe(200);
    expect(responseBody).toBe(`Success on "/manager/{ID}" with method DELETE\nmanager_id = ${id}`);
  });


  test('PUT error request to /manager/{ID}', async () => {
    try {
        const id = Math.floor(Math.random() * (1000 - 1) + 1);
        await axios.put(`${BASE_URL}/manager/${id}`);
    } catch (error) {
      expect(error.config.method).toBe("put")
        expect(error.response.status).toBe(405);
    };
  });

  test('POST error request to /manager/{ID}', async () => {
    try {
        const id = Math.floor(Math.random() * (1000 - 1) + 1);
        await axios.post(`${BASE_URL}/manager/${id}`);
    } catch (error) {
      expect(error.config.method).toBe("post")
        expect(error.response.status).toBe(405);
    };
  });

  test('PUT error request to /manager', async () => {
    try {
        const id = Math.floor(Math.random() * (1000 - 1) + 1);
        await axios.put(`${BASE_URL}/manager`);
    } catch (error) {
      expect(error.config.method).toBe("put")
        expect(error.response.status).toBe(405);
    };
  });

  test('DELETE error request to /manager', async () => {
    try {
        const id = Math.floor(Math.random() * (1000 - 1) + 1);
        await axios.delete(`${BASE_URL}/manager`);
    } catch (error) {
      expect(error.config.method).toBe("delete")
        expect(error.response.status).toBe(405);
    };
  });

});
