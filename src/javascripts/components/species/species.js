import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';
import util from '../../helpers/utilities';
import speciesData from '../../helpers/data/speciesData';
import speciesCard from '../Species Card/speciesCard';
import enviData from '../../helpers/data/environmentData';
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

const populateAddModalRadios = () => {
  enviData.getEnvis()
    .then((environments) => {
      let domString = '<h5>Select Environment</h5>';
      environments.forEach((environment) => {
        domString += `<div class="environment-radios">
        <input class="form-check-input" type="radio" name="exampleRadios" id="${environment.name}-radio" value="${environment.id}">
        <label class="form-check-label" for="exampleRadios1">
          ${environment.name}
          </label>
          </div>`;
      });
      util.printToDom('species-add-environment-radio', domString);
    });
};

const addASpecies = (e) => {
  e.stopImmediatePropagation();
  const checkedEnvironment = $('input:checked').val();
  const newSpecies = {
    name: $('#species-name').val(),
    image: $('#species-image').val(),
    description: $('#species-description').val(),
    environmentId: `${checkedEnvironment}`,
  };
  speciesData.addNewSpecies(newSpecies)
    .then(() => {
      $('#addSpeciesModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      buildSpecies();
    })
    .catch((error) => console.error(error));
};

const getSpeciesModal = (e) => {
  const speciesId = e.target.id.split('update-')[1];
  speciesData.getSpeciesById(speciesId)
    .then((response) => {
      $('#updateSpeciesModal').modal('show');
      const species = response.data;
      enviData.getEnvis()
        .then((environments) => {
          let domString = '<h5>Select Environment</h5>';
          environments.forEach((environment) => {
            domString += `<div class="environment-radios">
            <input class="form-check-input" type="radio" name="exampleRadios" id="${environment.name}-radio" value="${environment.id}">
            <label class="form-check-label" for="exampleRadios1">
              ${environment.name}
              </label>
              </div>`;
          });
          util.printToDom('species-update-environment-radio', domString);
        });
      $('#update-species-name').val(species.name);
      $('#update-species-description').val(species.description);
      $('#update-species-image').val(species.image);
      $('.update-species').attr('id', speciesId);
    })
    .catch((error) => console.error(error));
};

const updateASpecies = (e) => {
  e.stopImmediatePropagation();
  const speciesId = e.target.id;
  const checkedEnvironment = $('input:checked').val();
  const updatedSpecies = {
    name: $('#update-species-name').val(),
    description: $('#update-species-description').val(),
    image: $('#update-species-image').val(),
    environmentId: `${checkedEnvironment}`,
  };
  speciesData.updateSpecies(speciesId, updatedSpecies)
    .then(() => {
      $('#updateSpeciesModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      buildSpecies();
    })
    .catch((error) => console.error(error));
};

const buildSpecies = () => {
  const userSignedIn = firebase.auth().currentUser;
  speciesData.getAllSpecies()
    .then(() => {
      let domString = '';
      if (userSignedIn) {
        domString = '<h1 class="add-a-species text-center board-header">Discovered Species</h1>';
        domString += '<center><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addSpeciesModal" id="add-species-button">Add Species</button></center>';
        domString += '<div id="species-section">';
      } else {
        domString = '<h1 class="add-a-species text-center board-header">View Species</h1>';
        domString += '<div id="species-section">';
      }
      speciesData.getAllSpecies()
        .then((species) => {
          species.forEach((s) => {
            domString += speciesCard.makeASpecies(s);
          });
          domString += '</div>';
          util.printToDom('species', domString);
          $(document.body).on('click', '.delete-species', deleteASpecies);
          $(document.body).on('click', '#add-new-species', addASpecies);
          $('.update-species-modal').click(getSpeciesModal);
          $('.update-species').click(updateASpecies);
          $('#add-species-button').click(populateAddModalRadios);
        });
    })
    .catch((error) => console.error(error));
};

export default { buildSpecies };
