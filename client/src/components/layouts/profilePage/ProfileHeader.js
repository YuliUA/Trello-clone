import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { updateUser } from '../../../actions/authActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

class ProfileHeader extends Component {
    constructor() {
        super();
        this.state = {
            id: '',
            firstname: '',
            lastname: '',
            email: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    };

    componentWillReceiveProps(nextProps) {
        console.log('before')
        const req = this.props.location.pathname.replace('/profile/', '/profile/_id=');
        const ableEdit = this.props.location.pathname.includes(this.props.auth.user._id);
        if (this.state.firstname === '') {
            axios.get(`/api/${req}`)
                .then((res) => {
                    const {
                        firstname,
                        lastname,
                        bio,
                        email,
                        type,
                        _id,
                    } = res.data.pop();
                    this.setState({
                        firstname, lastname, bio, email, type, userId: _id, ableEdit, auth: this.props.auth,
                    });
                });
        }

        const userId = this.props.location.pathname.replace('/profile/', '');
       //this.props.getHistory(`user=${userId}&sort=-date`);

    }

    onChange(e) {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const fields = {};
        fields.userId = this.state.id;

        if (this.state.firstname !== '') fields.firstname = this.state.firstname;
        if (this.state.lastname !== '') fields.lastname = this.state.lastname;
        if (this.state.email !== '') fields.email = this.state.email;

        axios.put('/api/users', fields)
            .then((res) => {
                if (res.data === true) {
                    window.location.reload();
                }
            });


        this.props.updateUser(fields, this.state.id);
        document.getElementById("notDisplay").style.display = "none";
        document.getElementById("notDisplay").reset();
        document.getElementById("display").style.display = "block";
    }



    render() {
        const { isAuthenticated, user } = this.props.auth;
        console.log('hrrtr', window.location.href);
        console.log(user);
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
                                <input type="text" className="form-control" id="firstname" name="firstname" defaultValue={user.firstname} onChange={this.onChange}></input>
                            </div>
                            <div className="form-group">
                                <label>Lastname</label>
                                <input type="text" className="form-control" id='lastname' name="lastname" defaultValue={user.lastname} onChange={this.onChange}></input>
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="text" className="form-control" id="email" name="email" defaultValue={user.email} onChange={this.onChange}></input>
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

export default connect(mapStateToProps, { updateUser })(ProfileHeader);
