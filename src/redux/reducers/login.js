import { combineReducers } from 'redux';
import * as ActionTypes from '../actions/index';

const init = { loading: false, success: false, failed: false, data: null };

const login = (state = init, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN_LOADING:
            return { ...state, loading: action.data, success: false, failed: false, data: null };
        case ActionTypes.LOGIN_SUCCESS:
            return { ...state, loading: false, success: true, failed: false, data: action.data };
        case ActionTypes.LOGIN_FAILED:
            return { ...state, loading: false, success: false, failed: action.data, data: null };
        default:
            return { ...state };
    }
};

export default combineReducers({
    login
})