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
    latitude: $('#envi-latitude').val(),
    longitude: $('#envi-longitude').val(),
    temperature: $('#envi-temperature').val(),
    depth: $('#envi-depth').val(),
    current: $('#envi-current').val(),
    pressure: $('#envi-pressure').val(),
  };
  enviData.addEnvi(newEnvironment)
    .then(() => {
      $('#uniModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      printEnvironments();
    })
    .catch((error) => console.error(error));
};

const updateEnvironment = (e) => {
  const id = e.target.id.split('update-')[1];
  const updatedEnvironment = {
    latitude: $('#envi-latitude').val(),
    longitude: $('#envi-longitude').val(),
    temperature: $('#envi-temperature').val(),
    depth: $('#envi-depth').val(),
    current: $('#envi-current').val(),
    pressure: $('#envi-pressure').val(),
  };
  enviData.updateEnvi(id, updatedEnvironment)
    .then(() => {
      $('#uniModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      printEnvironments();
    })
    .catch((error) => console.error(error));
};

const environmentModal = (x, id) => {
  const title = `${x ? 'Update' : 'Add'} Environment`;
  const body = `<form>
    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="envi-latitude">Latitude</label>
        <input value="${x.latitude ? x.latitude : ''}" type="text" class="form-control" id="envi-latitude" placeholder="Enter Latitude">
      </div>
      <div class="form-group col-md-6">
        <label for="envi-longitude">Longitude</label>
        <input value="${x.longitude ? x.longitude : ''}" type="text" class="form-control" id="envi-longitude" placeholder="Enter Longitude">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="envi-temperature">Temperature</label>
        <input value="${x.temperature ? x.temperature : ''}" type="text" class="form-control" id="envi-temperature" placeholder="Enter temperature">
      </div>
      <div class="form-group col-md-6">
        <label for="envi-depth">Depth</label>
        <input value="${x.depth ? x.depth : ''}" type="text" class="form-control" id="envi-depth" placeholder="Enter Depth">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="envi-current">Current</label>
        <input value="${x.current ? x.current : ''}" type="text" class="form-control" id="envi-current" placeholder="Enter Current">
      </div>
      <div class="form-group col-md-6">
        <label for="envi-pressure">Pressure</label>
        <input value="${x.pressure ? x.pressure : ''}" type="text" class="form-control" id="envi-pressure" placeholder="Enter Pressure">
      </div>
    </div>
    <button type="button" class="btn btn-danger btn-block save-envi" id="${x ? 'update' : 'add'}-${id}">SAVE</button>
  </form>`;
  utilities.printModal(title, body);
  $('#add-environment').click('.save-envi', addNewEnvironment);
  $(`#update-${id}`).click('.save-envi', updateEnvironment);
};

const checkAction = (e) => {
  const id = e.target.id.split('edit-')[1];
  if (id) {
    enviData.editEnvi(id)
      .then((x) => {
        environmentModal(x, id);
      })
      .catch((error) => console.error(error));
  } else {
    environmentModal();
  }
};

const printEnvironments = () => {
  $('#home').addClass('hide');
  $('#crew').addClass('hide');
  $('#species').addClass('hide');
  $('#log').addClass('hide');
  const uid = firebase.auth().currentUser;
  enviData.getEnvis()
    .then((environments) => {
      let domString = `<div class="container py-5">
                        <h1 class="text-center  my-2">Environments</h1>`;
      if (uid) {
        domString += '<center><button type="button" class="my-2 btn btn-danger add-envi-modal" data-toggle="modal" data-target="#uniModal" id="addEnvi">ADD ENVIRONMENT</button></center>';
      }
      domString += `<table class="table table-striped rounded-lg">
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
                        <td>${envi.latitude}</td>
                        <td>${envi.longitude}</td>
                        <td>${envi.temperature}</td>
                        <td>${envi.depth}</td>
                        <td>${envi.current}</td>
                        <td>${envi.pressure}</td>`;
        if (uid) {
          domString += `<td><button class="btn btn-link edit-environment" id="edit-${envi.id}">EDIT</button> |
        <button type="link" class="btn btn-link delete-environment" id="delete-${envi.id}">DELETE</button></td>`;
        }
        domString += '</tr>';
      });
      domString += '</tbody></table></div>';
      utilities.printToDom('environments', domString);
      $('#environments').on('click', '.delete-environment', deleteEnvironment);
      $('.edit-environment').click(checkAction);
      $('#addEnvi').click(checkAction);
    })
    .catch((error) => console.error(error));
};

export default { printEnvironments };
