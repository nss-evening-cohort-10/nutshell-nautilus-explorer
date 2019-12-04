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
      console.log('hiii', destinations);
    })
    .catch((error) => reject(error));
});

// const getDestinationByEnvironment = (environmentId) => new Promise((resolve, reject) => {
//   axios.get(`${baseUrl}/destinations.json?orderBy="environmentId"&equalTo="${environmentId}"`)
//     .then((response) => {
//       const demEnviDestinations = response.data;
//       const destinationsByEnvironment = [];
//       Object.keys(demEnviDestinations).forEach((fbId) => {
//         demEnviDestinations[fbId].id = fbId;
//         destinationsByEnvironment.push(demEnviDestinations[fbId]);
//       });
//       resolve(destinationsByEnvironment);
//       console.log('newest Data', destinationsByEnvironment);
//     })
//     .catch((error) => reject(error));
// });

const getDestinationById = (destinationId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/destinations/${destinationId}.json`)
    .then((response) => {
      resolve(response.data);
    })
    .catch((error) => reject(error));
});

const deleteDestination = (destinationId) => axios.delete(`${baseUrl}/destinations/${destinationId}.json`);
const addNewDestination = (newDestination) => axios.post(`${baseUrl}/destinations.json`, newDestination);
const updateDestination = (destinationId, updatedDestination) => axios.put(`${baseUrl}/destinations/${destinationId}.json`, updatedDestination);

export default {
  getDestinations,
  deleteDestination,
  addNewDestination,
  getDestinationById,
  updateDestination,
  // getDestinationByEnvironment,
};
