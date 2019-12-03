import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getExcursionsCrewByExcursionId = (excursionId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/excursionsCrew.json?orderBy="excursionId"&equalTo="${excursionId}"`)
    .then((response) => {
      const demExcursionsCrews = response.data;
      const excursionCrew = [];
      Object.keys(demExcursionsCrews).forEach((fbId) => {
        demExcursionsCrews[fbId].id = fbId;
        excursionCrew.push(demExcursionsCrews[fbId]);
      });
      resolve(excursionCrew);
    })
    .catch((error) => reject(error));
});

export default { getExcursionsCrewByExcursionId };
