import jsonRequest from './jsonRequest';

export default async function getUsersService(token, motorCarrierId) {


    // return jsonRequest(`/MotorCarriers/${motorCarrierId}/people/?access_token=${token}`, 'get');
    return [
              {
                "driver_license_number": "ARC4567",
                "id": 0,
                "personId": 0,
                "first_name": "Andrea",
                "last_name": "Roizman",
                "email": "andrea@hola.com",
                "picture": "https://avatars1.githubusercontent.com/u/13739136?s=400&v=4",
                "username": "amroizman"
              },
              {
                "driver_license_number": "FBC4567",
                "id": 1,
                "personId": 1,
                "first_name": "Florencia",
                "last_name": "Barrios",
                "email": "flo@hola.com",
                "picture": "https://avatars2.githubusercontent.com/u/11543803?s=400&v=4",
                "username": "flobarrios"
              },
              {
                "driver_license_number": "PVC4567",
                "id": 2,
                "personId": 2,
                "first_name": "Leopoldo",
                "last_name": "Vargas",
                "email": "polo@hola.com",
                "picture": "https://avatars1.githubusercontent.com/u/11396574?s=400&v=4",
                "username": "lsvargas"
              }
            ]

};
