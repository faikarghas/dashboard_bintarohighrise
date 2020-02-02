import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

import * as actionTypes from './actionType';
import {updateObject} from '../lib/updateObject'


export const authState = {
    idusers: null,
    token: null,
    login_email_info: null,
    login_password_info: null,
}

// REDUCERS
export const auth = (state = authState, action) => {
    switch (action.type) {
        case actionTypes.AUTHENTICATE:
            return updateObject(state,{idusers: action.idusers,token: action.payload});
        case actionTypes.DEAUTHENTICATE:
            return updateObject(state,{token: null,idusers: null});
        case actionTypes.REAUTHENTICATE:
            return updateObject(state,{idusers: action.idusers,token: action.payload});
        case actionTypes.EMAIL_LOGIN_INFORMATION:
            return updateObject(state,{login_email_info: action.message});
        case actionTypes.PASSWORD_LOGIN_INFORMATION:
            return updateObject(state,{login_password_info: action.message});
        default:
            return state
    }
}

export const initializeStore = (initialState) => {
    return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}

