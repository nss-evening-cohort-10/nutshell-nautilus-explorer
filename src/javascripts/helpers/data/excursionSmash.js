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
      const crew = excursionsAndDestinations[5];
      const logs = excursionsAndDestinations[6];
      const excursionList = [];
      excursions.forEach((excursion) => {
        const theExcursionList = {};
        console.log('excurssss', theExcursionList);
        const exDest = destinations.find((x) => x.id === excursion.destinationId);
        console.log(exDest, 'hahahaha');
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
        console.log('new idea', enviDest);
        const newSpecies = species.find((x) => x.environmentId === theExcursionList.environmentId);
        console.log('newSpecies', newSpecies);
        theExcursionList.speciesName = newSpecies.name;
        const crewPerson = excursionCrew.find((x) => x.excursionId === theExcursionList.id);
        theExcursionList.crewId = crewPerson.crewId;
        const newCrew = crew.find((x) => x.id === theExcursionList.crewId);
        theExcursionList.crewName = newCrew.name;
        theExcursionList.crewPosition = newCrew.position;
        const logsByD = logs.find((x) => x.destinationId === theExcursionList.destinationId);
        theExcursionList.logId = logsByD.id;
        console.log('logsdest', logsByD);
        const newLog = logs.find((x) => x.id === theExcursionList.logId);
        theExcursionList.logName = newLog.crewName;
        console.log('logsName', newLog);
        excursionList.push(theExcursionList);
        console.log('exList', excursionList);
      });
      console.log('please', excursionList);
      excursionList.forEach((finalExcursion) => {
        console.log('final', finalExcursion);
        let domString = '';
        domString += `
          <div class="accordion" id="accordionExample">
            <div class="card">
              <div class="card-header" id="headingOne">
                <h2 class="mb-0">
                  <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#${finalExcursion.id}" aria-expanded="true" aria-controls="${finalExcursion.id}">
                    ${finalExcursion.destinationName} ${finalExcursion.date}
                  </button>
                </h2>
              </div>
              <div id="${finalExcursion.id}" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                <div class="card-body">
                  <h1>Destination: ${finalExcursion.destinationName}</h1>`;
        domString += `<div id="excursionCrew">
                      <h2>Crew Members</h2>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item">
                      <p>${finalExcursion.crewName}</p>
                      <p>${finalExcursion.crewPosition}</p></li>
                  </ul>
                  </div>
                  <div id="excursionEnvironment">
                    <h2>Environment: ${finalExcursion.environmentId}</h2>
                    <p>Latitude: ${finalExcursion.latitude}</p>
                    <p>Longitude: ${finalExcursion.longitude}</p>
                  </div>`;
        utilities.printToDom('excursions', domString);
      });
    });
};

// const getInfo = () => {
//   species.getSpeciesById()
//     .then((speciesArray) => console.error('data', speciesArray));
// };

export default { getCompleteExcursions };
