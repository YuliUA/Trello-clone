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

        let tempStyle = {
            marginTop: '150px'
        }
        const loggedInUser = (
            <Fragment>
                <Header/>
                <p style={tempStyle}>the user is logged in</p>
            </Fragment>
        )

        return(
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