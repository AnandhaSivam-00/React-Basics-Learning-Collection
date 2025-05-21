const redux = require('redux');
const thunk = require('redux-thunk').thunk;
const axios = require('axios');

const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;

// Constants
const FETCH_REQUEST = 'FETCH_REQUEST';
const FETCH_SUCCESS = 'FETCH_SUCCESS';
const FETCH_ERROR = 'FETCH_ERROR';

// State
const initialState = {
    loading: false,
    products: [],
    error: false
}

// Actions
const fetchRequest = () => {
    return {
        type: FETCH_REQUEST
    }
}
const fetchSuccess = (products) => {
    return {
        type: FETCH_SUCCESS,
        payload: products
    }
}
const fetchError = () => {
    return {
        type: FETCH_ERROR
    }
}

// Thunk action creator
const fetchProducts = () => {
    return (dispatch) => {
        dispatch(fetchRequest())
        axios.get('https://fakestoreapi.com/products')
            .then(res => {
                dispatch(fetchSuccess(res.data));
                // console.log(res.data);
            })
            .catch(error => {
                dispatch(fetchError());
            })
    }
}

// Reducers
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload
            }
        case FETCH_ERROR:
            return {
                ...state,
                loading: false,
                error: true
            }
        default:
            return state;
    }
}

// Creating store
const store = createStore(reducer, applyMiddleware(thunk));
store.subscribe(() => console.log(store.getState()));
store.dispatch(fetchProducts());
