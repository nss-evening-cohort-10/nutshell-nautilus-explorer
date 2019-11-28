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

const populateModalRadios = () => {
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
      util.printToDom('species-environment-radio', domString);
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
  console.log(speciesId);
  speciesData.getSpeciesById(speciesId)
    .then((response) => {
      $('#updateSpeciesModal').modal('show');
      const species = response.data;
      $('#update-species-name').val(species.name);
      $('#update-species-description').val(species.description);
      $('#update-species-image').val(species.image);
      $('#update-species-environment').val(species.environmentId);
      $('.update-species').attr('id', speciesId);
    })
    .catch((error) => console.error(error));
};

const updateASpecies = (e) => {
  e.stopImmediatePropagation();
  const speciesId = e.target.id;
  console.log(speciesId);
  const updatedSpecies = {
    name: $('#update-species-name').val(),
    description: $('#update-species-description').val(),
    image: $('#update-species-image').val(),
    environmentId: $('#update-species-environment').val(),
    id: `${speciesId}`,
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
        domString = '<h1 class="add-a-species text-center board-header">View Species</h1>';
        domString += '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addSpeciesModal" id="add-species-button">Add Species</button>';
        domString += '<div id="species-section" class="d-flex flex-wrap justify-content-center">';
      } else {
        domString = '<h1 class="add-a-species text-center board-header">View Species</h1>';
        domString += '<div id="species-section" class="d-flex flex-wrap justify-content-center">';
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
          $('#add-species-button').click(populateModalRadios);
        });
    })
    .catch((error) => console.error(error));
};

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
};

export default { makeSpeciesBoard, buildSpecies };
