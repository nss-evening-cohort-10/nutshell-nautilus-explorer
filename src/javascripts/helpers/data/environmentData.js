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

const deleteEnvis = (id) => axios.delete(`${baseUrl}/environments/${id}.json`);

const addEnvi = (newEnvironment) => axios.post(`${baseUrl}/environments.json`, newEnvironment);

const updateEnvi = (enviId, updatedEnvironment) => axios.put(`${baseUrl}/environments/${enviId}.json`, updatedEnvironment);

const editEnvi = (enviId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/environments/${enviId}.json`)
    .then((result) => {
      const environment = result.data;
      resolve(environment);
    })
    .catch((error) => reject(error));
});

export default {
  getEnvis,
  deleteEnvis,
  addEnvi,
  editEnvi,
  updateEnvi,
};
