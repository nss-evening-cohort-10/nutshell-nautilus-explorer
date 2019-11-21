import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;
// got this from apiKeys and stuck it in axios.get below

const getCrew = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/crew.json`)
    .then((response) => {
      const theCrew = response.data;
      const crew = [];
      Object.keys(theCrew).forEach((fbId) => {
        theCrew[fbId].id = fbId;
        crew.push(theCrew[fbId]);
      });
      resolve(crew); // hard code to only return first machine that comes back
    })
    .catch((error) => reject(error));
});

const getCrewById = (id) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/crew/${id}.json`)
    .then((response) => {
      const crewMember = response.data;
      resolve(crewMember);
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
