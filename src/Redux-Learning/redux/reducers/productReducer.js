import { 
    PRODUCT_FETCH_ERROR, 
    PRODUCT_FETCH_REQUEST, 
    PRODUCT_FETCH_SUCCESS 
} from "../constants/productConstants";

const initialProductState = {
    loading: false,
    data: [],
    error: false
}

const productFetchReducer = (state = initialProductState, action) => {
    switch(action.type) {
        case PRODUCT_FETCH_REQUEST:
            return {
                ...state,
                loading: true
            }
        case PRODUCT_FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case PRODUCT_FETCH_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}

export default productFetchReducer;