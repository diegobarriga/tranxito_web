import jsonRequest from './jsonRequest';

export default {
  async getTrucks(motor_carrier_id) {
    /* Based on wican */
    return jsonRequest(`/vehicles_by_motor_carrier/${motor_carrier_id}`);
  },
  // async getLoggedUser() {
  //   const user = await jsonRequest('/users/current');
  //   return user.id ? user : null;
  // },
};
