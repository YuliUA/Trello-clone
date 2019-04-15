import { combineReducers } from 'redux';

import errorReducer from './errorReducer';
import authReducer from './AuthReducer';
import listReducer from './listReducer';


export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    list: listReducer
})