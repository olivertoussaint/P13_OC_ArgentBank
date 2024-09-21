import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import { fetchUserProfile } from './redux/slices/userSlice';

// Vérification si l'utilisateur est authentifié et a cliqué sur "Remember Me"
const token = localStorage.getItem('token'); // Vérifie le token dans localStorage
if (token) {
  store.dispatch(fetchUserProfile(token)); // Récupérer le profil utilisateur uniquement si le token est présent
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
