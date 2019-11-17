import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;


const getSpecies = (speciesId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/species.json?orderBy="speciesId"&equalTo="${speciesId}"`)
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

export default { getSpecies };
