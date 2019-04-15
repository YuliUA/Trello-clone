import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Jumbotron extends Component {
    render() {
        return (
            <section id="hero" className="bg-blue pt-5">
                <div className="container  py-5 text-white">
                    <div className="row align-items-center text-md-left">
                        <div className="col-lg-5">
                            <h1>Trello забезпечує щільну співпрацю та дозволяє робити більше.</h1>
                            <p className="lead">
                                Дошки, списки та картки в Trello — це цікавий, зручний та продуктивний спосіб організувати проекти та розставити їх за пріоритетами.
                            </p>
                            <div>
                                <Link to="/register" className="btn btn-success btn-lg px-4 font-size-1">Зареєструйтеся. Це безкоштовно!</Link>
                            </div>
                        </div>
                        <div className="col-lg-6 offset-lg-1">
                            <img src="/images/hero-a.png" alt="hero-a" width="582" className="img-fluid"/>
                        </div>

                    </div>

                </div>
            </section>
        )
    }

}

export default Jumbotron;