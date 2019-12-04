import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllSpeciesByEnvironment = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/speciesEnvironments.json`)
    .then((response) => {
      const demSpeciesByEnvironment = response.data;
      const speciesEnvironment = [];
      Object.keys(demSpeciesByEnvironment).forEach((fbId) => {
        demSpeciesByEnvironment[fbId].id = fbId;
        speciesEnvironment.push(demSpeciesByEnvironment[fbId]);
      });
      resolve(speciesEnvironment);
      console.log('lol', speciesEnvironment);
    })
    .catch((error) => reject(error));
});

export default { getAllSpeciesByEnvironment };
