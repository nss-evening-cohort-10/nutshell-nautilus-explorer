import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import utilities from '../../helpers/utilities';
import './homeCard.scss';
import crewData from '../../helpers/data/crewData';
import crewCard from '../crewCard/crewCard';

let currentId = 0;

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $('#crewSpace').removeClass('hide');
      $('.deleteCrew').removeClass('hide');
      $('.editCrew').removeClass('hide');
      // eslint-disable-next-line no-use-before-define
      $('body').on('click', '.editCrew', updateACrewMember);
      // eslint-disable-next-line no-use-before-define
      $('body').on('click', '.deleteCrew', deleteCrewBoard);
    } else {
      $('#crewSpace').addClass('hide');
      $('.deleteCrew').addClass('hide');
      $('.editCrew').addClass('hide');
    }
  });
};

const addCrew = (e) => {
  e.stopImmediatePropagation();
  const newCrewMember = {
    name: $('#crewName').val(),
    profileImg: $('#boardImg').val(),
    position: $('#crewPosition').val(),
    quote: $('#crewQuote').val(),
  };
  crewData.addCrew(newCrewMember)
    .then(() => {
      $('#crewModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      buildCrew();
    })
    .catch((error) => console.error(error));
};

const deleteCrewBoard = (e) => {
  e.preventDefault();
  // eslint-disable-next-line prefer-destructuring
  currentId = e.target.id.split('delete-')[1];
  crewData.deleteCrew(currentId)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      buildCrew();
    })
    .catch((error) => console.error(error));
};

const buildCrew = () => {
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
      $('#addNewBoardBtn').click(addCrew);
      checkLoginStatus();
    })
    .catch((error) => console.error(error));
};

const editCrewInfo = (e) => {
  e.stopImmediatePropagation();
  const updatedCrew = {
    name: $('#updateCrewName').val(),
    profileImg: $('#updateCrewImg').val(),
    position: $('#updateCrewPosition').val(),
    quote: $('#updateQuote').val(),
  };
  crewData.updateCrew(currentId, updatedCrew)
    .then(() => {
      $('#crewUpdateModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      buildCrew();
    })
    .catch((error) => console.error(error));
};

const populateUpdateModal = (crewMember) => {
  $('#updateCrewName').val(crewMember.name);
  $('#updateCrewImg').val(crewMember.profileImg);
  $('#updateCrewPosition').val(crewMember.position);
  $('#updateQuote').val(crewMember.quote);
};

const updateACrewMember = (e) => {
  // eslint-disable-next-line prefer-destructuring
  currentId = e.target.id.split('edit-')[1];
  crewData.getCrewById(currentId)
    .then((crewMember) => {
      populateUpdateModal(crewMember);
      $('#updateCrew').click(editCrewInfo);
    });
};

const makeABoard = () => {
  const domString = `
    <div class="card">
      <div class="card-title text-center card-title"><h5>Meet The Crew</h5></div>
      <img id="speciesImg" src="https://images.unsplash.com/photo-1470255121310-d2b5ed9b7d01?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" class="card-img-top" alt="">
      <div class="card-body text-center">
      <button id="crewHomeBtn" class="btn btn-danger btn-lg">View</button>
      </div>
    </div>
    `;
  utilities.printToDom('crewHome', domString);
  $('#crewHome').on('click', '#crewHomeBtn', buildCrew);
};


export default { makeABoard, buildCrew };
