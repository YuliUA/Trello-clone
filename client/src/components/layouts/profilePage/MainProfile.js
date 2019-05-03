import React, { Component, Fragment } from "react";
import { Header } from '../index';
import ProfileCards from './ProfileCards';
import ProfileHeader from './ProfileHeader'
class MainProfile extends Component {
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

export default MainProfile;