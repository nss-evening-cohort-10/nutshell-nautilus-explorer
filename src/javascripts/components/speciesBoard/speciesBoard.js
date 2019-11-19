import util from '../../helpers/utilities';
import speciesData from '../../helpers/data/speciesData';
import makeSpecies from '../species/species';


const buildSpecies = (speciesId) => {
  speciesData.getSpecies(speciesId)
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

export default { buildSpecies };
