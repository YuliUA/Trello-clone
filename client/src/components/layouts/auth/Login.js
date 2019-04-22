import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../../actions/authActions';
import TextFieldGroup from '../../common/TextFieldGroup';

class Login extends Component {
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
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/')
        }
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
        // const { errors } = this.state;
        return (
            <section className="mt-5 section-wraper">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4">Увійти в <span>Trello</span></h1>
                            <p className="lead">
                                або <Link to='/register'>створити акаунт</Link>
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
                                />
                            <TextFieldGroup
                                    placeholder="••••••••••••"
                                    label="Пароль"
                                    name="password"
                                    type="password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                />
                            <button id="login" type="submit" className="btn btn-success btn-lg col-12 my-3" value="Увійти">Увійти</button>
                            <button id="loginGoogle" type="submit" className="btn btn-outline-secondary btn-lg col-12" value="Увійти з Google"><i className="fab fa-google"></i> Увійти з Google</button>
                            </form>
                            <p className="my-3">
                                <Link to="/login/sso">Увійти за допомогою SSO</Link>
                            </p>
                            <p className="mb-3">
                                <Link to="/forgot">Забули ваш пароль?</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

}
Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
  });

export default connect(mapStateToProps, { loginUser })(Login);