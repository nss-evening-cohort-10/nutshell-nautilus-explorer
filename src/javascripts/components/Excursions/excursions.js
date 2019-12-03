import $ from 'jquery';
import excursionSmash from '../../helpers/data/excursionSmash';
import utilities from '../../helpers/utilities';

const excursionCard = () => {
  excursionSmash.getAllExcursions()
    .then((excursions) => {
      let domString = '';
      excursions.forEach((excursion) => {
        domString += `
      <div class="accordion" id="accordionExample">
        <div class="card">
          <div class="card-header" id="headingOne">
            <h2 class="mb-0">
              <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#${excursion.id}" aria-expanded="true" aria-controls="${excursion.id}">
                ${excursion.name}
              </button>
            </h2>
          </div>
          <div id="${excursion.id}" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
            <div class="card-body">
              <h1>Destination: destinationName</h1>
              <div id="excursionCrew">
                <h2>Crew Members</h2>
                <ul class="list-group list-group-flush">
        <li class="list-group-item">
                  <p>Crew Name</p>
                <p>Crew position</p></li>
      </ul>
              </div>
              <div id="excursionEnvironment">
                <h2>Environment: environmentName</h2>
                <p>Latitude: 34536.3453</p>
                <p>Longitude: 234234.2342</p>
              </div>
              <div id ="excursionSpecies">
                <h2>Species Discovered:</h2>
                <ul>
                <li>Species1</li>
                <li>Species2</li>
                </ul>
              </div>
              <div id="excursionLogs">
                <h2>Logs:</h2>
                <p>Author: crewName</p>
                <p>Date: logDate</p>
                <p>Message: logMessage</p>
              </div>
            </div>
          </div>
        </div>
      </div>`;
      });
      utilities.printToDom('excursions', domString);
    })
    .catch((error) => console.error(error));
};

const excursionButton = () => {
  $('body').on('click', '#Excursions-button', excursionCard);
};

export default { excursionButton };
