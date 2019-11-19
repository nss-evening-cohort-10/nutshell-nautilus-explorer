const makeASpecies = (species) => {
  let domString = '';
  domString += `
    <div class="card" style="width: 18rem;">
    <img src="${species.image}" class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title">${species.name}</h5>
    <p class="card-text">${species.description}</p>
    </div>
    <div class="card-body">
    </div>
    </div>
    `;
  return domString;
};

export default { makeASpecies };
