import React from 'react'
import MealsListProvider from './providers/MealsListProvider'
import MealsList from './MealsList'
import Counter from './Counter'

const Undrilling = () => {
  return (
    <div>
      <MealsListProvider>
          <MealsList />
          <Counter />
      </MealsListProvider>
    </div>
  )
}

export default Undrilling;