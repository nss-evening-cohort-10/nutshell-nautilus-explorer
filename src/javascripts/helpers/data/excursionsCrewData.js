import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllExcursionsCrew = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/excursionsCrew.json`)
    .then((response) => {
      const demExcursionsCrews = response.data;
      console.log('response', demExcursionsCrews);
      const excursionCrew = [];
      Object.keys(demExcursionsCrews).forEach((fbId) => {
        demExcursionsCrews[fbId].id = fbId;
        excursionCrew.push(demExcursionsCrews[fbId]);
      });
      resolve(excursionCrew);
      console.log('excursionCrew', excursionCrew);
    })
    .catch((error) => reject(error));
});

export default { getAllExcursionsCrew };
