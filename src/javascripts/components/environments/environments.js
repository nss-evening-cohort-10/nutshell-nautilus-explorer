import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import enviData from '../../helpers/data/environmentData';
import utilities from '../../helpers/utilities';
import './environments.scss';

const deleteEnvironment = (e) => {
  e.stopImmediatePropagation();
  const id = e.target.id.split('delete-')[1];
  enviData.deleteEnvis(id)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      printEnvironments();
    })
    .catch((error) => console.error(error));
};

const addEnvironmentModal = () => {
  const title = 'Add Environment';
  const body = `<form>
    <div class="form-group">
      <label for="userName">User Name</label>
      <input type="text" class="form-control" id="userName" placeholder="Enter User Name">
    </div>
    <button type="button" class="btn btn-danger add-envi" id="add-environment">ADD</button>
  </form>`;
  utilities.printModal(title, body);
  $('#uniModal').click(enviData.addEnvironment);
};

const printEnvironments = () => {
  const uid = firebase.auth().currentUser;
  enviData.getEnvis()
    .then((environments) => {
      let domString = `<h1 class="text-center">Environments</h1>
      <center><button type="link" class="btn btn-link add-envi-modal" data-toggle="modal" data-target="#uniModal" id="userName">ADD ENVIRONMENT</button></center>
<table class="table table-striped">
  <thead class="header">
    <tr>
      <th scope="col">Latitude</th>
      <th scope="col">Longitude</th>
      <th scope="col">Temperature</th>
      <th scope="col">Depth</th>
      <th scope="col">Current</th>
      <th scope="col">Pressure</th>`;
      if (uid) {
        domString += '<th scope="col">Edit | Delete</th>';
      }
      domString += `</tr>
  </thead>
  <tbody>`;
      environments.forEach((envi) => {
        domString += `<tr>
      <td>${envi.longitude}</td>
      <td>${envi.latitude}</td>
      <td>${envi.temperature}</td>
      <td>${envi.depth}</td>
      <td>${envi.current}</td>
      <td>${envi.pressure}</td>`;
        if (uid) {
          domString += `<td><button type="link" class="btn btn-link edit-environments" id="edit-${envi.id}">EDIT</button> |
        <button type="link" class="btn btn-link delete-environment" id="delete-${envi.id}">DELETE</button></td>`;
        }
        domString += '</tr>';
      });
      domString += '</tbody></table>';
      utilities.printToDom('environments', domString);
      $('#environments').on('click', '.delete-environment', deleteEnvironment);
      // $('#environments').on('click', 'edit-environments', editEnvironment);
      $('#environments').on('click', '.add-envi-modal', addEnvironmentModal);
    })
    .catch((error) => console.error(error));
};

export default { printEnvironments };
