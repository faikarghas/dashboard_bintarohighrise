import * as actionTypes from './actionType';
import Router from 'next/router';
import { setCookie, removeCookie } from '../lib/cookie';


// gets token from the api and stores it in the redux store and in cookie
export const authenticate = (email,password) => {
  return dispatch => {

    let pa = new Promise(function (resolve,reject) {

      fetch('https://api.bintarojayahighrise.com/api/authLogin',{
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          email,password
        })
      })
      .then(response => {
        return response.json()
      })
      .then(response => {
        if (response.success !== true) {
            response.code === 'email_wrong' ? dispatch({type: actionTypes.EMAIL_LOGIN_INFORMATION, message: response.data.message}) : null;

            response.code === 'pass_wrong' ? dispatch({type: actionTypes.PASSWORD_LOGIN_INFORMATION, message: response.data.message}) : null;

            setTimeout(() => {
              dispatch({type: actionTypes.EMAIL_LOGIN_INFORMATION, message:null });
              dispatch({type: actionTypes.PASSWORD_LOGIN_INFORMATION, message: null});
            }, 3000);

            resolve(response.success)
          } else {
            setCookie('token', response.token);
            setCookie('idusers', response.idusers);
            setCookie('relogin', true);
            // * kurang idusere dan token
            dispatch({type: actionTypes.AUTHENTICATE, payload: response.token, idusers: response.idusers});

            resolve(response.success)

            Router.push('/')
          }

      })
    })

    return pa

  }
}

// gets the token from the cookie and saves it in the store
export const reauthenticate = (token,idusers) => {
    return dispatch => {
      dispatch({type: actionTypes.AUTHENTICATE, payload: token, idusers: idusers});
      dispatch({type: actionTypes.REAUTHENTICATE, payload: token,idusers: idusers});
    };
  };

// removing the token
export const deauthenticate = () => {
    return (dispatch) => {
      // setCookie('relogin', false);
      removeCookie('token')
      removeCookie('idusers')
      Router.replace('/login');
      dispatch({type: actionTypes.DEAUTHENTICATE});
    };
};


