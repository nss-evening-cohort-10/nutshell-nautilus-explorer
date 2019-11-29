/* eslint-disable no-use-before-define */
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
    name: $('#environment-name').val(),
  };
  enviData.addEnvi(newEnvironment)
    .then(() => {
      $('#addEnvironmentModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      printEnvironments();
    })
    .catch((error) => console.error(error));
};
const getPreFilledModal = (event) => {
  const environmentId = event.target.id.split('update-')[1];
  console.log('environmentIdfilled', environmentId);
  enviData.getEnvironmentById(environmentId)
    .then((response) => {
      console.log('response', response);
      $('#updateEnvironmentModal').modal('show');
      const environment = response.data;
      $('#update-environment-latitude').val(environment.latitude);
      $('#update-environment-longitude').val(environment.longitude);
      $('#update-environment-temperature').val(environment.temperature);
      $('#update-environment-depth').val(environment.depth);
      $('#update-environment-current').val(environment.current);
      $('#update-environment-pressure').val(environment.pressure);
      $('#update-environment-name').val(environment.name);
      $('.update-environment').attr('id', environmentId);
    })
    .catch((error) => console.error(error));
};

const updateCurrentEnvironment = (event) => {
  event.stopImmediatePropagation();
  const environmentId = event.target.id;
  console.log('environmentId', environmentId);
  const updatedEnvironment = {
    latitude: $('#update-environment-latitude').val(),
    longitude: $('#update-environment-longitude').val(),
    temperature: $('#update-environment-temperature').val(),
    depth: $('#update-environment-depth').val(),
    current: $('#update-environment-current').val(),
    pressure: $('#update-environment-pressure').val(),
    name: $('#update-environment-name').val(),
  };
  enviData.updateEnvironment(environmentId, updatedEnvironment)
    .then(() => {
      $('#updateEnvironmentModal').modal('hide');
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
        domString += `<center><button type="button" id="addEnvironmentButton" class="btn btn-outline-primary" data-toggle="modal" data-target="#addEnvironmentModal">
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
                          <th scope="col">Name</th>
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
                        <td>${envi.name}</td>
                        <td>${envi.latitude}</td>
                        <td>${envi.longitude}</td>
                        <td>${envi.temperature}</td>
                        <td>${envi.depth}</td>
                        <td>${envi.current}</td>
                        <td>${envi.pressure}</td>`;
          domString += `<td><button type="button" class="btn btn-outline-primary updateEnvironment" id="update-${envi.id}" data-toggle="modal" data-target="#updateEnvironmentModal">
          Update Environment
        </button> |
        <button type="link" class="btn btn-outline-danger delete-environment" id="delete-${envi.id}">DELETE</button></td>`;
          domString += '</tr>';
        } else {
          domString += `<tr>
          <td>${envi.name}</td>
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
      $('.updateEnvironment').click(getPreFilledModal);
      $('.update-environment').click(updateCurrentEnvironment);
    })
    .catch((error) => console.error(error));
};

export default { printEnvironments };
