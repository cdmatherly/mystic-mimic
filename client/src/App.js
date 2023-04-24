import "./App.css";
import React, { useContext, useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Register from "./views/RegisterView";
import Login from "./views/LoginView";
import Dash from "./views/DashView";
import CreateACharacter from "./views/CreateACharacterView";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthContext from './context/AuthProvider'
import { CookiesProvider } from "react-cookie"; 

function App() {
  const { user } = useContext(AuthContext)

  return (
    <CookiesProvider>
        <Routes>
          <Route element={<Register />} path="/register" />
          <Route element={<Login />} path="/login" />
          <Route element={<Dash />} path="/dash" />
          <Route
            element={
              <ProtectedRoute user={user}>
                <CreateACharacter />
              </ProtectedRoute>
            }
            path="/cac"
          />
        </Routes>
    </CookiesProvider>
  );
}

export default App;
