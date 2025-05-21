import React from 'react'
import { Provider } from 'react-redux'

import store from './redux/store';
import PizzaUI from './components/PizzaUI'

import './ReduxApp.module.css';

const App = () => {
  return (
    <Provider store={store}>
      <PizzaUI />
    </Provider>
  )
}

export default App