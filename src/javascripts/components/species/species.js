const makeASpecies = (species) => {
  let domString = '';
  domString += `
    <div class="card" style="width: 460px">
    <img id="speciesImg" src="${species.image}" class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title">${species.name}</h5>
    <p class="card-text">${species.description}</p>
    <button class="btn btn-danger delete-species" id="${species.id}">Delete Species</button>
    <button class="btn btn-link editCrew edit-species" id="${species.id}">Edit Species</button>
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
      Add Species
    </button>
    </div>
    <div class="card-body">
    </div>
    </div>
    `;
  return domString;
};

export default { makeASpecies };
