import jsonRequest from './jsonRequest';

export default async function getUserLogsService(token, UserId) {

    // return jsonRequest(`/People/${UserId}/Events`, 'get');
    return jsonRequest(`/api/People/${UserId}/events?access_token=${token}`, 'get');

};
