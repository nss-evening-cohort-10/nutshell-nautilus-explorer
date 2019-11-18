import $ from 'jquery';
import 'bootstrap';
import '../styles/main.scss';
import firebase from 'firebase/app';
import 'firebase/auth';
import authData from './helpers/data/authData';
import apiKeys from './helpers/apiKeys.json';
import auth from './components/auth/auth';
import crewNavbar from './components/navBar/navBar';


const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  $('body').on('click', '#navbar-button-login', auth.signMeIn);
  authData.checkLoginStatus();
  auth.signMeIn();
  crewNavbar.logoutEvent();
};

init();
