import excursionsData from '../../helpers/data/excursionsData';
// import environmentData from '../../helpers/data/environmentData';
import destinationData from '../../helpers/data/destinationData';
// import species from '../../helpers/data/speciesData';


// const getCompleteExcursion = () => new Promise((resolve, reject) => {
//   excursionsData.getExcursions()
//     .then((singleExcursion) => destinationData.getDestinationById(singleExcursion.destinationId))
//     .then((destination) => environmentData.getEnvironmentById(destination.environmentId))
//     .then((environment) => species.getSpeciesById(environment.environmentId))
//     .then((excursions) => {
//       const newExcursions = [];
//       excursions.forEach((excursion) => {
//         const mission = { ...excursion };
//         const getSpeciesByEnvironmentId = excursion.find((x) => x.environmentId === mission.environmentId);
//         if (getSpeciesByEnvironmentId) {
//           const envSpecies = excursion.find((x) => x.id === getSpeciesByEnvironmentId.id);
//           mission.date = excursion.date;
//           mission.name = excursion.name;
//           mission.destinationId = excursion.destinationId;
//           mission.destination = excursion.name;
//           mission.temp = excursion.temperature;
//           mission.depth = excursion.depth;
//           mission.current = excursion.current;
//           mission.pressure = excursion.pressure;
//           mission.speciesName = envSpecies.name;
//         } else {
//           mission.envSpecies = {};
//         }
//         newExcursions.push(mission);
//       });
//       resolve(newExcursions);
//       console.error('new excursions', newExcursions);
//     })
//     .catch((error) => reject(error));
// });

const getCompleteExcursion = () => new Promise((resolve, reject) => {
  const newExcursions = [];
  excursionsData.getExcursions()
    .then((excursions) => {
      excursions.forEach((excursion) => {
        const mission = { ...excursion };
        mission.id = excursion.id;
        mission.name = excursion.name;
        mission.destinationId = excursion.destinationId;
        newExcursions.push(mission);
        destinationData.getDestinations((excursions[0].destinationId))
          .then((destinations) => {
            destinations.forEach((destination) => {
              // mission = { ...destination };
              // const getExcursionDest = destinations.find((x) => x.id === excursions.destinationId);
              // console.error('newExcursionDest', getExcursionDest);
              // if (getExcursionDest) {
              mission.destinationName = destination.name;
              mission.environmentId = destination.environmentId;
            });
            newExcursions.push(mission);
          });
      });
      resolve(newExcursions);
      console.error('new excursions', newExcursions);
    })
    .catch((error) => reject(error));
});

// const getInfo = () => {
//   destinationData.getDestinationById()
//     .then((destinations) => {
//       destinations.forEach((destination) => {
//         console.error('data', destination);
//       });
//     });
// };

export default { getCompleteExcursion };
