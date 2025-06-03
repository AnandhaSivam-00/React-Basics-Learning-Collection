import ReactDOM, { createRoot } from 'react-dom/client'
import React from 'react'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.module.css'
import App from './App.jsx'
import store from './Projects/Tenzies/redux/app/store.js';
// import App from './Redux-Learning/App';

import 'bootstrap/dist/css/bootstrap.min.css'

// import RouterApp from './RouterApp.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
)
