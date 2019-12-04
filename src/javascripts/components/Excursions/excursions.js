// import excursionsData from '../../helpers/data/excursionsData';
// import environmentData from '../../helpers/data/environmentData';
// import destinationData from '../../helpers/data/destinationData';
// import speciesData from '../../helpers/data/speciesData';
// import environmentData from '../../helpers/data/environmentData';
// import logData from '../../helpers/data/logsData';
// import excursionsCrewData from '../../helpers/data/excursionsCrewData';
// import crewData from '../../helpers/data/crewData';
import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import excursionSmash from '../../helpers/data/excursionSmash';
import utilities from '../../helpers/utilities';


// const getCompleteExcursion = () => new Promise((resolve, reject) => {
//   excursionsData.getExcursions()
//     .then((singleExcursion) => destinationData.getDestinations(singleExcursion.destinationId))
//     .then((destination) => environmentData.getEnvis(destination.environmentId))
//     .then((environment) => species.getAllSpecies(environment.environmentId))
//     .then((excursions) => {
//       const newExcursions = [];
//       excursions.forEach((excursion) => {
//         const mission = { ...excursion };
//         // const getSpeciesByEnvironmentId = excursion.find((x) => x.environmentId === mission.environmentId);
//         // if (getSpeciesByEnvironmentId) {
//         // const envSpecies = excursion.find((x) => x.id === getSpeciesByEnvironmentId.id);
//         mission.date = excursion.date;
//         mission.name = excursion.name;
//         mission.destinationId = excursion.destinationId;
//         mission.destination = excursion.name;
//         mission.temp = excursion.temperature;
//         mission.depth = excursion.depth;
//         mission.current = excursion.current;
//         mission.pressure = excursion.pressure;
//         // mission.speciesName = envSpecies.name;
//         // } else {
//         //   mission.envSpecies = {};
//         // }
//         newExcursions.push(mission);
//       });
//       resolve(newExcursions);
//       console.error('new excursions', newExcursions);
//     })
//     .catch((error) => reject(error));
// });

// const getCompleteExcursion = () => new Promise((resolve, reject) => {
//   const newExcursions = [];
//   excursionsData.getExcursions()
//     .then((excursions) => {
//       excursions.forEach((excursion) => {
//         const mission = { ...excursion };
//         destinationData.getDestinationById(excursion.destinationId)
//           .then((destination) => {
//             mission.destinationName = destination.name;
//             environmentData.getEnvironmentById(destination.environmentId)
//               .then((environment) => {
//                 mission.environmentName = environment.name;
//                 mission.temperature = environment.temperature;
//                 mission.latitude = environment.latitude;
//                 mission.longitude = environment.longitude;
//                 mission.depth = environment.depth;
//                 mission.current = environment.current;
//                 mission.pressure = environment.pressure;
//                 mission.environmentId = destination.environmentId;
//                 speciesData.getSpeciesByEnvironmentId(destination.environmentId)
//                   .then((species) => {
//                     mission.species = [];
//                     species.forEach((s) => {
//                       const speciesName = s.name;
//                       mission.species.push(speciesName);
//                     });
//                   });
//                 logData.getLogsByDestinationId(excursion.destinationId)
//                   .then((logs) => {
//                     mission.logs = [];
//                     logs.forEach((log) => {
//                       const thisLog = {};
//                       thisLog.date = log.date;
//                       thisLog.message = log.message;
//                       thisLog.crewName = log.crewName;
//                       mission.logs.push(thisLog);
//                     });
//                   });
//                 // console.log(mission.id);
//                 excursionsCrewData.getExcursionsCrewByExcursionId(mission.id)
//                   .then((exCrew) => {
//                     // console.log(exCrew);
//                     mission.crew = [];
//                     exCrew.forEach((crew) => {
//                       crewData.getCrewById(crew.crewId)
//                         .then((datCrew) => {
//                           // console.log(datCrew);
//                           const thisCrew = {};
//                           thisCrew.name = datCrew.name;
//                           thisCrew.position = datCrew.position;
//                           mission.crew.push(thisCrew);
//                         });
//                     });
//                   });
//               });
//             console.log('This is the mission: ', mission);
//           });
//         newExcursions.push(mission);
//       });
//       resolve(newExcursions);
//       // console.log('new excursions', newExcursions);
//     })
//     .catch((error) => reject(error));
// });

// const getInfo = () => {
//   species.getSpeciesById()
//     .then((speciesArray) => console.error('data', speciesArray));
// };

const excursionCard = (excursions) => {
  const userSignedIn = firebase.auth().currentUser;
  let domString = '';
  if (userSignedIn) {
    domString += `<div class="accordion" id="accordionExample">
        <div class="card">
          <div class="card-header" id="headingOne">
            <h2 class="mb-0">
              <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#${excursions.id}" aria-expanded="true" aria-controls="${excursions.id}">
                ${excursions.name} ${excursions.date}
              </button>
            </h2>
          </div>
          <div id="${excursions.id}" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
            <div class="card-body">
            <div class="card">
            <div class="card-header">
             Log Number: ${excursions.id}
            </div>
            <div class="card-body">
              <h5 class="card-title">Port: ${excursions.destination.port}</h5>
              <p class="card-text">Destination Name: ${excursions.destination.name}</p>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">Description: ${excursions.destination.description}</li>
                <li class="list-group-item">Current: ${excursions.destination.environment.current}</li>
                <li class="list-group-item">longitude: ${excursions.destination.environment.longitude}</li>
              </ul>
              <button type="button" id="delete-${excursions.id}" class="btn btn-danger delete-log">Delete Excursion</button>
            </div>
          </div>
        </div>
      </div>`;
  } else {
    domString += `<div class="accordion" id="accordionExample">
    <div class="card">
    <div class="card-header" id="headingOne">
    <h2 class="mb-0">
      <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#${excursions.id}" aria-expanded="true" aria-controls="${excursions.id}">
        ${excursions.destName} ${excursions.date}
      </button>
    </h2>
  </div>
  <div id="${excursions.id}" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
    <div class="card-body">
    <div class="card">
    <div class="card-header">
     Log Number: ${excursions.id}
    </div>
    <div class="card-body">
      <h5 class="card-title">Crew Member: ${excursions.description}</h5>
      <p class="card-text">Message: ${excursions.longitude}</p>
    </div>
  </div>
</div>
</div>`;
  }
  return domString;
};

const printExcursionCards = () => {
  let domString = '';
  excursionSmash.getAllExcursions()
    .then((excursions) => {
      excursions.forEach((excursion) => {
        domString += excursionCard(excursion);
      });
      utilities.printToDom('excursions', domString);
    })
    .catch((error) => console.error(error));
};

const showExcursions = () => {
  $('body').on('click', '#Excursions-button', printExcursionCards);
};


export default { showExcursions };
