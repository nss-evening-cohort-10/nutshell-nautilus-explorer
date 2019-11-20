// import $ from 'jquery';
import utilities from '../../helpers/utilities';


const makeLogBoard = () => {
  const domString = `
    <div class="card">
      <div class="card-title text-center card-title"><h5>Meet The Crew</h5></div>
      <img id="speciesImg" src="https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1266&q=80" class="card-img-top" alt="">
      <div class="card-body text-center">
      <a href="#" class="btn btn-danger btn-lg logHomeBtn">View</a>
      </div>
    </div>
    `;
  utilities.printToDom('logHome', domString);
};


export default { makeLogBoard };
