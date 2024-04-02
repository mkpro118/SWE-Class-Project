// tests/urlFetch.test.ts
import axios from "axios";

describe('URL Fetch **Component** Tests', () => {
  const BASE_URL = 'http://127.0.0.1:5000';

  test('GET request to /component', async () => {
    const response = await axios.get(`${BASE_URL}/component`);
    const responseBody = await response.data; 
    expect(response.config.method).toBe("get")
    expect(response.status).toBe(200);
    expect(() => JSON.parse(JSON.stringify(responseBody))).not.toThrow();
  });

  test('POST request to /component', async () => {
    const response = await axios.post(`${BASE_URL}/component`);
    const responseBody = await response.data; 
    expect(response.config.method).toBe("post")
    expect(response.status).toBe(200);
    expect(responseBody).toBe('Success on "/component" with method POST');
  });

  test('GET request to /component/{ID}', async () => {
    const id = Math.floor(Math.random() * (1000 - 1) + 1);
    const response = await axios.get(`${BASE_URL}/component/${id}`);
    const responseBody = await response.data; 
    expect(response.config.method).toBe("get")
    expect(response.status).toBe(200);
    expect(() => JSON.parse(JSON.stringify(responseBody))).not.toThrow();
  });

  test('PUT request to /component/{ID}', async () => {
    const id = Math.floor(Math.random() * (1000 - 1) + 1);
    const response = await axios.put(`${BASE_URL}/component/${id}`);
    const responseBody = await response.data; 
    expect(response.config.method).toBe("put")
    expect(response.status).toBe(200);
    expect(responseBody).toBe(`Success on "/component/{ID}" with method PUT\ncomponent_id = ${id}`);
  });

  test('DELETE request to /component/{ID}', async () => {
    const id = Math.floor(Math.random() * (1000 - 1) + 1);
    const response = await axios.delete(`${BASE_URL}/component/${id}`);
    const responseBody = await response.data; 
    expect(response.config.method).toBe("delete")
    expect(response.status).toBe(200);
    expect(responseBody).toBe(`Success on "/component/{ID}" with method DELETE\ncomponent_id = ${id}`);
  });

  test('POST error request to /component/{ID}', async () => {
    try {
        const id = Math.floor(Math.random() * (1000 - 1) + 1);
        await axios.post(`${BASE_URL}/component/${id}`);
    } catch (error) {
        expect(error.config.method).toBe("post")
        expect(error.response.status).toBe(405);
    };
  });

  test('PUT error request to /component', async () => {
    try {
        const id = Math.floor(Math.random() * (1000 - 1) + 1);
        await axios.put(`${BASE_URL}/component`);
    } catch (error) {
        expect(error.config.method).toBe("put")
        expect(error.response.status).toBe(405);
    };
  });

  test('DELETE error request to /component', async () => {
    try {
        const id = Math.floor(Math.random() * (1000 - 1) + 1);
        await axios.delete(`${BASE_URL}/component`);
    } catch (error) {
        expect(error.config.method).toBe("delete")
        expect(error.response.status).toBe(405);
    };
  });

});
