import firebase from 'firebase/app';
import 'firebase/auth';
import 'bootstrap';
import '../styles/main.scss';
import authData from './helpers/data/authData';
import apiKeys from './helpers/apiKeys.json';
import auth from './components/auth/auth';
import crewNavbar from './components/navBar/navBar';
<<<<<<< HEAD
import homeCard from './components/homeCard/homeCard';
=======
>>>>>>> master
import speciesBoard from './components/speciesBoard/speciesBoard';


const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  auth.signMeIn();
  authData.checkLoginStatus();
  crewNavbar.logoutEvent();
  homeCard.makeABoard();
  speciesBoard.makeSpeciesBoard();
};

init();
