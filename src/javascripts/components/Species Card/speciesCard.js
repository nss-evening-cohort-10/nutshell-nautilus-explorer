import firebase from 'firebase/app';
import 'firebase/auth';

const makeASpecies = (species) => {
  const userSignedIn = firebase.auth().currentUser;
  let domString = '';
  if (userSignedIn) {
    domString += `
    <div class="card" style="width: 460px">
    <img id="speciesImg" src="${species.image}" class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title">${species.name}</h5>
    <p class="card-text">${species.description}</p>
    <button class="btn btn-danger delete-species" id="delete-${species.id}">Delete Species</button>
    <button type="button" class="btn btn-info update-species-modal" data-toggle="modal" data-target="#updateSpeciesModal" id="update-${species.id}">Edit Species</button>
    </div>
    <div class="card-body">
    </div>
    </div>
    `;
  } else {
    domString += `
    <div class="card" style="width: 460px">
    <img id="speciesImg" src="${species.image}" class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title">${species.name}</h5>
    <p class="card-text">${species.description}</p>
    </div>
    <div class="card-body">
    </div>
    </div>
    `;
  }
  return domString;
};

export default { makeASpecies };
