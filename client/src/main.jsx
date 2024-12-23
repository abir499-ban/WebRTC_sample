import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { SocketContextProvider } from './context/Socketcontext.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SocketContextProvider>
      <App />
    </SocketContextProvider>
  </StrictMode>,
)
