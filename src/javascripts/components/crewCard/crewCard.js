const makeCrewBoards = (crew) => {
  let domString = '';
  if (crew.id) {
    domString += `
    <div class="card text-center" style="width: 400px">
    <h5 class="title">${crew.name}</h5>
      <img src="${crew.profileImg}" class="cardImg" height="400px" width= "400px" alt="">
        <div class="card-body">
          <p class="deleteCrew">${crew.position}</p>
          <p class="deleteCrew">Favorite Quote: ${crew.quote}</p>
          <button type="button" class="btn btn-link deleteCrew" id="${crew.id}">Delete</button>
          <button type="button" class="btn btn-link editCrew" id="${crew.id}">Edit</button>
        </div>
    </div>
    `;
  }
  return domString;
};

export default { makeCrewBoards };
