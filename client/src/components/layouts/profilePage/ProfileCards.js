import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProfileCards extends Component {
    render() {
        return (
            <section id="profile">
                <div className="card text-center">
                    <div className="card-header">
                        <ul className="nav nav-tabs card-header-tabs">
                            <li className="nav-item">
                                <a className="nav-link active" href="#">Profile</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Card</a>
                            </li>
                        </ul>
                    </div>
                </div>

            </section>
        )
    }
}
export default ProfileCards;
