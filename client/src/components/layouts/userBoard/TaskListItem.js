import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const TaskListItem = ({ content, cardId, index }) => {
    return (
        <Draggable draggableId={cardId} index={index}>
            {(provided) => (
                <div ref={provided.innerRef}
                     {...provided.draggableProps}
                     {...provided.dragHandleProps}>
                    <div className="bg-light mx-2 mb-1 p-1 rounded card-body">
                        {content}
                    </div>
                    {provided.placeholder}
                </div>
            )}
        </Draggable>
    )
}

export default TaskListItem;