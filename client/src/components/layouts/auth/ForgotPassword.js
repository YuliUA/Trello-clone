import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom';
import TextFieldGroup from '../../common/TextFieldGroup'

class ForgotPassword extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            errors: {}
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    onSubmit(e) {
        e.preventDegault();
        //TODO: check email and send password
    }

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const { errors } = this.state;
        return (
            <Fragment>
                <nav className="navbar d-flex">
                    <Link to="/" className="btn btn-outline-secondary">Домашня сторінка</Link>
                    <Link to="/login" className="btn btn-outline-secondary ml-auto">Увійти</Link> 
                    <Link to="/register" className="btn btn-outline-secondary ml-1">Зареєструватися</Link> 
                </nav>
                <section className="section-wraper my-5">
                    <div className="container">
                    <h1>Скинути ваш пароль <span>Trello</span></h1>
                    <p > Введіть вашу адресу електронної пошти і ми відправимо вам посилання для скидання паролю. </p>
                    <form onSubmit={this.onSubmit}>
                        <TextFieldGroup
                            label="Адреса електронної пошти"
                            type="text"
                            name="email"
                            value={this.state.email}
                            onChange={this.onChange}
                            error={errors.email}
                        />
                        <button type="submit" className="btn btn-lg btn-success" value="Відправити">Відправити</button>
                    </form>
                    <p class="text-secondary mt-3"> Скажемо по секрету: пароль Trello має складатися щонайменше з 8 символів і 
                        <em> не </em>  
                         вимагає використання цифр або великих літер. Якщо ви пригадали необхідні дані,  
                         <Link to="/login" className="text-secondary"> <u>спробуйте увійти ще раз</u></Link>. </p>
                    </div>
                </section>


            </Fragment>
        )
    }

}

export default ForgotPassword;