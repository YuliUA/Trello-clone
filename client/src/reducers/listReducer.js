import {CREATE_LIST, CREATE_TASK_ITEM} from '../actions/types'

const initialState=[
        {
            title: "Task List 1",
            id: "tl1",
            cards: [
                {
                    id:1,
                    content: 'Task item #1'
                },
                {
                    id:2,
                    content: 'Task item #2'
                },
                {
                    id:3,
                    content: 'Task item #3'
                },
            ]
        },
        {
            title: "Task List 2",
            id: "tl2",
            cards: [
                {
                    id:4,
                    content: 'Task item #4'
                },
                {
                    id:5,
                    content: 'Task item #5'
                }              
            ]
        },
        {
            title: "Task List 3",
            id: "tl3",
            cards: []
        }
    
];

const listReducer = (state=initialState,action) =>{
    switch(action.type){
        case CREATE_LIST:
            console.log('in reduser')
            // const newList = {
            //     id: Math.random(),
            //     title: action.payload,
            //     cards:[]
            // }
        // return [...state, newList];
        return state

        case CREATE_TASK_ITEM:
            return state;
        default:
            return state;
    }
}

export default listReducer;