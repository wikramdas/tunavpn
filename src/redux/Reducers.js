import {
    LOGIN, LOGOUT, UPDATE_USER, UPDATE_USER_TYPE, CHANGE_APP_THEME,
    CHANGE_APP_LANGUAGE
} from './Constants'
import { combineReducers, createStore } from "redux"
import light from "../themes/light.json"
const initialAuthState = {
    isLoggedIn: false,
    theme: light, language: {},
    userInfo: {}, userType: '',
};

const reducer = (state = initialAuthState, action) => {
    if (action.type === LOGIN) {
        return { ...state, isLoggedIn: true };
    }
    if (action.type === LOGOUT) {
        return { ...state, isLoggedIn: false };
    }
    if (action.type === UPDATE_USER) {
        return { ...state, userInfo: action.data };
    }
    if (action.type === UPDATE_USER_TYPE) {
        return { ...state, userType: action.data };
    }
    if (action.type === CHANGE_APP_THEME) {
        return { ...state, theme: action.data };
    }
    if (action.type === CHANGE_APP_LANGUAGE) {
        return { ...state, language: action.data };
    }
    return state;
};

const reducers = combineReducers({ reducer })
const store = createStore(reducers)
export default store
