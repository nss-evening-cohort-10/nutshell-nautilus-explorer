import firebase from 'firebase/app';
import 'firebase/auth';
import 'bootstrap';
import '../styles/main.scss';
import authData from './helpers/data/authData';
import apiKeys from './helpers/apiKeys.json';
import auth from './components/auth/auth';
import logout from './components/navBar/navBar';
import excursion from './components/Excursions/excursions';
import excursionsLogs from './helpers/data/excursionsLogsData';


const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  auth.signMeIn();
  authData.checkLoginStatus();
  logout.logoutEvent();
  excursion.getCompleteExcursion();
  // excursion.getInfo();
  excursionsLogs.getExcursionsLogs();
};

init();
