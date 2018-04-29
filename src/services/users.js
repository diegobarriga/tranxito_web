import jsonRequest from './jsonRequest';

export default {
  async getUsers(token, motorCarrierId) {
    /* Based on wican */
    return jsonRequest(`/MotorCarriers/${motorCarrierId}/people/?access_token=${token}`);
  },
  // async getLoggedUser() {
  //   const user = await jsonRequest('/users/current');
  //   return user.id ? user : null;
  // },
};
