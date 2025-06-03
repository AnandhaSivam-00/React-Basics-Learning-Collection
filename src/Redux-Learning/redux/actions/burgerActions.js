import { ORDER_BURGER } from "../constants/burgerConstants";

export const orderBurger = (quantity) => {
    return {
        type: ORDER_BURGER,
        payload: quantity
    }
}