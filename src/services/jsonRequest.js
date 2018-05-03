import axios from 'axios';
import * as path from '../store/actions/basepath';

export default async function jsonRequest(_path, method, options = {}) {

  if (method === 'get') {
    try {
      console.log(`${path.BASE_PATH}${_path}`);
      const response = await axios.get(`${path.BASE_PATH}${_path}`);
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
}
