import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/authActions';

class Navbar extends Component {
    clickLogoutUser(e) {
        e.preventDefault();
        this.props.logoutUser();
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;
        
        const notLoggedInHeader = (
            <div>
                <Link to="/login" className="btn  btn-link text-white">Увійти</Link>
                <Link to="/register" className="btn bg-white font-weight-bold text-primary ">Зареєструватися</Link>
            </div>
        )

        const loggedInHeader = (
            <div className="loggedInButtons">
                <Link to="/" className="btn bg-primary font-weight-bold text-light beforeArrow">{user.firstname}</Link>

                <div class="dropdown">
                    <button class="btn btn-default dropdownArrow" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    </button>
                    <ul class="dropdown-menu dropdownPosition" aria-labelledby="dropdownMenu1">
                        <li><a className="text-primary dropdown-item" onClick={this.clickLogoutUser.bind(this)}>Вийти</a></li>
                    </ul>
                </div>
            </div>
        )

        return (
            <nav className="navbar py-3 fixed-top bg-blue">
                <Link to='/' className="navbar-brand">
                    <img src="/images/trello-logo-white.png" alt="trello-logo" />
                </Link>
                {isAuthenticated ? loggedInHeader : notLoggedInHeader}
            </nav>
        )
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {logoutUser})(Navbar);