import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getDestinations = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/destinations.json`)
    .then((response) => {
      const demDestinations = response.data;
      const destinations = [];
      Object.keys(demDestinations).forEach((fbId) => {
        demDestinations[fbId].id = fbId;
        destinations.push(demDestinations[fbId]);
      });
      resolve(destinations);
    })
    .catch((error) => reject(error));
});

const deleteDestination = (destinationId) => axios.delete(`${baseUrl}/destinations/${destinationId}.json`);

const updateDestination = (destinationId, updatedDestination) => axios.put(`${baseUrl}/destinations/${destinationId}.json`, updatedDestination);


export default { getDestinations, deleteDestination, updateDestination };
