import $ from 'jquery';
import utilities from '../../helpers/utilities';
import crewData from '../../helpers/data/crewData';
import crewCard from '../crewCard/crewCard';


const deleteCrewBoard = (e) => {
  e.preventDefault();
  const boardId = $('.crewBoard')[0].id;
  const crewId = e.target.id;
  crewData.deleteCrew(crewId)
    .then(() => {
      console.error(boardId);
      // eslint-disable-next-line no-use-before-define
      buildCrew(boardId);
    })
    .catch((error) => console.error(error));
};


const buildCrew = () => {
  crewData.getCrew()
    .then((crew) => {
      let domString = '<div id="boardSection" class="d-flex flex-wrap crewBoard">';
      crew.forEach((board) => {
        domString += crewCard.makeCrewBoards(board);
      });
      domString += '</div>';
      utilities.printToDom('crew', domString);
      $('#crewHome').addClass('hide');
      $('#crewHome').on('click', '.deleteBoard', deleteCrewBoard);
    })
    .catch((error) => console.error(error));
};


const makeABoard = () => {
  const domString = `
    <div class="card" style="width: 18rem;">
      <h5 class="card-title">Meet The Crew</h5>
      <img src="http://www.20kride.com/content/after/20kafter_update01_252_sized.jpg" class="card-img-top" alt="">
      <div class="card-body">
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <a href="#" class="btn btn-primary crewHomeBtn">Go There</a>
      </div>
    </div>
    `;
  utilities.printToDom('crewHome', domString);
  $('#crewHome').on('click', '.crewHomeBtn', buildCrew);
};


export default { makeABoard, buildCrew };
