import { MOVE_CARD, MOVE_LIST } from '../actions/types'


const initialState = [
    {
        title: "Task List 1",
        id: "tl1",
        cards: [
            {
                id: 't1',
                content: 'Task item #1'
            },
            {
                id: 't2',
                content: 'Task item #2'
            },
            {
                id: 't3',
                content: 'Task item #3'
            },
        ]
    },
    {
        title: "Task List 2",
        id: "tl2",
        cards: [
            {
                id: 't4',
                content: 'Task item #4'
            },
            {
                id: 't5',
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

export default function (state = initialState, action) {
    switch (action.type) {
        case MOVE_CARD:
            const {
                oldCardIndex,
                newCardIndex,
                sourceListId,
                destListId
            } = action.payload;

            //move task in the same list
            if (sourceListId === destListId) {
                const [findSourceList] = state.filter(el => el.id === sourceListId);
                const listIndex = state.indexOf(findSourceList);
                const newCards = findSourceList.cards;
                const [removedCard] = newCards.splice(oldCardIndex, 1);
                newCards.splice(newCardIndex, 0, removedCard);

                state[listIndex].cards = newCards;
                return state;
            }
            //move task from one list to another
            const [findSourceList] = state.filter(el => el.id === sourceListId);
            const [findDestinationList] = state.filter(el => el.id === destListId);
            const sourceCards = findSourceList.cards;
            const destinationCards = findDestinationList.cards;
            const [removedCard] = sourceCards.splice(oldCardIndex, 1);
            destinationCards.splice(newCardIndex, 0, removedCard);

            const sourceIndex = state.indexOf(findSourceList);
            const destIndex = state.indexOf(findDestinationList);

            state[sourceIndex].cards = sourceCards;
            state[destIndex].cards = destinationCards;

            return state;

        case MOVE_LIST:
             const {oldListIndex, newListIndex} = action.payload;
             const [removed] = state.splice(oldListIndex,1);
             state.splice(newListIndex, 0, removed);
            return state;
        default:
            return state;
    }
}