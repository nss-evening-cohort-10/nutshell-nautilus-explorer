import $ from 'jquery';
import excursionSmash from '../../helpers/data/excursionSmash';
import utilities from '../../helpers/utilities';

// const excursionCard = () => {
//   excursionSmash.getAllExcursions()
//     .then((excursions) => {
//       let domString = '';
//       excursions.forEach((excursion) => {
//         domString += `
//       <div class="accordion" id="accordionExample">
//         <div class="card">
//           <div class="card-header" id="headingOne">
//             <h2 class="mb-0">
//               <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#${excursion.id}" aria-expanded="true" aria-controls="${excursion.id}">
//                 ${excursion.name} ${excursion.date}
//               </button>
//             </h2>
//           </div>
//           <div id="${excursion.id}" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
//             <div class="card-body">
//               <h1>Destination: ${excursion.destinationName}</h1>
//               <div id="excursionCrew">
//                   <h2>Crew Members</h2>
//                 <ul class="list-group list-group-flush">
//                   <li class="list-group-item">
//                   <p>${excursion.crewName}</p>
//                   <p>${excursion.crewPosition}</p></li>
//                 </ul>
//               </div>
//               <div id="excursionEnvironment">
//                 <h2>Environment: ${excursion.environmentId}</h2>
//                 <p>Latitude: ${excursion.latitude}</p>
//                 <p>Longitude: ${excursion.longitude}</p>
//               </div>
//               <div id ="excursionSpecies">
//                 <h2>Species Discovered:</h2>
//                 <ul>
//                 <li>Species1</li>
//                 <li>Species2</li>
//                 </ul>
//               </div>
//               <div id="excursionLogs">
//                 <h2>Logs:</h2>
//                 <p>Author: crewName</p>
//                 <p>Date: logDate</p>
//                 <p>Message: logMessage</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>`;
//       });
//       utilities.printToDom('excursions', domString);
//     })
//     .catch((error) => console.error(error));
// };

const getEachCrew = () => {
  excursionSmash.getAllExcursions()
    .then((excursions) => {
      let domString = '';
      console.error(excursions.length);
      for (let i = 0; i < excursions.length; i += 1) {
        console.error('In the LOOP...');
        // const excursionCrew = excursions[i].crew;
        const excursion = excursions[i];
        console.error(excursion);
        domString += `
        <ul class="list-group">
  <li class="list-group-item">${excursion.destinationName}</li>
  <li class="list-group-item">${excursion.environmentId}</li>
  <li class="list-group-item">${excursion.latitude}</li>
  <li class="list-group-item">${excursion.longitude}</li>
  <li class="list-group-item">${excursion.name}</li>
  <li class="list-group-item">${excursion.date}</li>
  <li class="list-group-item">${excursion.destinationId}</li>
</ul>
        `;
        // console.error('excursions', excursions[i], 'excursionCrew--ignore me', excursionCrew);
      }
      utilities.printToDom('excursions', domString);
    })
    .catch((error) => (error));
};

const excursionButton = () => {
  $('body').on('click', '#Excursions-button', getEachCrew);
};

export default { excursionButton };
