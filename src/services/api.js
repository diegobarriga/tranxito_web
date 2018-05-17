import axios from 'axios';

const apiPath = 'https://e2e-eld-test.herokuapp.com/api';

// These are most of the API endpoints
// TODO: 1) check if the responses are ok
//        2) handle delete

// Example Usage: import api from '<path_to_file>/api'
// api.people.login(credentials).then(user => this.setState({user}));

export default {
  people: {
    login: credentials =>
      axios.post(`${apiPath}/People/login`, credentials, { headers: { 'Access-Control-Allow-Origin': '*' } }),
    signup: (user, token) =>
      axios.post(`${apiPath}/People?access_token=${token}`, user),
    logout: token =>
      axios.post(`${apiPath}/People/logout?access_token=${token}`),
    getUsers: () =>
      axios.get(`${apiPath}/People`),
    exists: userId =>
      axios.get(`${apiPath}/People/${userId}/exists`),
    getUser: (userId, token) =>
      axios.get(`${apiPath}/People/${userId}?access_token=${token}`),
    updateUser: (userId, token, data) =>
      axios.patch(`${apiPath}/People/${userId}?access_token=${token}`, data),
    setImage: (userId, url) =>
      axios.put(`${apiPath}/People/${userId}/setImage`, { url }),
    deleteUser: (userId, deleteData) =>
      axios.put(`${apiPath}/People/${userId}`, { deleteData }),
    verifyUser: userId =>
      axios.post(`${apiPath}/People/${userId}/verify`),
    confirm: (userId, token) =>
      axios.get(`${apiPath}/People/confirmation`, { userId, token }),
    changePassword: (oldPassword, newPassword) =>
      axios.post(`${apiPath}/People/change-password`, { oldPassword, newPassword }),
    reset: options =>
      axios.post(`${apiPath}/People/reset`, { options }),
    getUserEvents: (userId, token) =>
      axios.get(`${apiPath}/People/${userId}/events?access_token=${token}`),
    createUserEvents: (userId, eventData) =>
      axios.post(`${apiPath}/People/${userId}/events`, { eventData }),
    getUserMotorCarrier: userId =>
      axios.get(`${apiPath}/People/${userId}/motorCarrier`),
  },
  vehicles: {
    getVehicles: () =>
      axios.get(`${apiPath}/Vehicles`),
    getVehicle: (vehicleId, token) =>
      axios.get(`${apiPath}/Vehicles/${vehicleId}?access_token=${token}`),
    deleteVehcle: (vehicleId, token) =>
      axios.delete(`${apiPath}/Vehicles/${vehicleId}?access_token=${token}`),
    updateVehicle: (vehicleId, token, data) =>
      axios.patch(`${apiPath}/Vehicles/${vehicleId}?access_token=${token}`, data),
    setImage: (vehicleId, url) =>
      axios.get(`${apiPath}/Vehicles/${vehicleId}/setImage`, { url }),
    getVehicleMotorCarrier: vehicleId =>
      axios.get(`${apiPath}/Vehicles/${vehicleId}/motorCarrier`),
    exists: vehicleId =>
      axios.get(`${apiPath}/Vehicles/${vehicleId}/exists`),
  },
  motorCarriers: {
    getMotorCarriers: token =>
      axios.get(`${apiPath}/MotorCarriers?access_token=${token}`),
    getMotorCarrier: motorCarrierId =>
      axios.get(`${apiPath}/MotorCarriers/${motorCarrierId}/`),
    createMotorCarrier: (motorCarrier, token) =>
      axios.post(`${apiPath}/MotorCarriers?access_token=${token}`, motorCarrier),
    updateMotorCarrier: motorCarrier =>
      axios.put(`${apiPath}/MotorCarriers/${motorCarrier.id}/`, { motorCarrier }),
    getMotorCarrierPeople: (motorCarrierId, token) =>
      axios.get(`${apiPath}/MotorCarriers/${motorCarrierId}/people?access_token=${token}`),
    getMotorCarrierPerson: (motorCarrierId, userId) =>
      axios.get(`${apiPath}/MotorCarriers/${motorCarrierId}/people/userId/${userId}`),
    createMotorCarrierPeople: (motorCarrierId, token, user) =>
      axios.post(`${apiPath}/MotorCarriers/${motorCarrierId}/people?access_token=${token}`, user),
    countMotorCarrierPeople: motorCarrierId =>
      axios.get(`${apiPath}/MotorCarriers/${motorCarrierId}/people/count`),
    getMotorCarrierVehicles: (motorCarrierId, token) =>
      axios.get(`${apiPath}/MotorCarriers/${motorCarrierId}/vehicles?access_token=${token}`),
    getMotorCarrierVehicle: (motorCarrierId, vehicleId) =>
      axios.get(`${apiPath}/MotorCarriers/${motorCarrierId}/vehicles/${vehicleId}`),
    createMotorCarrierVehicle: (motorCarrierId, token, vehicle) =>
      axios.post(`${apiPath}/MotorCarriers/${motorCarrierId}/vehicles?access_token=${token}`, vehicle),
    countMotorCarrierVehicles: motorCarrierId =>
      axios.get(`${apiPath}/MotorCarriers/${motorCarrierId}/vehicles/count`),
    getMotorCarrierEvents: motorCarrierId =>
      axios.get(`${apiPath}/MotorCarriers/${motorCarrierId}/events`),
    getMotorCarrierEvent: (motorCarrierId, eventId) =>
      axios.get(`${apiPath}/MotorCarriers/${motorCarrierId}/events/${eventId}`),
    countMotorCarrierEvents: motorCarrierId =>
      axios.get(`${apiPath}/MotorCarriers/${motorCarrierId}/events/count`),
    getTrackingsMotorCarrier: motorCarrierId =>
      // axios.get(`${apiPath}/MotorCarriers/${motorCarrierId}/tracking`),
      axios.get(`http://private-5faa9-elde2e.apiary-mock.com/MotorCarriers/${motorCarrierId}/tracking`),

  },
  events: {
    getEvents: () =>
      axios.get(`${apiPath}/Events`),
    getEvent: eventId =>
      axios.get(`${apiPath}/Events/${eventId}`),
    getEventDriver: eventId =>
      axios.get(`${apiPath}/Events/${eventId}/driver`),
    getEventCodriver: eventId =>
      axios.get(`${apiPath}/Events/${eventId}/codriver`),
    getEventVehicle: eventId =>
      axios.get(`${apiPath}/Events/${eventId}/vehicle`),
    getEventMotorCarrier: eventId =>
      axios.get(`${apiPath}/Events/${eventId}/motorCarrier`),
  },
  images: {
    userImageLink: image => `${apiPath}/imageContainers/People/download/${image}`,
    vehicleImageLink: image => `${apiPath}/imageContainers/Vehicles/download/${image}`,
    driverImageUpload: (formData, config, token) =>
      axios.post(`${apiPath}/imageContainers/People/upload?access_token=${token}`, formData, config),
    vehicleImageUpload: (formData, config, token) =>
      axios.post(`${apiPath}/imageContainers/Vehicles/upload?access_token=${token}`, formData, config),
  },
  file: {
    csvFileUpload: (formData, config, token) =>
      axios.post(`${apiPath}/People/upload?access_token=${token}`, formData, config),
  },
};
