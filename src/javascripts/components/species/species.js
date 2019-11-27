import $ from 'jquery';
import util from '../../helpers/utilities';
import speciesData from '../../helpers/data/speciesData';
import speciesCard from '../Species Card/speciesCard';
import './species.scss';


const deleteASpecies = (e) => {
  e.preventDefault();
  const speciesId = e.target.id.split('delete-')[1];
  speciesData.deleteSpecies(speciesId)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      buildSpecies();
    })
    .catch((error) => console.error(error));
};

const addASpecies = (e) => {
  e.stopImmediatePropagation();
  const assignToBoard = $('.add-a-species')[0].id;
  const newSpecies = {
    id: `${assignToBoard}`,
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

// const updateASpecies = (e) => {
//   e.stopImmediatePropagation();
//   const speciesId = e.target.parentNode.id;
//   const updatedSpecies = {
//     id: `${speciesId}`,
//     name: $('#name').val(),
//     image: $('#image').val(),
//     description: $('#description').val(),
//   };
//   speciesData.updateSpecies(editedSpeciesId, updatedSpecies)
//     .then(() => {
//       $('#edSpecies').modal('hide');
//       // eslint-disable-next-line no-use-before-define
//       buildSpecies();
//     })
//     .catch((error) => console.error(error));
// };


const buildSpecies = () => {
  $('#welcome').addClass('hide');
  $('#crewHome').addClass('hide');
  $('#logHome').addClass('hide');
  $('#destinationHome').addClass('hide');
  $('#environments').addClass('hide');
  $('#crew').addClass('hide');
  $('#log').addClass('hide');
  $('#speciesHome').addClass('hide');
  speciesData.getAllSpecies()
    .then(() => {
      let domString = '<h1 class="add-a-species text-center board-header">View Species</h1>';
      domString += '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Add Species</button>';
      domString += '<div id="species-section" class="d-flex flex-wrap justify-content-center">';
      speciesData.getAllSpecies()
        .then((species) => {
          species.forEach((s) => {
            domString += speciesCard.makeASpecies(s);
          });
          domString += '</div>';
          util.printToDom('species', domString);
          $(document.body).on('click', '.delete-species', deleteASpecies);
          $(document.body).on('click', '#add-new-species', addASpecies);
          // $(document.body).on('click', '#update-species', updateASpecies);
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
  const domString = `<div class="card">
  <h5 class="card-title text-center card-title">View Species</h5>
  <img id="speciesImg" src="https://raw.githubusercontent.com/nss-evening-cohort-10/nutshell-nautilus-explorer/master/src/assets/images/underwater-species.jpg" class="card-img-top" alt="...">
  <div class="card-body text-center">
    <button type="button" class="btn btn-danger btn-lg view-species">View</button>
  </div>
  </div>
  `;
  util.printToDom('speciesHome', domString);
  $('#speciesHome').on('click', '.view-species', buildSpecies);
};

export default { makeSpeciesBoard };
