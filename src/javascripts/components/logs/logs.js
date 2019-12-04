import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import utilities from '../../helpers/utilities';
import logData from '../../helpers/data/logsData';


const makeLogBoard = (logs) => {
  const userSignedIn = firebase.auth().currentUser;
  let domString = '';
  if (userSignedIn) {
    domString += `<div class="accordion" id="accordionExample">
            <div class="card">
              <div class="card-header" id="headingOne">
                <h2 class="mb-0">
                  <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#${logs.id}" aria-expanded="true" aria-controls="${logs.id}">
                    ${logs.destName} ${logs.date}
                  </button>
                </h2>
              </div>
              <div id="${logs.id}" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                <div class="card-body">
                <div class="card">
                <div class="card-header">
                 Log Number: ${logs.id}
                </div>
                <div class="card-body">
                  <h5 class="card-title">Crew Member: ${logs.crewName}</h5>
                  <p class="card-text">Message: ${logs.message}</p>
                  <button type="button" id="delete-${logs.id}" class="btn btn-danger delete-log">Delete Log</button>
                </div>
              </div>
            </div>
          </div>`;
  } else {
    domString += `<div class="accordion" id="accordionExample">
    <div class="card">
      <div class="card-header" id="headingOne">
        <h2 class="mb-0">
          <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#${logs.id}" aria-expanded="true" aria-controls="${logs.id}">
            ${logs.destName} ${logs.date}
          </button>
        </h2>
      </div>
      <div id="${logs.id}" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
        <div class="card-body">
        <div class="card">
        <div class="card-header">
         Log Number: ${logs.id}
        </div>
        <div class="card-body">
          <h5 class="card-title">Crew Member: ${logs.crewName}</h5>
          <p class="card-text">Message: ${logs.message}</p>
        </div>
      </div>
    </div>
  </div>`;
  }
  return domString;
};

const deleteLogsById = (e) => {
  e.preventDefault();
  const id = e.target.id.split('delete-')[1];
  console.error('logId', id);
  logData.deleteLog(id)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      printLogs();
    })
    .catch((error) => console.error(error));
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
      utilities.printToDom('logsAccordion', domString);
      $('body').on('click', '.delete-log', deleteLogsById);
    })
    .catch((error) => console.error(error));
};


export default { printLogs };
