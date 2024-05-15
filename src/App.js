import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import ListeFilms from "./Pages/ListeFilms";
import DetailsFilm from "./Pages/DetailsFilm";
import Reserve from "./Pages/Reserve";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Movies from "./Pages/movies";
import "./App.css";
import AdminListFilm from "./Pages/AdminListFilm";
import AddMovie from "./Pages/AddMovie";
import EditMovie from "./Pages/EditMovie";
import AdminListCategory from "./Pages/AdminListCategory";
import AddCategory from "./Pages/AddCategory";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/home"
            element={
              isLoggedIn ? (
                <ListeFilms setIsLoggedIn={setIsLoggedIn} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/details/:id"
            element={isLoggedIn ? <DetailsFilm /> : <Navigate to="/" />}
          />
          <Route
            path="/movies"
            element={isLoggedIn ? <Movies /> : <Navigate to="/" />}
          />

          <Route
            path="/reserve/:id"
            element={isLoggedIn ? <Reserve /> : <Navigate to="/" />}
          />
          <Route
            path="/AddMovie"
            element={isLoggedIn ? <AddMovie /> : <Navigate to="/" />}
          />
          <Route path="/edit-movie/:id" element={<EditMovie />} />
          <Route
            path="/AdminListFilm"
            element={isLoggedIn ? <AdminListFilm /> : <Navigate to="/" />}
          />
          <Route
            path="/AdminListCategory"
            element={isLoggedIn ? <AdminListCategory /> : <Navigate to="/" />}
          />
          <Route
            path="/AddCategory"
            element={isLoggedIn ? <AddCategory /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
