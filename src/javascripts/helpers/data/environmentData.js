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
};
