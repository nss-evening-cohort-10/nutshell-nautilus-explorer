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
  destinationdata.getDestinations()
    .then((destinations) => {
      let domString = `<h1 class="text-center">Destinations</h1>
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
      destinations.forEach((destination) => {
        domString += `<tr>
      <th scope="row">${destination.name}</th>
      <td>${destination.port}</td>
      <td>${destination.description}</td>
      <td><a href=${destination.destinationLink}">${destination.name} Links</a></td>
      <td><button type="link" class="btn btn-ink  edit-destination" id="edit-${destination.id}">EDIT</button> 
        <button type="link" class="btn btn-link  deletes-destination" id="delete-${destination.id}">DELETE</button></td>
    </tr>`;
      });
      domString += '</tbody></table>';
      utilities.printToDom('destinations', domString);
      $('#destinations').on('click', '.deletes-destination', deleteDestinationbyId);
      $('#destinationHome').addClass('hide');
    })
    .catch((error) => console.error(error));
};

const destinationBuilderHome = () => {
  destinationdata.getDestinations()
    .then((destinations) => {
      let domString = `<h1 class="text-center">Destinations</h1>
      <td><button type="link" class="btn btn-ink  viewAll-destination" id="viewAll">View All</button> 
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

const destinationLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $('.edit-destination').removeClass('hide');
      $('.deletes-destination').removeClass('hide');
    } else {
      $('.edit-destination').addClass('hide');
      $('.deletes-destination').addClass('hide');
    }
  });
  // destinationBuilderAll();
};

export default { destinationBuilderAll, destinationLoginStatus, destinationBuilderHome };
