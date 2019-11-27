import firebase from 'firebase/app';
import 'firebase/auth';
import 'bootstrap';
import '../styles/main.scss';
import authData from './helpers/data/authData';
import apiKeys from './helpers/apiKeys.json';
import auth from './components/auth/auth';
import crewNavbar from './components/navBar/navBar';
import getDestinations from './components/destination/destination';
import homeCard from './components/homeCard/homeCard';
import species from './components/Species/species';
import log from './components/logCard/logCard';


const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  auth.signMeIn();
  authData.checkLoginStatus();
  crewNavbar.logoutEvent();
  getDestinations.destinationLoginStatus();
  getDestinations.destinationBuilderHome();
  homeCard.makeABoard();
  species.makeSpeciesBoard();
  log.makeLogBoard();
};

init();
