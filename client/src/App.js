import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route, Switch 
} from 'react-router-dom';
import {
  Register, Login, LoginSSO,ForgotPassword, MainProfile, Dashboard, Main
  // NavBoard, HomeBoard
} from './components/layouts/index';
import store from './store'


import setAuthToken from './utils/setAuthToken';
import jwtDecode from 'jwt-decode';
import { setCurrentUser, logoutUser } from './actions/authActions';


if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwtDecode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  const currTime = Date.now() / 1000;
  if (currTime > decoded.exp) {
    store.dispatch(logoutUser());
  }
}
// 'yulijahiryak/boards' example of route path for UserBoard 
// 'b/CXYhAVTL/finall-app' example of route to choosen user bord with {:id} & {:board_name} 

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
              <Route exact path='/boards' component={Dashboard} />
              <Route path="/:id" component={MainProfile}/>
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
