import App from './App.jsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import BlocContextProvider from './Context/BlocContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <BlocContextProvider>
        <App />
      </BlocContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
