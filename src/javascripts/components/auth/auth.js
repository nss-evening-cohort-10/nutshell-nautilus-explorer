import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';

const signMeIn = () => {
  $('body').on('click', '#navbar-button-login', (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  });
};

export default { signMeIn };
