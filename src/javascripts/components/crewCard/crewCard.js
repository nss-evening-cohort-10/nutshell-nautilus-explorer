const makeCrewBoards = (crew) => {
  let domString = '';
  if (crew.id) {
    domString += `
    <div class="card text-center" style="width: 400px">
    <h5 class="title">${crew.name}</h5>
      <img src="${crew.profileImg}" class="cardImg" height="400px" width= "400px" alt="">
        <div class="card-body">
          <button type="button" class="btn btn-primary deleteCrew" id="${crew.id}">Delete</button>
        </div>
    </div>
    `;
  }
  return domString;
};

export default { makeCrewBoards };
