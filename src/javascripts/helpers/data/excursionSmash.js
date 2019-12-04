/* eslint-disable max-len */
import excursionsData from './excursionsData';
// import environmentData from '../../helpers/data/environmentData';
import destinationData from './destinationData';
import speciesEnvironmentsData from './speciesEnvironmentData';
import excursionsLogsData from './excursionsLogsData';
import environmentData from './environmentData';
import excursionCrewData from './excursionsCrewData';
import logsData from './logsData';
import crewData from './crewData';
import speciesData from './speciesData';
import utilities from '../utilities';

const getExcursionsAndDestinations = () => Promise.all([excursionsData.getExcursions(), destinationData.getDestinations(), environmentData.getEnvis(), speciesEnvironmentsData.getAllSpeciesByEnvironment(), excursionCrewData.getExcursionsCrews(), crewData.getCrew(), logsData.getLogs(), speciesData.getAllSpecies(), excursionsLogsData.getExcursionsLogs()]);

const getCompleteExcursions = () => {
  getExcursionsAndDestinations()
    .then((excursionsAndDestinations) => {
      const excursions = excursionsAndDestinations[0];
      const destinations = excursionsAndDestinations[1];
      const environments = excursionsAndDestinations[2];
      const speciesEnvi = excursionsAndDestinations[3];
      const excursionCrew = excursionsAndDestinations[4];
      const crew = excursionsAndDestinations[5];
      const logs = excursionsAndDestinations[6];
      const species = excursionsAndDestinations[7];
      const excLogs = excursionsAndDestinations[8];
      const excursionList = [];
      excursions.forEach((excursion) => {
        const theExcursionList = {};
        const exDest = destinations.find((de) => de.id === excursion.destinationId);
        theExcursionList.destinationId = exDest.id;
        theExcursionList.destinationName = exDest.name;
        theExcursionList.destinationPort = exDest.port;
        theExcursionList.environmentId = exDest.environmentId;
        theExcursionList.id = excursion.id;
        theExcursionList.excursionDate = excursion.date;
        theExcursionList.excursionName = excursion.name;
        const enviDest = environments.find((en) => en.id === theExcursionList.environmentId);
        theExcursionList.latitude = enviDest.latitude;
        theExcursionList.longitude = enviDest.longitude;
        theExcursionList.pressure = enviDest.pressure;
        theExcursionList.temperature = enviDest.temperature;
        theExcursionList.environmentName = enviDest.name;
        theExcursionList.current = enviDest.current;
        theExcursionList.depth = enviDest.depth;
        const newSpecies = speciesEnvi.filter((x) => x.environmentId === theExcursionList.environmentId);
        theExcursionList.species = newSpecies.map((speciesRecord) => species.find((s) => s.id === speciesRecord.speciesId));
        const crewPerson = excursionCrew.filter((ex) => ex.excursionId === theExcursionList.id);
        theExcursionList.crew = crewPerson.map((crewRecord) => crew.find((cr) => cr.id === crewRecord.crewId));
        const newLogs = excLogs.filter((x) => x.excursionId === theExcursionList.id);
        theExcursionList.logs = newLogs.map((logRecord) => logs.find((x) => x.id === logRecord.logId));
        excursionList.push(theExcursionList);
      });
      let domString = '';
      for (let i = 0; i < excursionList.length; i += 1) {
        const excursionsList = excursionList[i];
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
        domString += `<div class="card-header">
        <h5 class="card-title">Logs</h5>
         </div>`;
        for (let l = 0; l < excursionsList.logs.length; l += 1) {
          const excursionLogs = excursionsList.logs[l];
          domString += `
          <p>Logged By: ${excursionLogs.crewName}</p>
          <p>Log Date: ${excursionLogs.date}</p>
          <p>Log Message: ${excursionLogs.message}</p>
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

export default { getCompleteExcursions };
