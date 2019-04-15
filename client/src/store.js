import thunk from 'redux-thunk';
import rootReducer from './reducers';
import {createStore, compose, applyMiddleware}  from 'redux';

const middleware = [thunk]
const initilState = {};

const store = createStore (
    rootReducer,
    initilState,
    compose(
        applyMiddleware(...middleware),//redux-thunk
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()//devtools
    )

)
export default store;