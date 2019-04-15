import React, {Component, Fragment} from "react";
import {Header, Jumbotron, Collaborate} from '../index'

class Main extends Component{
    render(){
        return(
            <Fragment>
                <Header/>
                <Jumbotron/>
                <Collaborate/>
            </Fragment>
        )
    }
}

export default Main;