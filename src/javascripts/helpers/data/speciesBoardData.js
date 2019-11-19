import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseurl = apiKeys.firebaseKeys.databaseURL;


const getSpeciesBoards = (speciesEnvironmentId) => new Promise((resolve, reject) => {
  axios.get(`${baseurl}/speciesEnvironment.json?orderBy="speciesEnvironmentId"&equalTo="${speciesEnvironmentId}"`)
    .then((response) => {
      const demSpeciesBoard = response.data;
      const speciesBoard = [];
      Object.keys(demSpeciesBoard).forEach((fbId) => {
        demSpeciesBoard[fbId].id = fbId;
        speciesBoard.push(demSpeciesBoard[fbId]);
      });
      resolve(speciesBoard);
    })
    .catch((error) => reject(error));
});

export default { getSpeciesBoards };
