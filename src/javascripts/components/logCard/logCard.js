
const makeLogBoard = (logs) => {
  const domString = `
  <p>
  <a class="btn btn-primary" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
    Link with href
  </a>
  <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
    View Log
  </button>
</p>
<div class="collapse" id="collapseExample">
  <div class="card card-body log-body">
  <div class="d-flex flex-wrap>
    <p>${logs.crewId}</p>
    <p>${logs.date}</p>
    <p>${logs.destination}</p>
  </div>
  <p>${logs.message}</p>
  </div>
</div>
    `;
  return domString;
};


export default { makeLogBoard };
