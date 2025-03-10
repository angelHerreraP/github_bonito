import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from "./context/AuthContext";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>  {/* ✅ Envuelve la app con el proveedor de autenticación */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);

// Medición de rendimiento opcional
reportWebVitals();
