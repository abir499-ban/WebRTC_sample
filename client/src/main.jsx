import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SocketContextProvider } from './context/Socketcontext.jsx'
import {BrowserRouter} from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SocketContextProvider>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </SocketContextProvider>
  </StrictMode>,
)
