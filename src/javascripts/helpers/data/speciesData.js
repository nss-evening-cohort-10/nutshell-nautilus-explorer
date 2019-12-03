import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;


const getAllSpecies = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/species.json`)
    .then((response) => {
      const demSpecies = response.data;
      const species = [];
      Object.keys(demSpecies).forEach((fbId) => {
        demSpecies[fbId].id = fbId;
        species.push(demSpecies[fbId]);
      });
      resolve(species);
    })
    .catch((error) => reject(error));
});

const getSpeciesByEnvironmentId = (environmentId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/species.json?orderBy="environmentId"&equalTo="${environmentId}"`)
    .then((response) => {
      const demSpecies = response.data;
      const species = [];
      Object.keys(demSpecies).forEach((fbId) => {
        demSpecies[fbId].id = fbId;
        species.push(demSpecies[fbId]);
      });
      resolve(species);
    })
    .catch((error) => reject(error));
});

const getSpeciesById = (speciesId) => axios.get(`${baseUrl}/species/${speciesId}.json`);

const deleteSpecies = (speciesId) => axios.delete(`${baseUrl}/species/${speciesId}.json`);

const addNewSpecies = (newSpecies) => axios.post(`${baseUrl}/species.json`, newSpecies);

const updateSpecies = (speciesId, updatedSpecies) => axios.put(`${baseUrl}/species/${speciesId}.json`, updatedSpecies);

export default {
  getSpeciesById,
  getAllSpecies,
  deleteSpecies,
  addNewSpecies,
  updateSpecies,
  getSpeciesByEnvironmentId,
};
