import $ from 'jquery';
import utilities from '../../helpers/utilities';
import logData from '../../helpers/data/logsData';

const makeLogBoard = (logs) => {
  const domString = `
  <ul class="list-group list-group-horizontal">
  <li class="list-group-item">${logs.date}</li>
  <li class="list-group-item">${logs.id}</li>
  <li class="list-group-item">${logs.destName}</li>
  <li class="list-group-item">${logs.crewName}</li>
  <li class="list-group-item">${logs.message}</li>
</ul>
 
    `;
  return domString;
};

const printLogs = () => {
  logData.getLogs()
    .then((logSegments) => {
      let domString = '';
      logSegments.forEach((logSegment) => {
        domString += makeLogBoard(logSegment);
      });
      console.error(logSegments);
      utilities.printToDom('logHome', domString);
    })
    .catch((error) => console.error(error));
};

const showLogs = () => {
  $('body').on('click', '.logs', () => {
    printLogs();
  });
};


export default { showLogs };
