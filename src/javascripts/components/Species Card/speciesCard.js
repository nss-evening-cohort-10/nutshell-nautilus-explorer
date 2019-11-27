const makeASpecies = (species) => {
  let domString = '';
  domString += `
    <div class="card" style="width: 460px">
    <img src="${species.image}" class="card-img-top speciesImg" alt="...">
    <div class="card-body">
    <h5 class="card-title">${species.name}</h5>
    <p class="card-text">${species.description}</p>
    <button class="btn btn-danger delete-species" id="delete-${species.id}">Delete Species</button>
    <button type="button" class="btn btn-info edit-species" data-toggle="modal" data-target="#edSpecies" id="update-${species.id}">Edit Species</button>
    </div>
    <div class="card-body">
    </div>
    </div>
    `;
  return domString;
};

export default { makeASpecies };
