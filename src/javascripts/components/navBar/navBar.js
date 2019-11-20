import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import './navBar.scss';
import envis from '../environments/environments';
import homeCard from '../homeCard/homeCard';
import destinations from '../destination/destination';


const logoutEvent = () => {
  $('body').on('click', '#navbar-button-logout', (e) => {
    e.preventDefault();
    firebase.auth().signOut()
      .then(() => {
        // login.checkLoginStatus();
      }).catch((err) => console.error('you still logged in', err));
  });
};

$('#navBarBrand').on('click', '.crew', homeCard.buildCrew);
// $('#navBarBrand').on('click', '.species', printSpecies);
$('#navBarBrand').on('click', '.desitnations', destinations.destinationBuilderAll);
// $('#navBarBrand').on('click', '.logs', printLogs);
$('#navBarBrand').on('click', '.environments', envis.printEnvironments);

export default { logoutEvent };
