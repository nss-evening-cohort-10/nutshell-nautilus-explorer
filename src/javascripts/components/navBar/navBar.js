import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import './navBar.scss';

// const loginNavBar = $('#navbar-button-login');
// const logoutNavBar = $('#navbar-button-logout');

const logoutEvent = () => {
  $('body').on('click', '#navbar-button-logout', (e) => {
    e.preventDefault();
    firebase.auth().signOut()
      .then(() => {
        $('#navbar-button-login').removeClass('hide');
        $('#navbar-button-logout').addClass('hide');
      }).catch((err) => console.error('you still logged in', err));
  });
};

export default { logoutEvent };
