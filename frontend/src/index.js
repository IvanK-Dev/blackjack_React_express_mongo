import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/modern-normalize/modern-normalize.css';
import './index.css';
import App from './components/App/App';
import { GameProvider } from './context/gameContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GameProvider>
    <App />
  </GameProvider>
);
