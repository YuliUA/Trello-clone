import React,{Component} from 'react';
import {Navbar} from '../index';

class Header extends Component{
    render(){
        return(
            <header className="bg-blue height">
                <Navbar />
            </header>
        )
    }
}

export default Header;