import React from 'react'
import ReactDOM from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import App from './App.jsx'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
<GoogleOAuthProvider clientId = "595297711071-cp0d5rgc72ljuqle29l41of9cj68q59g.apps.googleusercontent.com">
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  </ GoogleOAuthProvider >,
  document.getElementById('root')
)
