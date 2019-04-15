import React, { Component } from 'react';
import {Link} from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { loginUser } from '../../actions/authActions';
import TextFieldGroup from '../../common/TextFieldGroup';

class LoginSSO extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.isAuthenticated) {
            this.props.history.push('/')
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors.errors });
        }
        // if (nextProps.auth.isAuthenticated) {
        //     this.props.history.push('/')
        // }
    }
    onSubmit(e) {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password,
        };
        this.props.loginUser(userData, this.props.history);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    render() {
        const {errors}=this.state
        return (
            <div className="mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4">Один вхід</h1>
                            <p className="lead text-secondary">
                            Використовуйте для входу мережу організації.
                            </p>
                            <form onSubmit={this.onSubmit}>
                            <TextFieldGroup
                                    placeholder="user@mail.com"
                                    label="Пошта"
                                    addText="(або ім’я користувача)"
                                    name="email"
                                    type="email"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                    error={errors.email}
                                />
                           
                            <button id="loginSSO" type="submit" class="btn btn-success btn-lg my-3" value="Увійти">Увійти</button>
                            <p><Link to="/login">Увійти без SSO</Link></p>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
export default LoginSSO;