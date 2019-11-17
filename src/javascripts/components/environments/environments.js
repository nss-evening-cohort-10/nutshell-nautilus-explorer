import utilities from '../../helpers/utilities';
import enviData from '../../helpers/data/environmentData';
import 'bootstrap';
import './environments.scss';

const printEnvironments = () => {
  enviData.getEnvironments()
    .then((environments) => {
      let domString = `<h1 class="text-center">Environments</h1>
<table class="table table-striped">
  <thead class="header">
    <tr>
      <th scope="col">Latitude</th>
      <th scope="col">Longitude</th>
      <th scope="col">Temperature</th>
      <th scope="col">Depth</th>
      <th scope="col">Current</th>
      <th scope="col">Pressure</th>
      <th scope="col">Edit | Delete</th>
    </tr>
  </thead>
  <tbody>`;
      environments.forEach((envi) => {
        domString += `<tr>
      <td>${envi.longitude}</td>
      <td>${envi.latitude}</td>
      <td>${envi.temperature}</td>
      <td>${envi.depth}</td>
      <td>${envi.current}</td>
      <td>${envi.pressure}</td>
      <td><button type="link" class="btn btn-link edit-environments" id="edit-${envi.id}">EDIT</button> |
        <button type="link" class="btn btn-link delete-environment" id="delete-${envi.id}">DELETE</button></td>
    </tr>`;
      });
      domString += '</tbody></table>';
      utilities.printToDom('environments', domString);
      // $('#boards').on('click', 'edit-environments', editEnvironment);
      // $('#boards').on('click', '.delete-environments', deleteEnvironment);
    })
    .catch((error) => console.error(error));
};

export default { printEnvironments };
