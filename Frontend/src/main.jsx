import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from './Context/Context.jsx'
import "./index.css"


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </AppProvider>
  </StrictMode>,
)
