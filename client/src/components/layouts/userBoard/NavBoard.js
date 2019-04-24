import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/authActions';

class NavBoard extends Component {
    constructor() {
        super();
        this.state = {
            opened: false
        }

        this.openDialog = this.openDialog.bind(this);
    }

    clickLogoutUser(e) {
        e.preventDefault();
        this.props.logoutUser();
    }

    openDialog(e) {
        e.preventDefault()
        this.setState({
            opened: !this.state.opened
        })

    }


    render() {
        const { opened } = this.state
        const { isAuthenticated, user } = this.props.auth;
        if (!isAuthenticated) {
            return <Redirect to='/' />
        }


        const loggedInHeader = (
            <div className="bg-light rounded position-absolute" style={{ top: '40px', right: '5px' }}>
                <div className="row">
                    <h6 className="dropdown-header mt-1 text-center col-9">{user.firstname + ' ' + user.lastname}</h6>
                    <button type="button" className="close" aria-label="Close" onClick={this.openDialog}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item px-2" href="#">Action</a>
                <a className="dropdown-item px-2" href="#">Another action</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item p-2" href="#" onClick={this.clickLogoutUser.bind(this)}>Вийти</a>
            </div>
        )

        return (
            <nav className="navbar fixed-top p-1 d-flex align-middle">
                <Link to="/boards" className="header-btn ml-0 "><span className="icon-house"></span></Link>
                <Link to="/boardsmenu" className="header-btn ml-0 px-1 "><span className="icon-trello"></span> Дошки</Link>
                <div className="btn-group ml-0">
                    <Link to="/boardsearch" className="header-btn mx-0 text-sm-center text-md-right px-1 search-btn">
                        <span className="icon-search"></span>
                    </Link>
                </div>
                <Link to="/boards" className="nav-logo m-auto">
                    <span className="logo-img"></span>
                    <span className="logo">Trello</span>
                </Link>
                <button className="header-btn mr-0 btn" title="Add new board"><span className="icon-plus"></span></button>
                <Link to="/notifications" className="header-btn mr-0 ml-1"><span className="icon-bell"></span></Link>
                <a href="#" className="member-btn ml-1" onClick={this.openDialog}>
                    <span className="member-initials" title="">{user.firstname[0] + user.lastname[0]}</span>
                </a>
                {(opened) ? loggedInHeader : null}
            </nav>

        )
    }
}

NavBoard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(NavBoard);