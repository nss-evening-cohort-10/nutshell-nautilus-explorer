import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;


const getCrew = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/crew.json`)
    .then((response) => {
      const theCrew = response.data;
      const crew = [];
      Object.keys(theCrew).forEach((fbId) => {
        theCrew[fbId].id = fbId;
        crew.push(theCrew[fbId]);
      });
      resolve(crew);
    })
    .catch((error) => reject(error));
});

const getCrewById = (crewId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/crew/${crewId}.json`)
    .then((response) => {
      resolve(response.data);
    })
    .catch((error) => reject(error));
});

const addCrew = (newCrew) => axios.post(`${baseUrl}/crew.json`, newCrew);

const deleteCrew = (crewId) => axios.delete(`${baseUrl}/crew/${crewId}.json`);

const updateCrew = (crewId, updatedCrew) => new Promise((resolve, reject) => {
  axios.put(`${baseUrl}/crew/${crewId}.json`, updatedCrew)
    .then(() => {
      resolve();
    })
    .catch((error) => reject(error));
});

export default {
  getCrew,
  getCrewById,
  deleteCrew,
  addCrew,
  updateCrew,
};
