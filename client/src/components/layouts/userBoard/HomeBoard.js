import React, { Component } from 'react';
import { TaskList, ActionButton, BoardHeader } from '../index';
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { sortTask, sortList } from '../../../actions/listActions'

class HomeBoard extends Component {
    handleDragEnd = (result) => {
        const { source, destination, type } = result
        if (!destination) return;
        if (type === "COLUMN") {
            this.props.sortList(
                source.index,
                destination.index
            )
        }
        this.props.sortTask(
            source.droppableId,
            destination.droppableId,
            source.index,
            destination.index
        )
    }

    render() {
        const { list } = this.props;
        return (
            <DragDropContext onDragEnd={this.handleDragEnd}>
                <section id="homeBoard" className="vh-100 bg-blue">
                    <div className="banner"></div>
                    <BoardHeader />
                    <Droppable droppableId="board" direction="horizontal" type="COLUMN">
                        {provided => (
                            <div className="px-4 row" ref={provided.innerRef}>
                                {list && list.map((el, index) => {
                                    return <TaskList
                                        key={el.id}
                                        listId={el.id}
                                        title={el.title}
                                        cards={el.cards}
                                        index={index} />
                                })}
                                {provided.placeholder}
                                <ActionButton list={list} />
                            </div>
                        )}
                    </Droppable>
                </section>
            </DragDropContext>
        )
    }
}

const mapStateToProps = (state) => ({
    list: state.list
})

export default connect(mapStateToProps, { sortTask, sortList })(HomeBoard);