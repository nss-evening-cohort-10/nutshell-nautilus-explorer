// import axios from 'axios';
// import apiKeys from '../apiKeys.json';

// const baseUrl = apiKeys.firebaseKeys.databaseURL;

// const getAllSpeciesEnvironments = () => new Promise((resolve, reject) => {
//   axios.get(`${baseUrl}/speciesEnvironment.json`)
//     .then((response) => {
//       const demSpeciesEnv = response.data;
//       console.error('demSpeciesEnv', demSpeciesEnv);
//       const speciesEnv = [];
//       Object.keys(demSpeciesEnv).forEach((fbId) => {
//         demSpeciesEnv[fbId].id = fbId;
//         speciesEnv.push(demSpeciesEnv[fbId]);
//       });
//       resolve(speciesEnv);
//     })
//     .catch((error) => reject(error));
// });

// export default { getAllSpeciesEnvironments };
