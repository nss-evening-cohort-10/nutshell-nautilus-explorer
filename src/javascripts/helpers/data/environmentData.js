import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getEnvironments = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/environments.json`)
    .then((response) => {
      const demEnvis = response.data;
      const environments = [];
      Object.keys(demEnvis).forEach((fbId) => {
        demEnvis[fbId].id = fbId;
        environments.push(demEnvis[fbId]);
      });
      resolve(environments);
    })
    .catch((error) => reject(error));
});

export default { getEnvironments };
