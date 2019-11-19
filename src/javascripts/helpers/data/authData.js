import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $('#navbar-button-login').addClass('hide');
      $('#navbar-button-logout').removeClass('hide');
      $('.edit-destination').removeClass('hide');
      $('.delete-destination').removeClass('hide');
    } else {
      $('#navbar-button-logout').addClass('hide');
      $('#navbar-button-login').removeClass('hide');
      $('.edit-destination').removeClass('hide');
      $('.delete-destination').removeClass('hide');
    }
  });
};

export default { checkLoginStatus };
