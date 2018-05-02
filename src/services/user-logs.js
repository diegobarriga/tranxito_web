import jsonRequest from './jsonRequest';

export default async function getUserLogsService(token, UserId) {

    return jsonRequest(`/People/${UserId}/Events?access_token=${token}`, 'get');

};
