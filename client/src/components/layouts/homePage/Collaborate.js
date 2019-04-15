import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CollaborateCard } from '../index';

class Collaborate extends Component {
    render() {
        return (
            <section id="collaborate">
                <div className="container py-5 pb-md-0">
                    <div className="row align-items-center">
                        <div className="col-md-7 order-md-12">
                            <div className="board">
                                <div className="header">
                                    <h3>Завдання команди</h3>
                                </div>
                                <div className="lists container row">
                                    <div className="list col-md-5 m-1 p-1 rounded">
                                        <div className="list-content p-1">
                                            <h5>У роботі</h5>
                                            <CollaborateCard
                                                label="label label-blue"
                                                task="Зустріч із клієнтом"
                                                user1="user user-1" />
                                            <CollaborateCard
                                                label="label label-red"
                                                task=" Сплануйте вебінар "
                                                user1="user user-2"
                                                user2="user user-1" />
                                            <CollaborateCard
                                                label="label label-purple"
                                                task="Електронні розсилки"
                                                user1="user user-3" />
                                            <div className="add-card"> Додати картку... </div>
                                        </div>
                                    </div>
                                    <div className="list col-md-5 m-1 p-1 rounded">
                                        <div className="list-content p-1">
                                            <h5>Готово</h5>
                                            <CollaborateCard
                                                label="label label-red"
                                                task="Зустріч із клієнтом"
                                                user1="user user-3"
                                                user2="user user-2" />
                                            <CollaborateCard
                                                label="label label-purple"
                                                task=" Сплануйте вебінар "
                                                user1="user user-2" />
                                            <div className="add-card"> Додати картку... </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5 px-5 order-md-1 text-center text-md-left">
                            <h3>Працюйте з будь-якою командою</h3>
                            <p className="mt-0 mb-1">Для роботи, стороннього проекту та навіть родини — Trello допомагає вам залишатися організованими.</p>
                            <p>
                                <Link to='/register' className="btn btn-secondary px-3">Почати робити →</Link>
                            </p>
                        </div>
                    </div>
                </div>

            </section>
        )
    }
}
export default Collaborate;