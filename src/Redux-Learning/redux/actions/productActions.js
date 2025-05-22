import axios from "axios"
import { 
    PRODUCT_FETCH_ERROR, 
    PRODUCT_FETCH_REQUEST, 
    PRODUCT_FETCH_SUCCESS 
} from "../constants/productConstants"

export const productFetchRequest = () => {
    return {
        type: PRODUCT_FETCH_REQUEST
    }
}

export const productFetchSuccess = (data) => {
    return {
        type: PRODUCT_FETCH_SUCCESS,
        payload: data
    }
}

export const productFetchError = (error) => {
    return {
        type: PRODUCT_FETCH_ERROR,
        payload: error
    }
}

export const fetchProducts = () => {
    return (dispatch) => {
        dispatch(productFetchRequest());
        axios.get('https://fakestoreapi.com/products')
            .then(res => dispatch(productFetchSuccess(res.data)))
            .catch(error => dispatch(productFetchError(error.message)));
    }
}
