import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { DarkModeProvider } from './Components/DarkModeContext.jsx';

createRoot(document.getElementById('root')).render(
   <BrowserRouter>
      <DarkModeProvider>
         <App />
      </DarkModeProvider>
   </BrowserRouter>
);
