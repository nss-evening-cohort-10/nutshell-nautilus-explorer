import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getExcursionsLogs = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/excursionsLogs.json`)
    .then((response) => {
      const demExcursionsLogs = response.data;
      const excursionsLogs = [];
      Object.keys(demExcursionsLogs).forEach((fbId) => {
        demExcursionsLogs[fbId].id = fbId;
        excursionsLogs.push(demExcursionsLogs[fbId]);
      });
      resolve(excursionsLogs);
      console.error('excursionsLogs', excursionsLogs);
    })
    .catch((error) => reject(error));
});

// const getLogsByExcursions = (excursions) => new Promise((resolve, reject) => {
//   axios.get(`${baseUrl}/excursionLogs.json`)
//     .then((response) => {
//       const demLogs = response.data;
//       const logs = [];
//       const newExcursions = [];
//       Object.keys(demLogs).forEach((fbId) => {
//         demLogs[fbId].id = fbId;
//         logs.push(demLogs[fbId]);
//       });
//       excursions.forEach((excursion) => {
//         const newE = { ...excursion };
//         const excursionLog = logs.find((x) => x.excursionId === excursion.id);
//         newE.excursionLog = excursionLog;
//         newExcursions.push(newE);
//       });
//       resolve(newExcursions);
//       console.error('excursionsLogs', newExcursions);
//     })
//     .catch((error) => reject(error));
// });

export default { getExcursionsLogs };
