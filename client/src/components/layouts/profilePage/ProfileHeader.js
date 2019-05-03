import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {updateUser} from '../../../actions/authActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ProfileHeader extends Component {
    constructor() {
         super();
         this.state = {
             firstname:'',
             lastname:'',
             email: '',
             errors: {}
         }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
     };
 
     onSubmit(e) {
         e.preventDefault();
         const updateUserData = {
             id: this.state.id,
             firstname: this.state.firstname,
             lastname: this.state.lastname,
             email: this.state.email,
             password: this.state.password
         };
         this.props.updateUser(updateUserData, this.state.id);
         document.getElementById("notDisplay").style.display = "none";
         document.getElementById("notDisplay").reset();
         document.getElementById("display").style.display = "block";
     }

     onChange(e) {
         this.setState({
             [e.target.name]: e.target.value
         })
     }
 
 
    render() {
        const { isAuthenticated, user } = this.props.auth;
       if (!isAuthenticated) {
           return <Redirect to='/' />
        }
        this.state.id = user.id;
        function showForm() {
            document.getElementById("notDisplay").style.display = "block";
            document.getElementById("display").style.display = "none";
        }
        function hideForm() {
            document.getElementById("notDisplay").style.display = "none";
            document.getElementById("notDisplay").reset();
            document.getElementById("display").style.display = "block";
        }
        return (
            <section id="profileHeader">
                <div className="top">
                    <img src="/images/profile.png" alt="profile_image" className="profile_image"></img>
                    <div className="profile_info" >
                        <div id="display">
                            <p>{user.firstname} {user.lastname}</p> <br />
                            <input type="button" value="Edit profile" className='btn btn-light' onClick={showForm}></input>
                        </div>
                        <form id='notDisplay' onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>Firstname:</label>
                                <input type="text" className="form-control" name="firstname" defaultValue={user.firstname} onChange={this.onChange}></input>
                            </div>
                            <div className="form-group">
                                <label>Lastname</label>
                                <input type="text" className="form-control" name="lastname" defaultValue={user.lastname} onChange={this.onChange}></input>
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="text" className="form-control" name="email" defaultValue={user.email} onChange={this.onChange}></input>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" name="password" onChange={this.onChange}></input>
                            </div>

                            <button type="submit" className="btn btn-success">Save</button>
                            <button type="button" className="btn btn-danger" onClick={hideForm}>Cancel</button>
                        </form>
                    </div>
                </div>
            </section>
        )
    }
}

ProfileHeader.propTypes = {
    updateUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {updateUser})(ProfileHeader);
