import firebase from 'firebase/app';
import 'firebase/auth';
import 'bootstrap';
import '../styles/main.scss';
import authData from './helpers/data/authData';
import apiKeys from './helpers/apiKeys.json';
import auth from './components/auth/auth';
import logout from './components/navBar/navBar';
import excursionSmashData from './helpers/data/excursionSmash';
// import destinationData from './helpers/data/destinationData';


const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  auth.signMeIn();
  authData.checkLoginStatus();
  logout.logoutEvent();
  excursionSmashData.getCompleteExcursions();
  // destinationData.getDestinationByEnvironment();
};

init();
