import $ from 'jquery';
import util from '../../helpers/utilities';
import speciesData from '../../helpers/data/speciesData';
import makeSpecies from '../species/species';

const deleteFromBoard = (e) => {
  e.preventDefault();
  const boardId = $('.board-header')[0].id;
  const speciesId = e.target.id;
  speciesData.deleteSpecies(speciesId)
    .then(() => {
      console.error(boardId);
      // eslint-disable-next-line no-use-before-define
      buildSpecies(boardId);
    })
    .catch((error) => console.error(error));
};

const addNewSpecies = (e) => {
  e.stopImmediatePropagation();
  const assignToBoard = $('.add-a-species')[0].id;
  const newSpecies = {
    speciesId: `${assignToBoard}`,
    name: $('#species-name').val(),
    image: $('#species-image').val(),
    description: $('#species-description').val(),
  };
  speciesData.addNewSpecies(newSpecies)
    .then(() => {
      $('#exampleModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      buildSpecies(assignToBoard);
    })
    .catch((error) => console.error(error));
};


const buildSpecies = (speciesId) => {
  speciesData.getAllSpecies(speciesId)
    .then((speciesBoard) => {
      let domString = `<h1 class="add-a-species text-center board-header" id="${speciesBoard.id}">SPECIES</h1>`;
      domString += `<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
      Add Species</button>`;
      domString += '<div id="species-section" class="d-flex flex-wrap justify-content-center">';
      speciesData.getAllSpecies(speciesId)
        .then((species) => {
          species.forEach((s) => {
            domString += makeSpecies.makeASpecies(s);
          });
          domString += '</div>';
          util.printToDom('species', domString);
          $('#speciesHome').addClass('hide');
          $('#species').on('click', '.delete-species', deleteFromBoard);
          $(document.body).on('click', '#add-new-species', addNewSpecies);
        });
    })
    .catch((error) => console.error(error));
};

// const goToBoard = (e) => {
//   e.stopImmediatePropagation();
//   const boardId = e.target.id.split('view-')[1];
//   buildSpecies(boardId);
// };


const makeSpeciesBoard = () => {
  const domString = `<div class="card" style="width: 18rem;">
  <img src="https://raw.githubusercontent.com/nss-evening-cohort-10/nutshell-nautilus-explorer/master/src/assets/images/underwater-species.jpg" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">SPECIES</h5>
    <button type="button" class="btn btn-primary view-species">View Species</button>
  </div>
  </div>
  `;
  util.printToDom('speciesHome', domString);
  $('#speciesHome').on('click', '.view-species', buildSpecies);
};

export default { makeSpeciesBoard };
