import {CREATE_LIST, CREATE_TASK_ITEM} from './types';

export const createList = (title) => (dispatch) =>{
    dispatch({
        type: CREATE_LIST,
        payload: title
    })
}

export const createTaskItem = (liastID, content) => dispatch =>{
    dispatch({
        type: CREATE_TASK_ITEM,
        payload: content
    })
}