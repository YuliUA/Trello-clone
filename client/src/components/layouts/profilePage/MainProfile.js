import React, { Component, Fragment } from "react";
import { Header } from '../index';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProfileCards from './ProfileCards';
import ProfileHeader from './ProfileHeader'
class Main extends Component {
    render() {
        return (
            <Fragment>
                <Header />
                <ProfileHeader />
                <ProfileCards />
            </Fragment>
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