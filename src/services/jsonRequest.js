import axios from 'axios';

export default async function jsonRequest(path, method, options = {}) {
  const basePath = 'https://e2e-eld-test.herokuapp.com/api';

  if (method === 'get') {
    try {
      const response = await axios.get(`${basePath}${path}`);
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
}
