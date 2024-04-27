import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListeFilms from "./Pages/ListeFilms";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ListeFilms />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
