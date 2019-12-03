import firebase from 'firebase/app';
import 'firebase/auth';
import 'bootstrap';
import '../styles/main.scss';
import authData from './helpers/data/authData';
import apiKeys from './helpers/apiKeys.json';
import auth from './components/auth/auth';
import logout from './components/navBar/navBar';
import excursionSmash from './helpers/data/excursionSmash';
import excursions from './components/Excursions/excursions';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  auth.signMeIn();
  authData.checkLoginStatus();
  logout.logoutEvent();
  excursionSmash.getAllExcursions();
  excursions.excursionButton();
  excursions.getEachCrew();
};

init();
