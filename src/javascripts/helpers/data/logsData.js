import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getLogs = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/logs.json`)
    .then((response) => {
      const demLogs = response.data;
      const logs = [];
      Object.keys(demLogs).forEach((fbId) => {
        demLogs[fbId].id = fbId;
        logs.push(demLogs[fbId]);
      });
      resolve(logs);
    })
    .catch((error) => reject(error));
});

const getLogsByDestinationId = (destinationId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/logs.json?orderBy="destinationId"&equalTo="${destinationId}"`)
    .then((response) => {
      const demLogs = response.data;
      const logs = [];
      Object.keys(demLogs).forEach((fbId) => {
        demLogs[fbId].id = fbId;
        logs.push(demLogs[fbId]);
      });
      resolve(logs);
    })
    .catch((error) => reject(error));
});


export default { getLogs, getLogsByDestinationId };
