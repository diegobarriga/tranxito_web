import jsonRequest from './jsonRequest';

export default async function getUserInfoService(token, UserId) {

    return jsonRequest(`/api/People/${UserId}?access_token=${token}`, 'get');

    // return jsonRequest(`/People/${UserId}?access_token=${token}`, 'get');
};
