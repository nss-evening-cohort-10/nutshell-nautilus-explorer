import util from '../../helpers/utilities';
import speciesData from '../../helpers/data/speciesData';
import makeSpecies from '../species/species';


const buildSpecies = (speciesId) => {
  speciesData.getAllSpecies(speciesId)
    .then((speciesBoard) => {
      let domString = `<h1 class="add-a-species text-center board-header" id="${speciesBoard.id}">${speciesBoard.name}</h1>`;
      domString += '<div id="species-section" class="d-flex flex-wrap justify-content-center">';
      speciesData.getSpecies(speciesId)
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
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
  </div>
  `;
  util.printToDom('speciesHome', domString);
};

export default { makeSpeciesBoard, buildSpecies };
