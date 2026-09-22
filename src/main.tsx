import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { EstateDataProvider } from './context/EstateDataContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <EstateDataProvider>
      <App />
    </EstateDataProvider>
  </StrictMode>,
);
