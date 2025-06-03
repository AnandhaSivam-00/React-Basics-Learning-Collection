import { ORDER_PIZZA } from "../constants/pizzaConstants"

const initialState = {
    pizzaBase: 100
}

const pizzaReducer = (state = initialState, action) => {
    switch(action.type) {
        case ORDER_PIZZA:
            return {
                ...state,
                pizzaBase: state.pizzaBase - action.payload
            }
        default:
            return state;
    }
}

export default pizzaReducer;