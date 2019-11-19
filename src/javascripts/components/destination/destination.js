import $ from 'jquery';
import './destination.scss';
import firebase from 'firebase/app';
import 'firebase/auth';
import getDestination from '../../helpers/data/destinationData';
import utilities from '../../helpers/utilities';

const destinationBuilderAll = () => {
  getDestination.getDestinations()
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
      <td><button type="link" class="btn btn-ink hide edit-destination" id="edit-${destination.id}">EDIT</button> 
        <button type="link" class="btn btn-link hide delete-destination" id="delete-${destination.id}">DELETE</button></td>
    </tr>`;
      });
      domString += '</tbody></table>';
      utilities.printToDom('destinationHome', domString);
    })
    .catch((error) => console.error(error));
};

const destinationLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $('.edit-destination').removeClass('hide');
      $('.delete-destination').removeClass('hide');
    } else {
      $('.edit-destination').removeClass('hide');
      $('.delete-destination').removeClass('hide');
    }
  });
  destinationBuilderAll();
};

export default { destinationBuilderAll, destinationLoginStatus };
