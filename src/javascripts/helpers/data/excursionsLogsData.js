import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getExcursionsLogs = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/excursionsLogs.json`)
    .then((response) => {
      const demExcursionsLogs = response.data;
      const excursionsLogs = [];
      Object.keys(demExcursionsLogs).forEach((fbId) => {
        demExcursionsLogs[fbId].id = fbId;
        excursionsLogs.push(demExcursionsLogs[fbId]);
      });
      resolve(excursionsLogs);
    })
    .catch((error) => reject(error));
});

export default { getExcursionsLogs };
