import React from 'react'
import { useMealsList } from './providers/MealsListProvider'

const Counter = () => {
    const { mealsList } = useMealsList();
    return (
      <div>
        <p>{mealsList.length}</p>
      </div>
    )
}

export default Counter