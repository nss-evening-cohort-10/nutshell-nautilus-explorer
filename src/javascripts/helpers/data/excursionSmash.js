/* eslint-disable max-len */
import excursionsData from './excursionsData';
// import environmentData from '../../helpers/data/environmentData';
import destinationData from './destinationData';
import speciesEnvironmentsData from './speciesEnvironmentData';
import environmentData from './environmentData';
import excursionCrewData from './excursionsCrewData';
import logsData from './logsData';
import crewData from './crewData';
import speciesData from './speciesData';
import utilities from '../utilities';

const getExcursionsAndDestinations = () => Promise.all([excursionsData.getExcursions(), destinationData.getDestinations(), environmentData.getEnvis(), speciesEnvironmentsData.getAllSpeciesByEnvironment(), excursionCrewData.getExcursionsCrews(), crewData.getCrew(), logsData.getLogs(), speciesData.getAllSpecies()]);

const getCompleteExcursions = () => {
  getExcursionsAndDestinations()
    .then((excursionsAndDestinations) => {
      const excursions = excursionsAndDestinations[0];
      const destinations = excursionsAndDestinations[1];
      const environments = excursionsAndDestinations[2];
      const speciesEnvi = excursionsAndDestinations[3];
      const excursionCrew = excursionsAndDestinations[4];
      console.log('excursionCrew', excursionCrew);
      const crew = excursionsAndDestinations[5];
      const logs = excursionsAndDestinations[6];
      const species = excursionsAndDestinations[7];
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
        const newSpecies = speciesEnvi.filter((x) => x.environmentId === theExcursionList.environmentId);
        console.log('new', newSpecies);
        theExcursionList.species = newSpecies.map((speciesRecord) => species.find((s) => s.id === speciesRecord.speciesId));
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
        console.log('eList', excursionsList);
        domString += `<div class="accordion" id="accordionExample">
        <div class="card">
          <div class="card-header" id="headingOne">
            <h2 class="mb-0">
              <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#${excursionsList.id}" aria-expanded="true" aria-controls="${excursionsList.id}">
                ${excursionsList.excursionName} ${excursionsList.excursionDate}
              </button>
            </h2>
          </div>
          <div id="${excursionsList.id}" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
            <div class="card-body">
            <div class="card">
            <div class="card-header">
            <h5 class="card-title">Crew Members</h5>
             </div>`;
        console.log('excursinCrew', excursionsList.crew);
        for (let m = 0; m < excursionsList.crew.length; m += 1) {
          const crewMembers = excursionsList.crew[m];
          domString += `
              <p>${crewMembers.name}, ${crewMembers.position}</p>
              `;
        }
        domString += `
              <div class="card-header">
              <h5>Destination: ${excursionsList.destinationName}</h5>
              </div>
              <p class="card-text">Destination Port: ${excursionsList.destinationPort}</p>
              <div class="card-header">
              <h5>Environments Encountered:</h5>
              </div>
              <p class="card-text">Name of Environment: ${excursionsList.environmentName}</p>
              <p class="card-text">Latitude: ${excursionsList.latitude}, Longitude: ${excursionsList.longitude}</p>
              <p class="card-text">Pressure: ${excursionsList.pressure}</p>
              <p class="card-text">Temperature: ${excursionsList.temperature}</p>
              <p class="card-text">Current: ${excursionsList.current}</p>
              <p class="card-text">Depth: ${excursionsList.depth}</p>
              <div class="card-header">
            <h5 class="card-title">Species Encountered:</h5>
             </div>`;
        for (let s = 0; s < excursionsList.species.length; s += 1) {
          const specieMembers = excursionsList.species[s];
          domString += `
                    <p>${specieMembers.name}</p>
                    `;
        }
        domString += `</div>
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
