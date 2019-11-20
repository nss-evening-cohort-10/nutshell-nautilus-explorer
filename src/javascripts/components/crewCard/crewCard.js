const makeCrewBoards = (crew) => {
  let domString = '';
  if (crew.id) {
    domString += `
    <div class="card boardCard">
    <h5 class="title">${crew.name}</h5>
      <img src="${crew.profileImg}" class="cardImg" height="400px" width= "400px" alt="">
        <div class="card-body">
          <button href="#" class="btn btn-primary deleteBoard" id="board-${crew.id}">Delete</button>
        </div>
    </div>
    `;
  }
  return domString;
};

export default { makeCrewBoards };
