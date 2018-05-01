import jsonRequest from './jsonRequest';

export default async function getUsersService(token, motorCarrierId) {
  return jsonRequest(`/MotorCarriers/${motorCarrierId}/people?access_token=${token}`, 'get');
};
