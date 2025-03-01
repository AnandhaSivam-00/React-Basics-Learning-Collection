import React from 'react'
import { useMealsList } from './providers/MealsListProvider'

const MealsList = () => {
    const { mealsList } = useMealsList();
    return (
        <div>
            <h1>Meals List</h1>
            <div className=''>
                {mealsList.map((meal, index) => (
                    <h2 key={index}>{meal}</h2>
                ))}
            </div>
        </div>
    )
}

export default MealsList