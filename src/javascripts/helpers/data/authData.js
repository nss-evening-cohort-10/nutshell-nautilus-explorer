import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import homeCard from '../../components/homeCard/homeCard';

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $('#navbar-button-login').addClass('hide');
      $('#navbar-button-logout').removeClass('hide');
      homeCard.buildCrew(user.uid);
    } else {
      $('#navbar-button-logout').addClass('hide');
      $('#navbar-button-login').removeClass('hide');
    }
  });
};

export default { checkLoginStatus };
