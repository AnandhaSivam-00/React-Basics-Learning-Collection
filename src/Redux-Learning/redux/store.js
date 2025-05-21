import { createStore, combineReducers, applyMiddleware } from "redux";

import pizzaReducer from './reducers/pizzaReducer';
import burgerReducer from "./reducers/burgerReducer";

const reducers = combineReducers({
    pizza: pizzaReducer,
    burger: burgerReducer
})

const store = createStore(reducers);

export default store;