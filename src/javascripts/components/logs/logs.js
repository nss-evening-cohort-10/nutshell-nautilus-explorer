import firebase from 'firebase/app';
import 'firebase/auth';
import utilities from '../../helpers/utilities';
import logData from '../../helpers/data/logsData';


const makeLogBoard = (logs) => {
  const userSignedIn = firebase.auth().currentUser;
  let domString = '';
  if (userSignedIn) {
    domString += `<ul class="list-group list-group-horizontal">
  <li class="list-group-item">${logs.date}</li>
  <li class="list-group-item">${logs.id}</li>
  <li class="list-group-item">${logs.destName}</li>
  <li class="list-group-item">${logs.crewName}</li>
  <li class="list-group-item">${logs.message}</li>
  <button id="update-${logs.id}" type="button" class="btn btn-warning staff-edit" data-toggle="modal" data-target="#updateLogsModal">
      Edit
    </button>
    <button id="${logs.id}" type="button" class="btn btn-danger staff-delete-button">Delete</button>
</ul>`;
  } else {
    domString += `<ul class="list-group list-group-horizontal">
  <li class="list-group-item">${logs.date}</li>
  <li class="list-group-item">${logs.id}</li>
  <li class="list-group-item">${logs.destName}</li>
  <li class="list-group-item">${logs.crewName}</li>
  <li class="list-group-item">${logs.message}</li>`;
  }
  return domString;
};

const printLogs = () => {
  const userSignedIn = firebase.auth().currentUser;
  logData.getLogs()
    .then((logSegments) => {
      let domString = '';
      if (userSignedIn) {
        domString += '<h1 class="text-center" id="staff-header">Logs</h1>';
        domString += `<div id="addLogsDiv" class="d-flex justify-content-center"><button id="addStaffButton" type="button" class="btn btn-secondary" data-toggle="modal" data-target="#addStaffModal">
        Add New Log
      </button></div>`;
      } else {
        domString += '<h1 class="text-center" id="logs-header">Logs</h1>';
      }
      logSegments.forEach((logSegment) => {
        domString += makeLogBoard(logSegment);
      });
      console.error(logSegments);
      utilities.printToDom('log', domString);
    })
    .catch((error) => console.error(error));
};

// const showLogs = () => {
//   $('body').on('click', '#Logs-button', () => {
//     printLogs();

//   });
// };


export default { printLogs };
