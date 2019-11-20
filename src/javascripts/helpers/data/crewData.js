import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;
// got this from apiKeys and stuck it in axios.get below

const getCrew = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/crew.json`)
    .then((response) => {
      const theCrew = response.data;
      console.log(theCrew);
      const crew = [];
      Object.keys(theCrew).forEach((fbId) => {
        theCrew[fbId].id = fbId;
        crew.push(theCrew[fbId]);
      });
      resolve(crew); // hard code to only return first machine that comes back
    })
    .catch((error) => reject(error));
});


export default { getCrew };
