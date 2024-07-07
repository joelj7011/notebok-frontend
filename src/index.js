import React from 'react';
import { createRoot } from 'react-dom/client'; // Update import statement
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthState from './Context/Auth/AuthState';
import AlertState from './Context/Alert/AlertState';
import NoteState from './Context/Note/NoteState';
import UserState from './Context/User/UserState';
import { Provider } from "react-redux";
import Store from './Readux/Store/Store';
import "./index.css";

const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={Store}>
        <AlertState>
          <AuthState>
            <UserState>
              <NoteState>
                <Routes>
                  <Route path="/*" element={<App />} />
                </Routes>
              </NoteState>
            </UserState>
          </AuthState>
        </AlertState>
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
);
