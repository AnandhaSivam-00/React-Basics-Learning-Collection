import ReactDOM, { createRoot } from 'react-dom/client'
import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import './App.css'
import App from './App.jsx'

import 'bootstrap/dist/css/bootstrap.min.css'

// import RouterApp from './RouterApp.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
