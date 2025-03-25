import React from 'react'
import { createContext, useState, useContext } from 'react'

const MealsListContext = createContext();

const meals = ["Pizza", "Burger", "Coke", "Fries", "Pasta", "Rice", "Bread", "Noodles", "Soup", "Salad"];

const MealsListProvider = ({ children }) => {
    const [mealsList, setMealsList] = useState(meals);

    return (
        <MealsListContext.Provider value={{mealsList}}>
            {children}
        </MealsListContext.Provider>
    )
};

export const useMealsList = () => useContext(MealsListContext);

export default MealsListProvider