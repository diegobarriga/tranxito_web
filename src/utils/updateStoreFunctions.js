import api from '../services/api';

export default async function getLastMod(token) {
  const lastModResponse = await api.lastMod.getLastMod(token);
  const lastMod = lastModResponse.status === 404 ? { people: '', vehicles: '', devices: '' } : lastModResponse.data[0];
  return lastMod;
};
