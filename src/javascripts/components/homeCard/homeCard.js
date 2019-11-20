import $ from 'jquery';
import utilities from '../../helpers/utilities';
import './homeCard.scss';
import crewData from '../../helpers/data/crewData';
import crewCard from '../crewCard/crewCard';

const addCrew = (e) => {
  e.stopImmediatePropagation();
  const newCrewMember = {
    name: $('#crewName').val(),
    boardImg: $('#boardImg').val(),
    profileImg: $('#crewPosition').val(),
    quote: $('#crewQuote').val(),
  };
  crewData.addCrew(newCrewMember)
    .then(() => {
      $('#exampleModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      buildCrew();
    })
    .catch((error) => console.error(error));
};


const deleteCrewBoard = (e) => {
  e.preventDefault();
  const crewId = e.target.id;
  crewData.deleteCrew(crewId)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      buildCrew();
    })
    .catch((error) => console.error(error));
};

const buildCrew = () => {
  $('#welcome').addClass('hide');
  $('#home').addClass('hide');
  $('#environments').addClass('hide');
  $('#species').addClass('hide');
  $('#log').addClass('hide');
  crewData.getCrew()
    .then((crew) => {
      let domString = '<h1 id="welcome" class="text-center">Meet the Crew</h1>';
      domString += `<div class="text-center" style="padding:50px"><button id="crewSpace" type="button" class="btn btn-outline-info btn-lg" data-toggle="modal" data-target="#crewModal">
      Add Crew
    </button>`;
      domString += '<div id="crew-section" class="container-fluid d-flex flex-wrap crewBoard">';
      crew.forEach((board) => {
        domString += crewCard.makeCrewBoards(board);
      });
      domString += '</div>';
      utilities.printToDom('crew', domString);
      $('#crewHome').addClass('hide');
      $('body').on('click', '.deleteCrew', deleteCrewBoard);
      $('#addNewBoardBtn').click(addCrew);
      // eslint-disable-next-line no-use-before-define
      $('#planes').on('click', '.edit', updateACrewMember);
    })
    .catch((error) => console.error(error));
};


const newCrewInfo = (crew) => {
  let domString = '';
  domString += buildCrew.makeCrewBoards(crew);
  utilities.printToDom('exampleModal', domString);
  $('#save').click(addCrew);
};

const editCrewInfo = (e) => {
  e.stopImmediatePropagation();
  const crewId = e.target.parentNode.id;
  const updatedCrew = {
    name: $('#updateCrewName').val(),
    profile: $('#updateCreImg').val(),
    position: $('#updateCrewPosition').val(),
    quote: $('#updateQuote').val(),
  };
  crewData.updateCrew(crewId, updatedCrew)
    .then(() => {
      $('#crewUpdateModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      buildCrew();
    })
    .catch((error) => console.error(error));
};

const updateACrewMember = (e) => {
  crewData.getPlaneById(e.target.id)
    .then((response) => {
      $('#crewUpdateModal').modal('show');
      response.id = e.target.id;
      newCrewInfo(response);
      $('#editCrew').click(editCrewInfo);
    });
};


const makeABoard = () => {
  const domString = `
    <div class="card">
      <div class="card-title text-center card-title"><h5>Meet The Crew</h5></div>
      <img id="speciesImg" src="https://images.unsplash.com/photo-1470255121310-d2b5ed9b7d01?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" class="card-img-top" alt="">
      <div class="card-body text-center">
      <a href="#" class="btn btn-danger btn-lg crewHomeBtn">View</a>
      </div>
    </div>
    `;
  utilities.printToDom('crewHome', domString);
  $('#crewHome').on('click', '.crewHomeBtn', buildCrew);
};


export default { makeABoard, buildCrew };
