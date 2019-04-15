import React, { Component } from 'react';
import { Main } from './components/layouts';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route, Switch 
} from 'react-router-dom';
import {
  Register, Login, LoginSSO,ForgotPassword,
  // NavBoard, HomeBoard
} from './components/layouts/index';
import store from './store'

import setAuthToken from './utils/setAuthToken';
import jwtDecode from 'jwt-decode';
import { setCurrentUser, logoutUser } from './actions/authActions'


if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwtDecode(localStorage.token);
  store.dispatch(setCurrentUser(decoded));

  const currTime = Date.now()

  if(currTime> decoded.exp){
    store.dispatch(logoutUser());
    window.location.href='./login'
  }
}
// 'yulijahiryak/boards' example of route path for UserBoard 
// 'b/CXYhAVTL/filall-app' example of route to choosen user bord with {:id} & {:board_name} 

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={Main}/>
              <Route path="/register" component={Register}/>
              <Route exact path="/login" component={Login}/>
              <Route path="/login/sso" component={LoginSSO}/>
              <Route path="/forgot" component={ForgotPassword}/>
            </Switch>
            {/* <NavBoard />
            <HomeBoard /> */}
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
