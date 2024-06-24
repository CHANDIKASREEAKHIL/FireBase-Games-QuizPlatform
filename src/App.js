import React, { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./components/login";
import SignUp from "./components/register";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./components/profile";
import { useState } from "react";
import { auth } from "./components/firebase";
import Main from "./components/mainPage";
import Dashboard from "./components/dashboard/dashboard";
import TicTacToe from "./components/games/TicTacToe";
import Game2048 from "./components/games/game2048";

function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  });
  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route
                path="/"
                element={user ? <Dashboard /> : <Main />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/home" element={<Dashboard />} />
              <Route path="/tic-tac-toe" element={<TicTacToe />} />
              <Route path="/game2048" element={<Game2048 />} />
            </Routes>
            <ToastContainer />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
