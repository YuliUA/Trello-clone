// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

// class Navbar extends Component {
//     render() {
//         return (
//             <nav className="navbar py-3 fixed-top bg-blue">
//                 <Link to='/' className="navbar-brand">
//                     <img src="/images/trello-logo-white.png" alt="trello-logo" />
//                 </Link>
//                 <div className="">
//                     <Link to="/login" className="btn  btn-link text-white">Увійти</Link>
//                     <Link to="/register" className="btn bg-white font-weight-bold text-primary ">Зареєструватися</Link>
//                 </div>
//             </nav>
//         )
//     }
// }

// export default Navbar;


import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Navbar extends Component {
    render() {
        const { isAuthenticated, user } = this.props.auth;
        
        const notLoggedInHeader = (
            <div className="">
                <Link to="/login" className="btn  btn-link text-white">Увійти</Link>
                <Link to="/register" className="btn bg-white font-weight-bold text-primary ">Зареєструватися</Link>
            </div>
        )

        const loggedInHeader = (
            <div>
                <Link to="/" className="btn bg-primary font-weight-bold text-light">{user.firstname}</Link>
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
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(Navbar);