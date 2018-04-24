import jsonRequest from './jsonRequest';

export default {
  async getUsers(motor_carrier_id) {
    /* Based on wican */
    return jsonRequest(`/drivers_by_motor_carrier/${motor_carrier_id}`);
  },
  // async getLoggedUser() {
  //   const user = await jsonRequest('/users/current');
  //   return user.id ? user : null;
  // },
};
