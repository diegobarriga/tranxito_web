import jsonRequest from './jsonRequest';

export default async function getVehiclesService(token, motorCarrierId) {
  // return jsonRequest(`/MotorCarriers/${motorCarrierId}/vehicles/?access_token=${token}`, 'get');

  return [
    {
      vin: '1N6BA07G09N387008',
      CMV_power_unit_number: '1FUJGHDV0CLBP8832',
      model: 'Corsa',
      car_maker: 'Opel',
      plaque: 'GDVS81',
      state: 'RM',
      IMEI_ELD: 0,
      id: 0,
    },
    {
      vin: '2G1WL52M1V9253669',
      CMV_power_unit_number: '1FUJGHDV0CLBP8833',
      model: 'Corola',
      car_maker: 'Toyota',
      plaque: 'FFGT65',
      state: 'RM',
      IMEI_ELD: 0,
      id: 1,
    },
    {
      vin: '4B3AU52NXYE002576',
      CMV_power_unit_number: '1FUJGHDV0CLBP8834',
      model: 'Yaris',
      car_maker: 'Toyota',
      plaque: 'DVRW12',
      state: 'RM',
      IMEI_ELD: 0,
      id: 2,
    },
  ];
}
