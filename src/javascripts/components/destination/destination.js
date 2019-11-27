import $ from 'jquery';
import './destination.scss';
import firebase from 'firebase/app';
import 'firebase/auth';
import destinationdata from '../../helpers/data/destinationData';
import utilities from '../../helpers/utilities';


const deleteDestinationbyId = (e) => {
  e.preventDefault();
  const id = e.target.id.split('delete-')[1];
  destinationdata.deleteDestination(id)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      destinationBuilderAll();
      // eslint-disable-next-line no-use-before-define
    })
    .catch((error) => console.error(error));
};

const destinationBuilderAll = () => {
  const userSignedIn = firebase.auth().currentUser;
  destinationdata.getDestinations()
    .then((destinations) => {
      let domString = '';
      if (userSignedIn) {
        domString = `<h1 class="text-center">Destinations</h1>
        <button id="destinationAdd" type="button" class="btn btn-outline-info btn-lg" data-toggle="modal" data-target="#destinationModal">
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
    })
    .catch((error) => console.error(error));
};

const destinationBuilderHome = () => {
  const userSignedIn = firebase.auth().currentUser;
  destinationdata.getDestinations()
    .then((destinations) => {
      let domString = '';
      if (userSignedIn) {
        domString = `<h1 class="text-center" id="welcome">Destinations</h1>
    <button id="destinationAdd" type="button" class="btn btn-outline-info btn-lg" data-toggle="modal" data-target="#destinationModal">
      Add Destination
    </button>
    <td>
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
        domString = `<h1 class="text-center" id="welcome">Destinations</h1>
        <td>
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
        domString += `<tr>
      <th scope="row">${destination.name}</th>
      <td>${destination.port}</td>
      <td>${destination.description}</td>
      <td><a href=${destination.destinationLink}">${destination.name} Links</a></td>
    </tr>`;
      });
      domString += '</tbody></table>';
      utilities.printToDom('destinationHome', domString);
      $('#destinationHome').on('click', '.viewAll-destination', destinationBuilderAll);
    })
    .catch((error) => console.error(error));
};

export default { destinationBuilderAll, destinationBuilderHome };
