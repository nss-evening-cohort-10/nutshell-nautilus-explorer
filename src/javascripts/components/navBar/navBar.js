import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import './navBar.scss';
import login from '../../helpers/data/authData';
import envis from '../environments/environments';
import homeCard from '../homeCard/homeCard';

// const loginNavBar = $('#navbar-button-login');
// const logoutNavBar = $('#navbar-button-logout');

// const uid = firebase.auth().currentUser;

const logoutEvent = () => {
  $('body').on('click', '#navbar-button-logout', (e) => {
    e.preventDefault();
    firebase.auth().signOut()
      .then(() => {
        login.checkLoginStatus();
      }).catch((err) => console.error('you still logged in', err));
  });
};

$('#navBarBrand').on('click', '.crew', homeCard.buildCrew);
// $('#navBarBrand').on('click', '.species', printSpecies);
// $('#navBarBrand').on('click', '.destinations', printDestinations);
// $('#navBarBrand').on('click', '.logs', printLogs);
$('#navBarBrand').on('click', '.environments', envis.printEnvironments);

export default { logoutEvent };
