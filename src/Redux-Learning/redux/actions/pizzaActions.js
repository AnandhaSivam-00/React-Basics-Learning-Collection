import { ORDER_PIZZA } from "../constants/pizzaConstants";

export const orderPizza = (quantity) => {
    return {
        type: ORDER_PIZZA,
        payload: quantity
    }
}