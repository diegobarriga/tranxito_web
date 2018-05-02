import jsonRequest from './jsonRequest';

export default async function getUserInfoService(token, UserId) {

    return jsonRequest(`/People/${UserId}?access_token=${token}`, 'get');

};
