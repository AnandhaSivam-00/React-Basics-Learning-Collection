import { ORDER_BURGER } from '../constants/burgerConstants';

const initialState = {
    burgerBase: 100
}

const burgerReducer = (state = initialState, action) => {
    switch(action.type) {
        case ORDER_BURGER:
            return {
                ...state,
                burgerBase: state.burgerBase - action.payload
            }
        default:
            return state;
    }
}

export default burgerReducer;