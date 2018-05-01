import axios from 'axios';

export default async function jsonRequest(path, method, options = {}) {

  const base_path = 'https://e2e-eld-test.herokuapp.com/api'

  if (method == "get"){
    return axios.get(`${base_path}${path}`)
    .then((response) => {
      return response;
    })
    .catch((err) =>{
      console.log(err);
    })

  //
  //   try {
  //     const response = await axios.get(`${base_path}${path}`);
  //     console.log(response);
  //     return response;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }



}
}
