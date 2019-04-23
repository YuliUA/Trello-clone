import React, {Component} from 'react';
import {TaskList, ActionButton, BoardHeader} from '../index';
import {connect} from 'react-redux';


class HomeBoard extends Component {
    render() {
        const {list} = this.props;
        return (
            <section id="homeBoard" className="vh-100 bg-blue">
                <div className="banner"></div>
                <BoardHeader />
                <div className="px-4 row">
                    {list && list.map(el => <TaskList key={el.id} title={el.title} cards={el.cards}/>)}
                    <ActionButton list={list}/>
                </div>
               
            </section>
        )
    }
}

const mapStateToProps = (state) =>({
    list: state.list
})
export default connect(mapStateToProps )(HomeBoard);