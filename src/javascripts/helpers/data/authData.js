import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import dashboard from '../../components/welcomeDashboard/welcome';
import welcomeData from './welcomeData';
import getDestinations from '../../components/destination/destination';
import homeCard from '../../components/homeCard/homeCard';
import species from '../../components/Species/species';
import log from '../../components/logs/logs';
import environment from '../../components/environments/environments';


const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $('#navbar-button-login').addClass('hide');
      $('#navbar-button-logout').removeClass('hide');
    } else {
      $('#navbar-button-logout').addClass('hide');
      $('#navbar-button-login').removeClass('hide');
    }
    dashboard.buildTheDashboard(welcomeData.getBoards());
    getDestinations.destinationBuilderAll();
    homeCard.buildCrew();
    species.buildSpecies();
    log.printLogs();
    environment.printEnvironments();
  });
};

const onload = () => {
  $('#destinations').addClass('hide');
  $('#species').addClass('hide');
  $('#log').addClass('hide');
  $('#environments').addClass('hide');
  $('#crew').addClass('hide');
  $('#excursions').addClass('hide');
};

window.onload = onload;

export default { checkLoginStatus };
