// import React, {Component, Fragment} from "react";
// import {Header, Jumbotron, Collaborate} from '../index'

// class Main extends Component{
//     render(){
//         return(
//             <Fragment>
//                 <Header/>
//                 <Jumbotron/>
//                 <Collaborate/>
//             </Fragment>
//         )
//     }
// }

// export default Main;

import React, {Component, Fragment} from "react";
import {Header, Jumbotron, Collaborate} from '../index';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Main extends Component{
    render(){
        const { isAuthenticated } = this.props.auth;
        const guestUser = (
            <Fragment>
                <Header/>
                <Jumbotron/>
                <Collaborate/>
            </Fragment>
        )
        const loggedInUser = (
            <Fragment>
                <Header/>
                <p>the user is logged in</p>
            </Fragment>
        )

        return(
            // <Fragment>
            //     <Header/>
            //     <Jumbotron/>
            //     <Collaborate/>
            // </Fragment>

            <div>
                {isAuthenticated ? loggedInUser : guestUser}
            </div>
        )
    }
}

Main.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(Main);