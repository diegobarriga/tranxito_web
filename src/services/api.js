import axios from 'axios';

var apiPath = 'https://e2e-eld-test.herokuapp.com/api';

// These are most of the API endpoints
// TODO: 1) check if the responses are ok
//        2) handle delete

// Example Usage: import api from '<path_to_file>/api'
// api.people.login(credentials).then(user => this.setState({user}));

export default {
  people: {
    login: credentials =>
      axios.post(apiPath+'/People/login', { credentials }).then(res => res.data.user),
    signup: user =>
      axios.post(apiPath+'/People', { user }).then(res => res.data.user),
    logout: () =>
      axios.post(apiPath+'/People/logout').then(res => res.data),
    get_users: () =>
      axios.get(apiPath+'/People').then(res => res.data.users),
    exists: userId =>
      axios.get(apiPath+`/People/${userId}/exists`).then(res => res.data),
    get_user: userId =>
      axios.get(apiPath+`/People/${userId}`).then(res => res.data.user),
    update_user: user =>
      axios.put(apiPath+`/People/${user.id}`, { user })
      .then(res => res.data.user),
    set_image: (userId, url) =>
      axios.put(apiPath+`/People/${userId}/setImage`, { url })
      .then(res => res.data),
    delete_user: (userId, delete_data) =>
      axios.put(apiPath+`/People/${userId}`, { delete_data })
      .then(res => res.data),
    verify_user: userId =>
      axios.post(apiPath+`/People/${userId}/verify`)
      .then(res => res.data),
    confirm: (userId, token) =>
      axios.get(apiPath+'/People/confirmation', { userId, token, redirect })
      .then(res => res.data.user),
    change_password: (old_password, new_password) =>
      axios.post(apiPath+'/People/change-password'), {old_password, new_password})
      .then(res => res.data),
    reset: options =>
      axios.post(apiPath+'/People/reset'), {options})
      .then(res => res.data),
    get_user_events: userId =>
      axios.get(apiPath+`/People/${userId}/events`)
      .then(res => res.data.events),
    create_user_events: (userId, event_data) =>
      axios.post(apiPath+`/People/${userId}/events`, {event_data})
      .then(res => res.data.event),
    get_user_motorCarrier: userId =>
      axios.get(apiPath+`/People/${userId}/motorCarrier`)
      .then(res => res.data.motorCarrier),
  },
  vehicles: {
    get_vehicles: () =>
      axios.get(apiPath+'/Vehicles').then(res => res.data.vehicles),
    get_vehicle: vehicleId =>
      axios.get(apiPath+`/Vehicles/${vehicleId}`)
      .then(res => res.data.vehicle),
    update_vehicle: vehicle =>
      axios.put(apiPath+`/Vehicles/${vehicle.id}`, {vehicle})
      .then(res => res.data.vehicle),
    set_image: (vehicleId, url) =>
      axios.get(apiPath+`/Vehicles/${vehicleId}/setImage`, {url})
      .then(res => res.data),
    get_vehicle_motorCarrier: vehicleId =>
      axios.get(apiPath+`/Vehicles/${vehicleId}/motorCarrier`)
      .then(res => res.data.motorCarrier),
    exists: vehicleId =>
      axios.get(apiPath+`/Vehicles/${vehicleId}/exists`)
      .then(res => res.data),
  },
  motorCarriers: {
    get_motorCarriers: () =>
      axios.get(apiPath+'/MotorCarriers')
      .then(res => res.data.motorCarriers),
    get_motorCarrier: motorCarrierId =>
      axios.get(apiPath+`/MotorCarriers/${motorCarrierId}/`)
      .then(res => res.data.motorCarrier),
    create_motorCarrier: motorCarrier =>
      axios.post(apiPath+'/MotorCarriers/', { motorCarrier })
      .then(res => res.data.motorCarrier),
    update_motorCarrier: motorCarrier =>
      axios.put(apiPath+`/MotorCarriers/${motorCarrier.id}/`, { motorCarrier })
      .then(res => res.data.motorCarrier),
    get_motorCarrier_people: motorCarrierId =>
      axios.get(apiPath+`/MotorCarriers/${motorCarrierId}/people`)
      .then(res => res.data.users),
    get_motorCarrier_person: (motorCarrierId, userId) =>
      axios.get(apiPath+`/MotorCarriers/${motorCarrierId}/people/userId/${userId}`)
      .then(res => res.data.user),
    create_motorCarrier_people: (motorCarrierId, user) =>
      axios.post(apiPath+`/MotorCarriers/${motorCarrierId}/people`, { user })
      .then(res => res.data.user),
    count_motorCarrier_people: (motorCarrierId) =>
      axios.get(apiPath+`/MotorCarriers/${motorCarrierId}/people/count`)
      .then(res => res.data),
    get_motorCarrier_vehicles: motorCarrierId =>
      axios.get(apiPath+`/MotorCarriers/${motorCarrierId}/vehicles`)
      .then(res => res.data.vehicles),
    get_motorCarrier_vehicle: (motorCarrierId, vehicleId) =>
      axios.get(apiPath+`/MotorCarriers/${motorCarrierId}/vehicles/${vehicleId}`)
      .then(res => res.data.vehicle),
    create_motorCarrier_vehicle: (motorCarrierId, vehicle) =>
      axios.post(apiPath+`/MotorCarriers/${motorCarrierId}/people`, { vehicle })
      .then(res => res.data.vehicle),
    count_motorCarrier_vehicles: (motorCarrierId) =>
      axios.get(apiPath+`/MotorCarriers/${motorCarrierId}/vehicles/count`)
      .then(res => res.data),
    get_motorCarrier_events: motorCarrierId =>
      axios.get(apiPath+`/MotorCarriers/${motorCarrierId}/events`)
      .then(res => res.data.events),
    get_motorCarrier_event: (motorCarrierId, eventId) =>
      axios.get(apiPath+`/MotorCarriers/${motorCarrierId}/events/${eventId}`)
      .then(res => res.data.event),
    count_motorCarrier_events: (motorCarrierId) =>
      axios.get(apiPath+`/MotorCarriers/${motorCarrierId}/events/count`)
      .then(res => res.data),

  },
  events: {
    get_events: () =>
      axios.get(apiPath+'/Events')
      .then(res => res.data.events),
    get_event: eventId =>
      axios.get(apiPath+`/Events/${eventId}`)
      .then(res => res.data.event),
    get_event_driver: eventId =>
      axios.get(apiPath+`/Events/${eventId}/driver`)
      .then(res => res.data.user),
    get_event_codriver: eventId =>
      axios.get(apiPath+`/Events/${eventId}/codriver`)
      .then(res => res.data.user),
    get_event_vehicle: eventId =>
      axios.get(apiPath+`/Events/${eventId}/vehicle`)
      .then(res => res.data.vehicle),
    get_event_motorCarrier: eventId =>
      axios.get(apiPath+`/Events/${eventId}/motorCarrier`)
      .then(res => res.data.motorCarrier),
  }

};
