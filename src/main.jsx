import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx'

import 'bootstrap/dist/css/bootstrap.min.css'

import RouterApp from './RouterApp.jsx'

createRoot(document.getElementById('root')).render( <RouterApp /> )
