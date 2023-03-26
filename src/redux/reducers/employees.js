import { combineReducers } from 'redux';
import * as ActionTypes from '../actions/employees';

const init = { loading: false, success: false, failed: false, data: null };

const employees = (state = init, action) => {
    switch (action.type) {
        case ActionTypes.EMPLOYEE_DATA_LOADING:
            return { ...state, loading: action.data, success: false, failed: false, data: null };
        case ActionTypes.EMPLOYEE_DATA_SUCCESS:
            return { ...state, loading: false, success: true, failed: false, data: action.data };
        case ActionTypes.EMPLOYEE_DATA_FAILED:
            return { ...state, loading: false, success: false, failed: action.data, data: null };
        default:
            return { ...state };
    }
};

export default combineReducers({
    employees
})