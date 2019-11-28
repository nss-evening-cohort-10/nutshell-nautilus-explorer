import $ from 'jquery';
import './destination.scss';
import firebase from 'firebase/app';
import 'firebase/auth';
import destinationData from '../../helpers/data/destinationData';
import utilities from '../../helpers/utilities';


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

const addDestination = (e) => {
  e.stopImmediatePropagation();
  const newDestination = {
    environmentId: $('#environment-id'),
    name: $('#location-name').val(),
    port: $('#entry-port').val(),
    description: $('#destination-description').val(),
    destinationLink: $('#destination-add-info').val(),
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
      <td><button type="link" class="btn btn-ink  edit-destination" id="edit-${destination.id}">EDIT</button> 
        <button type="link" class="btn btn-link  deletes-destination" id="delete-${destination.id}">DELETE</button></td>
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
    })
    .catch((error) => console.error(error));
};

export default { destinationBuilderAll };
