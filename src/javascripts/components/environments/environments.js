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

const addNewEnvironment = (e) => {
  e.stopImmediatePropagation();
  const newEnvironment = {
    latitude: $('#environment-latitude').val(),
    longitude: $('#environment-longitude').val(),
    temperature: $('#environment-temperature').val(),
    depth: $('#environment-depth').val(),
    current: $('#environment-current').val(),
    pressure: $('#environment-pressure').val(),
  };
  enviData.addEnvi(newEnvironment)
    .then(() => {
      $('#addEnvironmentModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      printEnvironments();
    })
    .catch((error) => console.error(error));
};

const printEnvironments = () => {
  const userSignedIn = firebase.auth().currentUser;
  enviData.getEnvis()
    .then((environments) => {
      let domString = '';
      if (userSignedIn) {
        domString = `<div class="container py-5">
                        <h1 class="text-center  my-2">Environments</h1>`;
        domString += `<center><button type="button" id="addEnvironmentButton" class="btn btn-primary" data-toggle="modal" data-target="#addEnvironmentModal">
        Add Environment
      </button></center>`;
      } else {
        domString = `<div class="container py-5">
                      <h1 class="text-center  my-2">Environments</h1>`;
      }
      domString += `<table 
      class="table table-striped rounded-lg">
                      <thead class="header">
                        <tr>
                          <th scope="col">Latitude</th>
                          <th scope="col">Longitude</th>
                          <th scope="col">Temperature</th>
                          <th scope="col">Depth</th>
                          <th scope="col">Current</th>
                          <th scope="col">Pressure</th>`;
      domString += `</tr>
                  </thead>
                <tbody>`;
      environments.forEach((envi) => {
        if (userSignedIn) {
          domString += `<tr>
                        <td>${envi.latitude}</td>
                        <td>${envi.longitude}</td>
                        <td>${envi.temperature}</td>
                        <td>${envi.depth}</td>
                        <td>${envi.current}</td>
                        <td>${envi.pressure}</td>`;
          domString += `<td><button class="btn btn-link edit-environment" id="edit-${envi.id}">EDIT</button> |
        <button type="link" class="btn btn-link delete-environment" id="delete-${envi.id}">DELETE</button></td>`;
          domString += '</tr>';
        } else {
          domString += `<tr>
          <td>${envi.latitude}</td>
          <td>${envi.longitude}</td>
          <td>${envi.temperature}</td>
          <td>${envi.depth}</td>
          <td>${envi.current}</td>
          <td>${envi.pressure}</td>`;
          domString += '</tr>';
        }
      });
      domString += '</tbody></table></div>';
      utilities.printToDom('environments', domString);
      $('#environments').on('click', '.delete-environment', deleteEnvironment);
      $('#add-new-environment').click(addNewEnvironment);
    })
    .catch((error) => console.error(error));
};

export default { printEnvironments };
