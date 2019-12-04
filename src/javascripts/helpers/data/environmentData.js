import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getEnvis = () => new Promise((resolve, reject) => {
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

const getEnvironmentsByDestinations = (excursions) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/environments.json`)
    .then((response) => {
      const demEnvironments = response.data;
      const environments = [];
      const newExcursions = [];
      Object.keys(demEnvironments).forEach((fbId) => {
        demEnvironments[fbId].id = fbId;
        environments.push(demEnvironments[fbId]);
      });
      excursions.forEach((excursion) => {
        const newE = { ...excursion };
        const env = environments.find((x) => x.id === excursion.destination.environmentId);
        newE.destination.environment = env;
        newExcursions.push(newE);
      });
      resolve(newExcursions);
    })
    .catch((error) => reject(error));
});

// const getSpeciesByEnvironments = (environments) => new Promise((resolve, reject) => {
//   axios.get(`${baseUrl}/species.json`)
//     .then((response) => {
//       console.error('response', response);
//       const demSpecies = response.data;
//       console.error('demSpecies', demSpecies);
//       const species = [];
//       const newExcursions = [];
//       Object.keys(demSpecies).forEach((fbId) => {
//         demSpecies[fbId].id = fbId;
//         species.push(demSpecies[fbId]);
//       });
//       environments.forEach((environment) => {
//         const newE = { ...environment };
//         const env = species.find((x) => x.environmentId === environment.id);
//         console.error('excursion', environment);
//         newE.environment.species = env;
//         newExcursions.push(newE);
//       });
//       console.error('species newExcursions', newExcursions);
//       resolve(newExcursions);
//     })
//     .catch((error) => reject(error));
// });


const getEnvironmentById = (environmentId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/environments/${environmentId}.json`)
    .then((response) => {
      resolve(response.data);
    })
    .catch((error) => reject(error));
});

const deleteEnvis = (id) => axios.delete(`${baseUrl}/environments/${id}.json`);

const addEnvi = (newEnvironment) => axios.post(`${baseUrl}/environments.json`, newEnvironment);

const updateEnvironment = (environmentId, updatedEnvironment) => axios.put(`${baseUrl}/environments/${environmentId}.json`, updatedEnvironment);

export default {
  getEnvis,
  deleteEnvis,
  addEnvi,
  updateEnvironment,
  getEnvironmentById,
  getEnvironmentsByDestinations,
  // getSpeciesByEnvironments,
};
