import './css/style.css';  
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';  
import App from './App'; 
import { UserProvider } from './contexts/UserContext';
import PingComponent from './components/PingComponent';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
        <PingComponent />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
