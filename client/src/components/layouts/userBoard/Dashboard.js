import React, {Component, Fragment} from 'react';
import {NavBoard, HomeBoard} from '../index';


class Dashboard extends Component{
    render(){
        return (
            <Fragment>
                <NavBoard/>
                <HomeBoard/>
            </Fragment>
        )
    }

}
export default Dashboard;