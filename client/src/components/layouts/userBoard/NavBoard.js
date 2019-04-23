import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBoard extends Component{
    render(){
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
                <button  className="header-btn mr-0 btn" title="Add new board"><span className="icon-plus"></span></button>
                <Link to="/notifications" className="header-btn mr-0 ml-1"><span className="icon-bell"></span></Link>
                <Link to="/userdata" className="member-btn ml-1">
                    <span className="member-initials" title="">YH</span>
                </Link>
            </nav>

        )
    }
}

export default NavBoard;