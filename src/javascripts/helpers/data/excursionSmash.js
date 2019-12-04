/* eslint-disable max-len */
import excursionsData from './excursionsData';
// import environmentData from '../../helpers/data/environmentData';
import destinationData from './destinationData';
import speciesData from './speciesData';
import environmentData from './environmentData';
import excursionCrewData from './excursionsCrewData';
import logsData from './logsData';
import crewData from './crewData';
import utilities from '../utilities';

const getExcursionsAndDestinations = () => Promise.all([excursionsData.getExcursions(), destinationData.getDestinations(), environmentData.getEnvis(), speciesData.getAllSpecies(), excursionCrewData.getExcursionsCrews(), crewData.getCrew(), logsData.getLogs()]);

const getCompleteExcursions = () => {
  getExcursionsAndDestinations()
    .then((excursionsAndDestinations) => {
      const excursions = excursionsAndDestinations[0];
      const destinations = excursionsAndDestinations[1];
      const environments = excursionsAndDestinations[2];
      const species = excursionsAndDestinations[3];
      const excursionCrew = excursionsAndDestinations[4];
      console.log('excursionCrew', excursionCrew);
      const crew = excursionsAndDestinations[5];
      const logs = excursionsAndDestinations[6];
      const excursionList = [];
      excursions.forEach((excursion) => {
        const theExcursionList = {};
        // console.log('excurssss', theExcursionList);
        const exDest = destinations.find((x) => x.id === excursion.destinationId);
        // console.log(exDest, 'hahahaha');
        theExcursionList.destinationId = exDest.id;
        theExcursionList.destinationName = exDest.name;
        theExcursionList.destinationPort = exDest.port;
        theExcursionList.environmentId = exDest.environmentId;
        theExcursionList.id = excursion.id;
        theExcursionList.excursionDate = excursion.date;
        theExcursionList.excursionName = excursion.name;
        const enviDest = environments.find((x) => x.id === theExcursionList.environmentId);
        theExcursionList.latitude = enviDest.latitude;
        theExcursionList.longitude = enviDest.longitude;
        theExcursionList.pressure = enviDest.pressure;
        theExcursionList.temperature = enviDest.temperature;
        theExcursionList.environmentName = enviDest.name;
        theExcursionList.current = enviDest.current;
        theExcursionList.depth = enviDest.depth;
        // console.log('new idea', enviDest);
        const newSpecies = species.find((x) => x.environmentId === theExcursionList.environmentId);
        // console.log('newSpecies', newSpecies);
        theExcursionList.speciesName = newSpecies.name;
        const crewPerson = excursionCrew.filter((x) => x.excursionId === theExcursionList.id);
        console.log('crewPerson', crewPerson);
        theExcursionList.crew = crewPerson.map((crewRecord) => crew.find((x) => x.id === crewRecord.crewId));
        // theExcursionList.crew = crewPerson;
        // const newCrew = crew.find((x) => x.id === theExcursionList.crewId);
        // theExcursionList.crewName = newCrew.name;
        // theExcursionList.crewPosition = newCrew.position;
        const logsByD = logs.find((x) => x.destinationId === theExcursionList.destinationId);
        theExcursionList.logId = logsByD.id;
        // console.log('logsdest', logsByD);
        const newLog = logs.find((x) => x.id === theExcursionList.logId);
        theExcursionList.logName = newLog.crewName;
        // console.log('logsName', newLog);
        // console.log('exList', excursionList);
        // console.log('please', excursionList);
        excursionList.push(theExcursionList);
      });
      console.log('final', excursionList);
      let domString = '';
      for (let i = 0; i < excursionList.length; i += 1) {
        const excursionsList = excursionList[i];
        domString += `<div class="accordion" id="accordionExample">
        <div class="card">
          <div class="card-header" id="headingOne">
            <h2 class="mb-0">
              <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#${excursionsList.id}" aria-expanded="true" aria-controls="${excursionsList.id}">
                ${excursionsList.destinationName} ${excursionsList.date}
              </button>
            </h2>
          </div>
          <div id="${excursionsList.id}" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
            <div class="card-body">
            <div class="card">
            <div class="card-header">
             Log Number: ${excursionsList.id}
            </div>`;
        console.log('excursinCrew', excursionsList.crew);
        for (let m = 0; m < excursionsList.crew.length; m += 1) {
          const crewMembers = excursionsList.crew[m];
          domString += `
              <h5>${crewMembers.name}</h5>
              `;
        }
        domString += `
            <div class="card-body">
              <h5 class="card-title">Port: ${excursionsList.destinationPort}</h5>
              <p class="card-text">Destination Name: ${excursionsList.destinationName}</p>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">Description: ${excursionsList.description}</li>
                <li class="list-group-item">Current: ${excursionsList.current}</li>
                <li class="list-group-item">longitude: ${excursionsList.longitude}</li>
              </ul>
              <button type="button" id="delete-${excursionsList.id}" class="btn btn-danger delete-log">Delete Excursion</button>
            </div>
          </div>
        </div>
      </div>`;
        utilities.printToDom('excursions', domString);
      }
    });
};

// const getInfo = () => {
//   species.getSpeciesById()
//     .then((speciesArray) => console.error('data', speciesArray));
// };

export default { getCompleteExcursions };
