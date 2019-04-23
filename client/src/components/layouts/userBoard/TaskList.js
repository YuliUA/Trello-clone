import React from 'react';
import { TaskListItem, ActionButton, CardMenuBtn } from '../index';

const TaskList = ({ title, cards }) => {
    return (
        <div className="card-board task-box h-100 mb-2" name="taskList">
            <div className="row px-3">
                <p className="font-weight-bold m-2">{title}</p>
                <CardMenuBtn />
            </div>
            {cards.map(el => <TaskListItem key={el.id} content={el.content} />)}
            <ActionButton cards={cards} />
        </div>
    )
}

export default TaskList;