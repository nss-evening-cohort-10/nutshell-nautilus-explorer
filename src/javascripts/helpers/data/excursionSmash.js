import excursionsData from './excursionsData';
// import environmentData from '../../helpers/data/environmentData';
import destinationData from './destinationData';
import speciesData from './speciesData';
import environmentData from './environmentData';
import logData from './logsData';
import excursionsCrewData from './excursionsCrewData';
import crewData from './crewData';

const getAllExcursions = () => new Promise((resolve, reject) => {
  const newExcursions = [];
  excursionsData.getExcursions()
    .then((excursions) => {
      excursions.forEach((excursion) => {
        const mission = { ...excursion };
        destinationData.getDestinationById(excursion.destinationId)
          .then((destination) => {
            mission.destinationName = destination.name;
            environmentData.getEnvironmentById(destination.environmentId)
              .then((environment) => {
                mission.environmentName = environment.name;
                mission.temperature = environment.temperature;
                mission.latitude = environment.latitude;
                mission.longitude = environment.longitude;
                mission.depth = environment.depth;
                mission.current = environment.current;
                mission.pressure = environment.pressure;
                mission.environmentId = destination.environmentId;
                speciesData.getSpeciesByEnvironmentId(destination.environmentId)
                  .then((species) => {
                    mission.species = [];
                    species.forEach((s) => {
                      const speciesName = s.name;
                      mission.species.push(speciesName);
                    });
                  });
                logData.getLogsByDestinationId(excursion.destinationId)
                  .then((logs) => {
                    mission.logs = [];
                    logs.forEach((log) => {
                      const thisLog = {};
                      thisLog.data = log.date;
                      thisLog.message = log.message;
                      thisLog.crewName = log.crewName;
                      mission.logs.push(thisLog);
                    });
                  });
                excursionsCrewData.getExcursionsCrewByExcursionId(mission.id)
                  .then((exCrew) => {
                    mission.crew = [];
                    exCrew.forEach((crew) => {
                      crewData.getCrewById(crew.crewId)
                        .then((datCrew) => {
                          const thisCrew = {};
                          thisCrew.name = datCrew.name;
                          thisCrew.position = datCrew.position;
                          mission.crew.push(thisCrew);
                        });
                    });
                  });
              });
          });
        newExcursions.push(mission);
      });
      resolve(newExcursions);
      console.log(newExcursions);
    })
    .catch((error) => reject(error));
});

export default { getAllExcursions };
