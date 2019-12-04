// // import $ from 'jquery';
// import excursionSmashData from '../../helpers/data/excursionSmash';
// import utilities from '../../helpers/utilities';

// // /* eslint-disable max-len */
// // import excursionsData from '../../helpers/data/excursionsData';
// // // import environmentData from '../../helpers/data/environmentData';
// // import destinationData from '../../helpers/data/destinationData';
// // import environmentData from '../../helpers/data/environmentData';
// // import speciesData from '../../helpers/data/speciesData';
// // import excursionCrewData from '../../helpers/data/excursionsCrewData';
// // import crewData from '../../helpers/data/crewData';
// // import logsData from '../../helpers/data/logsData';
// // import environmentData from '../../helpers/data/environmentData';
// // import excursionsCrewData from '../../helpers/data/excursionsCrewData';
// // import speciesData from '../../helpers/data/speciesData';
// // import environmentData from '../../helpers/data/environmentData';
// // import logData from '../../helpers/data/logsData';
// // import excursionsCrewData from '../../helpers/data/excursionsCrewData';
// // import crewData from '../../helpers/data/crewData';
// // import utilities from '../../helpers/utilities';


// // const getCompleteExcursion = () => new Promise((resolve, reject) => {
// //   excursionsData.getExcursions()
// //     .then((singleExcursion) => destinationData.getDestinations(singleExcursion.destinationId))
// //     .then((destination) => environmentData.getEnvis(destination.environmentId))
// //     .then((environment) => species.getAllSpecies(environment.environmentId))
// //     .then((excursions) => {
// //       const newExcursions = [];
// //       excursions.forEach((excursion) => {
// //         const mission = { ...excursion };
// //         // const getSpeciesByEnvironmentId = excursion.find((x) => x.environmentId === mission.environmentId);
// //         // if (getSpeciesByEnvironmentId) {
// //         // const envSpecies = excursion.find((x) => x.id === getSpeciesByEnvironmentId.id);
// //         mission.date = excursion.date;
// //         mission.name = excursion.name;
// //         mission.destinationId = excursion.destinationId;
// //         mission.destination = excursion.name;
// //         mission.temp = excursion.temperature;
// //         mission.depth = excursion.depth;
// //         mission.current = excursion.current;
// //         mission.pressure = excursion.pressure;
// //         // mission.speciesName = envSpecies.name;
// //         // } else {
// //         //   mission.envSpecies = {};
// //         // }
// //         newExcursions.push(mission);
// //       });
// //       resolve(newExcursions);
// //       console.error('new excursions', newExcursions);
// //     })
// //     .catch((error) => reject(error));
// // });

// // const getCompleteExcursion = () => new Promise((resolve, reject) => {
// //   const newExcursions = [];
// //   excursionsData.getExcursions()
// //     .then((excursions) => {
// //       excursions.forEach((excursion) => {
// //         const mission = { ...excursion };
// //         destinationData.getDestinationById(excursion.destinationId)
// //           .then((destination) => {
// //             mission.destinationName = destination.name;
// //             environmentData.getEnvironmentById(destination.environmentId)
// //               .then((environment) => {
// //                 mission.environmentName = environment.name;
// //                 mission.temperature = environment.temperature;
// //                 mission.latitude = environment.latitude;
// //                 mission.longitude = environment.longitude;
// //                 mission.depth = environment.depth;
// //                 mission.current = environment.current;
// //                 mission.pressure = environment.pressure;
// //                 mission.environmentId = destination.environmentId;
// //                 speciesData.getSpeciesByEnvironmentId(destination.environmentId)
// //                   .then((species) => {
// //                     mission.species = [];
// //                     species.forEach((s) => {
// //                       const speciesName = s.name;
// //                       mission.species.push(speciesName);
// //                     });
// //                   });
// //                 logData.getLogsByDestinationId(excursion.destinationId)
// //                   .then((logs) => {
// //                     mission.logs = [];
// //                     logs.forEach((log) => {
// //                       const thisLog = {};
// //                       thisLog.date = log.date;
// //                       thisLog.message = log.message;
// //                       thisLog.crewName = log.crewName;
// //                       mission.logs.push(thisLog);
// //                     });
// //                   });
// //                 // console.log(mission.id);
// //                 excursionsCrewData.getExcursionsCrewByExcursionId(mission.id)
// //                   .then((exCrew) => {
// //                     // console.log(exCrew);
// //                     mission.crew = [];
// //                     exCrew.forEach((crew) => {
// //                       crewData.getCrewById(crew.crewId)
// //                         .then((datCrew) => {
// //                           // console.log(datCrew);
// //                           const thisCrew = {};
// //                           thisCrew.name = datCrew.name;
// //                           thisCrew.position = datCrew.position;
// //                           mission.crew.push(thisCrew);
// //                         });
// //                     });
// //                   });
// //               });
// //             console.log('This is the mission: ', mission);
// //           });
// //         newExcursions.push(mission);
// //       });
// //       resolve(newExcursions);
// //       // console.log('new excursions', newExcursions);
// //     })
// //     .catch((error) => reject(error));
// // });

// const printNewExcursion = () => {
//   excursionSmashData.getCompleteExcursions()
//     .then((excursionsList) => {
//       const excursions = excursionsList;
//       console.log(excursions);
//       let domString = '';
//       excursions.forEach((excursion) => {
//         domString += `
//         <div class="accordion" id="accordionExample">
//           <div class="card">
//             <div class="card-header" id="headingOne">
//               <h2 class="mb-0">
//                 <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#${excursion.id}" aria-expanded="true" aria-controls="${excursion.id}">
//                   ${excursion.name} ${excursion.date}
//                 </button>
//               </h2>
//             </div>
//             <div id="${excursion.id}" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
//               <div class="card-body">
//                 <h1>Destination: ${excursion.destinationName}</h1>`;
//         domString += `<div id="excursionCrew">
//                     <h2>Crew Members</h2>
//                   <ul class="list-group list-group-flush">
//                     <li class="list-group-item">
//                     <p>${excursion.crewName}</p>
//                     <p>${excursion.crewPosition}</p></li>
//                 </ul>
//                 </div>
//                 <div id="excursionEnvironment">
//                   <h2>Environment: ${excursion.environmentId}</h2>
//                   <p>Latitude: ${excursion.latitude}</p>
//                   <p>Longitude: ${excursion.longitude}</p>
//                 </div>`;
//         utilities.printToDom('excursions', domString);
//       })
//         .catch((error) => console.error(error));
//     });
// };

// export default { printNewExcursion };
