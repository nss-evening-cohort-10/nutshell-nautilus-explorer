import $ from 'jquery';
import excursionSmash from '../../helpers/data/excursionSmash';
import utilities from '../../helpers/utilities';

const excursionCard = () => {
  excursionSmash.getAllExcursions()
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
                      thisLog.date = log.date;
                      thisLog.message = log.message;
                      thisLog.crewName = log.crewName;
                      mission.logs.push(thisLog);
                    });
                  });
                // console.log(mission.id);
                excursionsCrewData.getExcursionsCrewByExcursionId(mission.id)
                  .then((exCrew) => {
                    // console.log(exCrew);
                    mission.crew = [];
                    exCrew.forEach((crew) => {
                      crewData.getCrewById(crew.crewId)
                        .then((datCrew) => {
                          // console.log(datCrew);
                          const thisCrew = {};
                          thisCrew.name = datCrew.name;
                          thisCrew.position = datCrew.position;
                          mission.crew.push(thisCrew);
                        });
                    });
                  });
              });
            console.log('This is the mission: ', mission);
          });
        newExcursions.push(mission);
      });
      resolve(newExcursions);
      // console.log('new excursions', newExcursions);
    })
    .catch((error) => console.error(error));
};

const excursionButton = () => {
  $('body').on('click', '#Excursions-button', excursionCard);
};

export default { excursionButton };
