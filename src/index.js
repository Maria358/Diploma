import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import './index.css';
import { AuthContextProvider } from './contexts/auth.context';
import { RoleContextProvider } from './contexts/role.context';

import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, setPersistence, browserSessionPersistence } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAi54jQCej-WMn-YWbZuKSehrYg6wZ054o",
  authDomain: "shop-cea6b.firebaseapp.com",
  projectId: "shop-cea6b",
  storageBucket: "shop-cea6b.appspot.com",
  messagingSenderId: "814040412829",
  appId: "1:814040412829:web:d5b4920fb0822eb8bf5a74"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export { auth, db };

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <RoleContextProvider>
        <Router>
          <App />
        </Router>
      </RoleContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
