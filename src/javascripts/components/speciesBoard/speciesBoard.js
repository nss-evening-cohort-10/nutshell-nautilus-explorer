import $ from 'jquery';
import util from '../../helpers/utilities';
import speciesData from '../../helpers/data/speciesData';
import makeSpecies from '../species/species';


const buildSpecies = (speciesId) => {
  speciesData.getAllSpecies(speciesId)
    .then((speciesBoard) => {
      let domString = `<h1 class="add-a-species text-center board-header" id="${speciesBoard.id}">SPECIES</h1>`;
      domString += '<div id="species-section" class="d-flex flex-wrap justify-content-center">';
      speciesData.getAllSpecies(speciesId)
        .then((species) => {
          species.forEach((s) => {
            domString += makeSpecies.makeASpecies(s);
          });
          domString += '</div>';
          util.printToDom('speciesHome', domString);
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
  <img src="..." class="card-img-top" alt="...">
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