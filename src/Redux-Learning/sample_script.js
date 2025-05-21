const redux = require('redux');
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;

// Defining the string constant
const PLACE_ORDER = 'PLACE_ORDER';
const INCREMENT_SHOP = 'INCREMENT_SHOP';

// Creating the action (Action Creator)
const placeOrder = () => {
    return {
        type: PLACE_ORDER,
        shop_name: 'Little Thinker shop'
    }
}

const incrementShop = () => {
    return {
        type: INCREMENT_SHOP,
        payload: 20
    }
}

// Initial state of the object
const initialOrderState = {
    total_order: 0
}
const initialShopState = {
    total_shop: 10
}

// Reducer
const orderReducer = (state = initialOrderState, action) => {
    switch(action.type) {
        case PLACE_ORDER:
            return {
                total_order: state.total_order + 1
            }
        default:
            return state;
    }
}
const shopReducer = (state = initialShopState, action) => {
    switch(action.type) {
        case INCREMENT_SHOP:
            return {
                total_shop: state.total_shop + 1
            }
        default:
            return state;
    }
}

// Combining the reducers
const reducers = combineReducers({
    order: orderReducer,
    shop: shopReducer
})

// Creating a global store.
const store = createStore(reducers);
console.log(store.getState()); // Getting the current state of the application

// Register the listener - printing the state whenever the changes are made on the global state
const unsubscribe = store.subscribe(() => console.log('Updated state is ', store.getState()));

// Allows the state to be updated via dispatch(action)
store.dispatch(placeOrder());
store.dispatch(placeOrder());
store.dispatch(incrementShop());
store.dispatch(incrementShop());

// Stop the listener
unsubscribe();