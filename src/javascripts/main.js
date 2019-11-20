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
import speciesBoard from './components/speciesBoard/speciesBoard';


const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  auth.signMeIn();
  authData.checkLoginStatus();
  crewNavbar.logoutEvent();
  getDestinations.destinationBuilderAll();
  getDestinations.destinationLoginStatus();
  homeCard.makeABoard();
  speciesBoard.makeSpeciesBoard();
};

init();
