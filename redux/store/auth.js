import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

import * as actionTypes from '../actionType';
import {updateObject} from '../../lib/updateObject'


const exampleInitialState = {
    idusers: null,
    token: null,
    infoReg:null,
    infoRegErr:[],
    loginLoading: false,
    message: null,
    jumlahBelanja: 0,
    switchForm: false
}

// REDUCERS
export const auth = (state = exampleInitialState, action) => {
    switch (action.type) {
        case actionTypes.REGISTER_FAIL:
            return updateObject(state,{infoRegErr: action.payload});
        case actionTypes.REGISTER_SUCCESS:
            return updateObject(state,{infoReg: action.payload,infoRegErr:[]});
        case actionTypes.AUTHENTICATE:
            return updateObject(state,{idusers: action.idusers,token: action.payload});
        case actionTypes.LOGINLOADING:
            return updateObject(state,{loginLoading:action.loginLoading});
        case actionTypes.DEAUTHENTICATE:
            return updateObject(state,{token: null});
        case actionTypes.REAUTHENTICATE:
            return updateObject(state,{idusers: action.idusers,token: action.payload});
        case actionTypes.ERROR_AUTH:
            return updateObject(state,{message: action.message});
        case actionTypes.SWITCHFORM:
            return updateObject(state,{switchSignUp: action.switch});
        default:
            return state
    }
}

export const initializeStore = (initialState = exampleInitialState) => {
    return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
  }

