import firebase from 'firebase/app';
import 'firebase/auth';

const makeCrewBoards = (crew) => {
  const userSignedIn = firebase.auth().currentUser;
  let domString = '';
  if (userSignedIn) {
    domString += `
    <div class="card text-center" style="width: 400px">
    <h5 class="title">${crew.name}</h5>
      <img src="${crew.profileImg}" class="cardImg" height="400px" width= "400px" alt="">
        <div class="card-body">
          <p class="deleteCrew">${crew.position}</p>
          <p class="deleteCrew">Favorite Quote: ${crew.quote}</p>
          <button type="button" class="btn btn-link deleteCrew" id="delete-${crew.id}">Delete</button>
          <button type="button" class="btn btn-link editCrew" id="edit-${crew.id}" data-toggle="modal" data-target="#crewUpdateModal">Edit</button>
        </div>
    </div>
    `;
  } else {
    domString += `
    <div class="card text-center" style="width: 400px">
    <h5 class="title">${crew.name}</h5>
      <img src="${crew.profileImg}" class="cardImg" height="400px" width= "400px" alt="">
        <div class="card-body">
          <p class="deleteCrew">${crew.position}</p>
          <p class="deleteCrew">Favorite Quote: ${crew.quote}</p>
        </div>
    </div>`;
  }
  return domString;
};

export default { makeCrewBoards };
