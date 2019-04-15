import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../../actions/authActions';
import TextFieldGroup from '../../common/TextFieldGroup'

class Register extends Component {
    constructor() {
        super();
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            password2: '',
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
            this.setState({
                errors: nextProps.errors.errors
            })
        }
    }

    onSubmit(e) {
        e.preventDefault();
        const userData = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };
        this.props.registerUser(userData, this.props.history)
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const { errors } = this.state;
        return (
            <section className="mt-5 section-wraper">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4">Створити акаунт для <span>Trello</span></h1>
                            <span className="sign-in-account">або <Link to="/login">увійдіть до свого акаунту</Link></span>
                            <form onSubmit={this.onSubmit} className="my-3">
                                <TextFieldGroup
                                    placeholder="Ім’я"
                                    label="Ім’я"
                                    name="firstname"
                                    type="text"
                                    value={this.state.firstname}
                                    onChange={this.onChange}
                                    error={errors.firstname}
                                />
                                <TextFieldGroup
                                    placeholder="Прізвище"
                                    label="Прізвище"
                                    name="lastname"
                                    type="text"
                                    value={this.state.lastname}
                                    onChange={this.onChange}
                                    error={errors.lastname}
                                />
                                <TextFieldGroup
                                    placeholder="user@mail.com"
                                    label="Адреса електронної пошти"
                                    name="email"
                                    type="text"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                    error={errors.email}
                                />
                                <TextFieldGroup
                                    placeholder="••••••••••••"
                                    label="Пароль"
                                    name="password"
                                    type="password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    error={errors.password}
                                />
                                <TextFieldGroup
                                    placeholder="••••••••••••"
                                    label="Підтвердити пароль"
                                    name="password2"
                                    type="password"
                                    value={this.state.password2}
                                    onChange={this.onChange}
                                    error={errors.password2}
                                />
                                <div className="d-flex flex-column">
                                    <button id="signup" type="submit" className="btn btn-secondary btn-lg mb-3"
                                        value="Створити новий акаунт" >Створити новий акаунт</button>
                                    <button id="signupGoogle" type="submit" className="btn btn-outline-secondary btn-lg"
                                        value="Створити новий акаунт з Google"><i className="fab fa-google"></i> Створити новий акаунт з Google</button>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
  };

  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
  });

  export default connect(mapStateToProps, { registerUser })(Register);

