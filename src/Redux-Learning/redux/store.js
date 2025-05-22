import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";

import pizzaReducer from './reducers/pizzaReducer';
import burgerReducer from "./reducers/burgerReducer";
import productFetchReducer from "./reducers/productReducer";

const reducers = combineReducers({
    pizza: pizzaReducer,
    burger: burgerReducer,
    product: productFetchReducer
})

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

export default store;