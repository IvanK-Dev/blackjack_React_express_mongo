import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/modern-normalize/modern-normalize.css';
import './index.css';
import App from './components/App/App';
import { GameProvider } from './context/gameContext';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GameProvider>
        <App />
      </GameProvider>
    </PersistGate>
  </Provider>
);
