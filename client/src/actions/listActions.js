import { CREATE_LIST, CREATE_TASK_ITEM, MOVE_LIST, MOVE_CARD } from './types';

export const createList = (title) => (dispatch) => {
    dispatch({
        type: CREATE_LIST,
        payload: title
    })
}

export const createTaskItem = (listID, content) => dispatch => {
    dispatch({
        type: CREATE_TASK_ITEM,
        payload: content
    })
}

//Move taskListItem
export const sortTask = (
    sourceListId,    //source.droppableID,
    destListId,      //destination.droppableID,
    oldCardIndex,   //source.index,
    newCardIndex   //destination.index,
) => dispatch => {
    if (
        oldCardIndex === newCardIndex ||
        sourceListId === destListId
    ) return;
    dispatch({
        type: MOVE_CARD,
        payload: {
            sourceListId,    //source.droppableID
            destListId,      //destination.droppableID
            oldCardIndex,   //source.index
            newCardIndex,   //destination.index
        }
    })

}

//move taskList
export const sortList = (
    oldListIndex,
    newListIndex
) => dispatch => {
    if (oldListIndex === newListIndex) return;
    dispatch({
        type: MOVE_LIST,
        payload: {
            oldListIndex,
            newListIndex
        }
    })
}

