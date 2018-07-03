import api from '../services/api';

export default async function getLastMod(motorCarrierId, token) {
  const lastModResponse = await api.lastMod.getLastMod(motorCarrierId, token);
  const lastMod = lastModResponse.status === 404 ? { people: '', vehicles: '', devices: '' } : lastModResponse.data;
  return lastMod;
};
