import React from 'react'
import { Provider } from 'react-redux'

import store from './redux/store';
import PizzaUI from './components/PizzaUI'
import ProductDisplay from './components/ProductDisplay';

import './ReduxApp.module.css';

const App = () => {
  return (
    <Provider store={store}>
      {/* <PizzaUI /> */}
      <ProductDisplay />
    </Provider>
  )
}

export default App