import React from 'react';

const TaskListItem = ({content}) =>{
    return (
        <div className="bg-light mx-2 mb-1 p-1 rounded card-body">
            {content}
        </div>
    )

}

export default TaskListItem;