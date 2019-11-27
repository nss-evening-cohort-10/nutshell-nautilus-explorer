import $ from 'jquery';
import utilities from '../../helpers/utilities';
import crew from '../homeCard/homeCard';
import './welcome.scss';
import destination from '../destination/destination';
import species from '../speciesBoard/speciesBoard';
import environments from '../environments/environments';

const buildTheDashboard = (boardArray) => {
  let domString = '<div class="d-flex flex-wrap justify-content-center">';
  for (let i = 0; i < boardArray.length; i += 1) {
    const board = boardArray[i];
    domString += `
    <div class="card col-4 dashboard-card">
    <img src="${board.imageUrl}" class="dashboard-image" alt="...">
      <div class="d-flex justify-content-around">
        <button id="${board.id}-button" class="btn btn-outline-light dashboard-button">${board.id}</button>
      </div>
    </div>`;
  }
  domString += '</div>';
  utilities.printToDom('welcome', domString);
  $('body').on('click', '#Crew-button', () => {
    crew.buildCrew();
    $('#welcome').addClass('hide');
    $('#crew').removeClass('hide');
  });
  $('body').on('click', '#Destinations-button', () => {
    destination.destinationBuilderAll();
    $('#welcome').addClass('hide');
    $('#destinations').removeClass('hide');
  });
  $('body').on('click', '#Species-button', () => {
    species.buildSpecies();
    $('#welcome').addClass('hide');
    $('#species').removeClass('hide');
  });
  $('body').on('click', '#Environments-button', () => {
    environments.printEnvironments();
    $('#welcome').addClass('hide');
    $('#environments').removeClass('hide');
  });
};


export default { buildTheDashboard };