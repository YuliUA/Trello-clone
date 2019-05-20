import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken'
import {GET_ERRORS, SET_CURRENT_USER} from './types';

export const registerUser = (userData, history) => (dispatch) => {
    axios.post('http://localhost:5000/api/users/register', userData)
      .then(res => history.push('/login'))//have to change path in App.js Route
      .catch((
        err) => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        });
      });
  };

export const loginUser = (userData, history) => (dispatch) => {
    axios.post('http://localhost:5000/api/users/login', userData) //have to change path in App.js Route
      .then(res => {
        console.log('HA', res)
        const{token} = res.data;
        setAuthToken(token);
        localStorage.setItem('jwtToken', token);//token time
        const decoded = jwtDecode(token);
        console.log( decoded )
        dispatch(setCurrentUser(decoded))
      })
      .catch((err) => {
        console.log( 'mistake', err )
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        });
      });
  };

  export const updateUser = (userData, history) => (dispatch) => {
    let id = userData.id;
    axios.put(`http://localhost:5000/api/users/${id}`, userData) 
    //axios.put(`http://localhost:5000/api/users/profile`, userData) 
        .then(res => {dispatch(setCurrentUser(userData))}) 
      .catch((err) => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        });
      });
  };

  export const setCurrentUser = decoded => ({
    type: SET_CURRENT_USER,
    payload: decoded
  })

  export const logoutUser = () => (dispatch) => {
    setAuthToken(false);
    dispatch(setCurrentUser({}))
  }