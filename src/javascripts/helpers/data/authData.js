import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $('#navbar-buttin-login').addClass('hide');
      $('#navbar-button-logout').removeClass('hide');
    } else {
      $('#navbar-button-logout').addClass('hide');
      $('#navbar-buttin-login').removeClass('hide');
    }
  });
};

export default { checkLoginStatus };
