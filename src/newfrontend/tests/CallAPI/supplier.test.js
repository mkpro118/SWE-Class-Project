// tests/urlFetch.test.ts
import axios from "axios";

describe('URL Fetch **Supplier** Tests', () => {
  const BASE_URL = 'http://127.0.0.1:5000';

  test('GET request to /supplier', async () => {
    const response = await axios.get(`${BASE_URL}/supplier`);
    const responseBody = await response.data;
    expect(response.config.method).toBe("get")
    expect(response.status).toBe(200);
    expect(() => JSON.parse(JSON.stringify(responseBody))).not.toThrow();
  });

  test('POST request to /supplier', async () => {
    const response = await axios.post(`${BASE_URL}/supplier`);
    const responseBody = await response.data;
    expect(response.config.method).toBe("post")
    expect(response.status).toBe(200);
    expect(responseBody).toBe('Success on "/supplier" with method POST');
  });

  test('GET request to /supplier/{ID}', async () => {
    const id = Math.floor(Math.random() * (1000 - 1) + 1);
    const response = await axios.get(`${BASE_URL}/supplier/${id}`);
    const responseBody = await response.data;
    expect(response.config.method).toBe("get")
    expect(response.status).toBe(200);
    expect(() => JSON.parse(JSON.stringify(responseBody))).not.toThrow();
  });

  test('DELETE request to /supplier/{ID}', async () => {
    const id = Math.floor(Math.random() * (1000 - 1) + 1);
    const response = await axios.delete(`${BASE_URL}/supplier/${id}`);
    const responseBody = await response.data;
    expect(response.config.method).toBe("delete")
    expect(response.status).toBe(200);
    expect(responseBody).toBe(`Success on "/supplier/{ID}" with method DELETE\nsupplier_id = ${id}`);
  });


  test('PUT error request to /supplier/{ID}', async () => {
    try {
        const id = Math.floor(Math.random() * (1000 - 1) + 1);
        await axios.put(`${BASE_URL}/supplier/${id}`);
    } catch (error) {
      expect(error.config.method).toBe("put")
        expect(error.response.status).toBe(405);
    };
  });

  test('POST error request to /supplier/{ID}', async () => {
    try {
        const id = Math.floor(Math.random() * (1000 - 1) + 1);
        await axios.post(`${BASE_URL}/supplier/${id}`);
    } catch (error) {
      expect(error.config.method).toBe("post")
        expect(error.response.status).toBe(405);
    };
  });

  test('PUT error request to /supplier', async () => {
    try {
        const id = Math.floor(Math.random() * (1000 - 1) + 1);
        await axios.put(`${BASE_URL}/supplier`);
    } catch (error) {
      expect(error.config.method).toBe("put")
        expect(error.response.status).toBe(405);
    };
  });

  test('DELETE error request to /supplier', async () => {
    try {
        const id = Math.floor(Math.random() * (1000 - 1) + 1);
        await axios.delete(`${BASE_URL}/supplier`);
    } catch (error) {
      expect(error.config.method).toBe("delete")
        expect(error.response.status).toBe(405);
    };
  });

});
