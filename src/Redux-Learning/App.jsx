import React from 'react'
import { Provider } from 'react-redux'

// import store from './redux/store';
import store from './Redux-Toolkit/app/store';
import PizzaUI from './components/PizzaUI'
import ProductDisplay from './components/ProductDisplay';
import UserView from './Redux-Toolkit/features/users/UserView';

import './ReduxApp.module.css';

const App = () => {
  return (
    <Provider store={store}>
      {/* <PizzaUI /> */}
      {/* <ProductDisplay /> */}
      <UserView />
    </Provider>
  )
}

export default App