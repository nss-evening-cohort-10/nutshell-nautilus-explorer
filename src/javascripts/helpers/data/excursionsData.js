import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getExcursions = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/excursions.json`)
    .then((response) => {
      const demExcursions = response.data;
      const excursions = [];
      Object.keys(demExcursions).forEach((fbId) => {
        demExcursions[fbId].id = fbId;
        excursions.push(demExcursions[fbId]);
      });
      resolve(excursions);
    })
    .catch((error) => reject(error));
});

const getExcursionsByDestinationId = (destinationId) => axios.get(`${baseUrl}/excursions.json?orderBy="destinationId"&equalTo="${destinationId}"`);

const deleteExcursion = (excursionId) => axios.delete(`${baseUrl}/excursions/${excursionId}.json`);
const addNewExcursion = (newExcursion) => axios.post(`${baseUrl}/excursions.json`, newExcursion);

export default {
  getExcursions,
  deleteExcursion,
  addNewExcursion,
  getExcursionsByDestinationId,
};
