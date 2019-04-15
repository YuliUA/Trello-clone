import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar py-3 fixed-top bg-blue">
                <Link to='/' className="navbar-brand">
                    <img src="/images/trello-logo-white.png" alt="trello-logo" />
                </Link>
                <div className="">
                    <Link to="/login" className="btn  btn-link text-white">Увійти</Link>
                    <Link to="/register" className="btn bg-white font-weight-bold text-primary ">Зареєструватися</Link>
                </div>
            </nav>
        )
    }
}

export default Navbar;