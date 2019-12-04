import firebase from 'firebase/app';
import 'firebase/auth';
import 'bootstrap';
import '../styles/main.scss';
import authData from './helpers/data/authData';
import apiKeys from './helpers/apiKeys.json';
import auth from './components/auth/auth';
import logout from './components/navBar/navBar';
import excursion from './components/Excursions/excursions';
// import environmentData from './helpers/data/environmentData';
// import speciesEnv from './helpers/data/speciesEnvironmentData';
import excData from './helpers/data/excursionsCrewData';
import excursionsLogsData from './helpers/data/excursionsLogsData';
// import smash from './helpers/data/excursionSmash';


const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  auth.signMeIn();
  authData.checkLoginStatus();
  logout.logoutEvent();
  excursion.showExcursions();
  // environmentData.getSpeciesByEnvironments();
  // speciesEnv.getAllSpeciesEnvironments();
  excData.getExcursionsCrewByExcursionId();
  excursionsLogsData.getExcursionsLogs();
  // smash.getExcursionsWithLogs();
};

init();
