import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ProfileHeader extends Component {
    render() {
        function showForm() {
            document.getElementById("notDisplay").style.display = "block";
        }
        function hideForm() {
            document.getElementById("notDisplay").style.display = "none";
        }
        return (
            <section id="profileHeader">
                <div className="top">
                    <img src="/images/profile.png" alt="profile_image" className="profile_image"></img>
                    <div className="profile_info" >
                        <p>User name:</p> <br />
                        <input type="button" value="Edit profile" className='btn btn-light' onClick={showForm}></input>
                        <form id='notDisplay'>
                            <div className="form-group">
                                <label>Firstname</label>
                                <input type="text" className="form-control" placeholder="Firstname"></input>
                            </div>
                            <div className="form-group">
                                <label>Lastname</label>
                                <input type="text" className="form-control" placeholder="Lastname"></input>
                            </div>
                            <button type="button" className="btn btn-success">Save</button>
                            <button type="button" className="btn btn-danger" onClick={hideForm}>Cancel</button>
                        </form>
                    </div>
                </div>
            </section>
        )
    }
}
export default ProfileHeader;
