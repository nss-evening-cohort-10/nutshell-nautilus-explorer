import $ from 'jquery';
import './destination.scss';
import firebase from 'firebase/app';
import 'firebase/auth';
import destinationData from '../../helpers/data/destinationData';
import utilities from '../../helpers/utilities';
import enviData from '../../helpers/data/environmentData';


const deleteDestinationbyId = (e) => {
  e.preventDefault();
  const id = e.target.id.split('delete-')[1];
  destinationData.deleteDestination(id)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      destinationBuilderAll();
    })
    .catch((error) => console.error(error));
};

const populateAddDestinationModalRadios = () => {
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
      utilities.printToDom('destinations-add-environment-radio', domString);
    });
};

const addDestination = (e) => {
  const checkedEnvironment = $('input:checked').val();
  e.stopImmediatePropagation();
  const newDestination = {
    name: $('#location-name').val(),
    port: $('#entry-port').val(),
    description: $('#destination-description').val(),
    destinationLink: $('#destination-add-info').val(),
    environmentId: `${checkedEnvironment}`,
  };
  destinationData.addNewDestination(newDestination)
    .then(() => {
      $('#addDestinationModal').modal('hide');
      $('#destinations').removeClass('hide');
      // eslint-disable-next-line no-use-before-define
      destinationBuilderAll();
    })
    .catch((error) => console.error(error));
};

const getPrefilledDestinationsModal = (e) => {
  const destinationId = e.target.id.split('edit-')[1];
  destinationData.getDestinationById(destinationId)
    .then((response) => {
      $('#editDestinationModal').modal('show');
      const destinations = response.data;
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
          utilities.printToDom('destinations-edit-environment-radio', domString);
        });
      $('#edit-location-name').val(destinations.name);
      $('#edit-entry-port').val(destinations.port);
      $('#edit-destination-description').val(destinations.description);
      $('#edit-destination-add-info').val(destinations.destinationLink);
      $('.editDestination').attr('id', destinationId);
    })
    .catch((error) => console.error(error));
};

const editDestination = (e) => {
  e.stopImmediatePropagation();
  const destinationId = e.target.id;
  const selectedEnvironment = $('input:checked').val();
  const updatedDestination = {
    name: $('#edit-location-name').val(),
    port: $('#edit-entry-port').val(),
    description: $('#edit-destination-description').val(),
    destinationLink: $('#edit-destination-add-info').val(),
    environmentId: `${selectedEnvironment}`,
  };
  destinationData.updateDestination(destinationId, updatedDestination)
    .then(() => {
      $('#editDestinationModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      destinationBuilderAll();
    })
    .catch((error) => console.error(error));
};


const destinationBuilderAll = () => {
  const userSignedIn = firebase.auth().currentUser;
  destinationData.getDestinations()
    .then((destinations) => {
      let domString = '';
      if (userSignedIn) {
        domString = `<h1 class="text-center">Destinations</h1>
        <button id="destinationAdd" type="button" class="btn btn-outline-info btn-lg" data-toggle="modal" data-target="#addDestinationModal">
        Add Destination
        </button>
        <table class="table table-striped">
        <thead class="header">
          <tr>
            <th scope="col">Location Name</th>
            <th scope="col">Entry Port</th>
            <th scope="col">Description</th>
            <th scope="col">Additional Information</th>
            <th scope="col">Edit / Delete</th>
          </tr>
        </thead>
        <tbody>`;
      } else {
        domString = `<h1 class="text-center">Destinations</h1>
        <table class="table table-striped">
        <thead class="header">
          <tr>
            <th scope="col">Location Name</th>
            <th scope="col">Entry Port</th>
            <th scope="col">Description</th>
            <th scope="col">Additional Information</th>
           
          </tr>
        </thead>
        <tbody>`;
      }
      destinations.forEach((destination) => {
        if (userSignedIn) {
          domString += `<tr>
      <th scope="row">${destination.name}</th>
      <td>${destination.port}</td>
      <td>${destination.description}</td>
      <td><a href=${destination.destinationLink}">${destination.name} Links</a></td>
      <td><button type="link" data-toggle="modal" data-target="#editDestinationModal" class="btn btn-link edit-destination-modal" id="edit-${destination.id}">EDIT</button> 
        <button type="link" class="btn btn-link deletes-destination" id="delete-${destination.id}">DELETE</button></td>
    </tr>`;
        } else {
          domString += `<tr>
      <th scope="row">${destination.name}</th>
      <td>${destination.port}</td>
      <td>${destination.description}</td>
      <td><a href=${destination.destinationLink}">${destination.name} Links</a></td>
    </tr>`;
        }
      });
      domString += '</tbody></table>';
      utilities.printToDom('destinations', domString);
      $('#destinations').on('click', '.deletes-destination', deleteDestinationbyId);
      $('#destinationHome').addClass('hide');
      $('body').on('click', '.addDestination', addDestination);
      $('body').on('click', '#destinationAdd', populateAddDestinationModalRadios);
      $('body').on('click', '.edit-destination-modal', getPrefilledDestinationsModal);
      $('body').on('click', '.editDestination', editDestination);
    })
    .catch((error) => console.error(error));
};

export default { destinationBuilderAll };
