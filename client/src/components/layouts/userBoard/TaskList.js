import React, { Component } from 'react';
import { TaskListItem, ActionButton, CardMenuBtn } from '../index';
import { Droppable, Draggable } from 'react-beautiful-dnd';

class TaskList extends Component {
    render() {
        const { cards, title, listId, index } = this.props;
        
        return (
            <Draggable draggableId={listId} index={index}>
                {provided => (
                    <div className="card-board task-box h-100 mb-2"
                         ref={provided.innerRef}
                         {...provided.draggableProps}>
                        <div className="row px-3" {...provided.dragHandleProps}>
                            <p className="font-weight-bold m-2" style={{height:'100%'}}>{title}</p>
                            <CardMenuBtn />
                        </div>
                        <Droppable droppableId={listId}>
                            {provided => (
                                <div ref={provided.innerRef} className = "task-box-space">
                                    {cards && cards.map((el, index) => {
                                            return <TaskListItem
                                                key={el.id}
                                                cardId={el.id}
                                                index={index}
                                                content={el.content} />
                                        })}
                                    {provided.placeholder}
                                </div>
                            ) }
                        </Droppable>
                        <ActionButton cards={cards} />
                    </div>)}
            </Draggable>
        )
    }
}

export default TaskList;