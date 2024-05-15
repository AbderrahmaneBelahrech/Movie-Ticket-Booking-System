import React, { useState, useEffect } from "react";
import axios from "axios";
import cinemaLogo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import "./css/movies.css";

function ListeFilms(props) {
  const [films, setFilms] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredFilms, setFilteredFilms] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("All");

  const navigate = useNavigate();

  const handleLogout = () => {
    props.setIsLoggedIn(false);
    navigate("/");
  };

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await axios.get("http://localhost:8080/movies");
        console.log("response movies : ", response.data);
        setFilms(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des films :", error);
      }
    };

    fetchFilms();
  }, []);

  useEffect(() => {
    // Filter films based on search text
    const filtered = films.filter((film) =>
      film.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredFilms(filtered);
  }, [searchText, films]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleCategoryFilter = (category) => {
    setCurrentCategory(category);
    let filtered;
    if (category === "All") {
      filtered = films;
    } else {
      filtered = films.filter((film) =>
        film.categories.some((cat) => cat.name === category)
      );
    }
    setFilteredFilms(filtered);
  };

  return (
    <div>
      <header className="header">
        <img src={cinemaLogo} alt="Logo" className="logo" />
        <Form.Group className="search">
          <Form.Control
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={handleSearchChange}
          />
        </Form.Group>
        <div className="buttons">
          <Link to="/home">Home</Link>
          <Link to="/movies">Movies</Link>
          <Button variant="light" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>
      <div className="category-buttons">
        <Button
          variant="light"
          onClick={() => handleCategoryFilter("All")}
          active={currentCategory === "All"}
        >
          All
        </Button>
        <Button
          variant="light"
          onClick={() => handleCategoryFilter("Action")}
          active={currentCategory === "Action"}
        >
          Action
        </Button>
        <Button
          variant="light"
          onClick={() => handleCategoryFilter("Thriller")}
          active={currentCategory === "Thriller"}
        >
          Thriller
        </Button>
        <Button
          variant="light"
          onClick={() => handleCategoryFilter("Comedie")}
          active={currentCategory === "Comedy"}
        >
          Comedy
        </Button>
      </div>
      <div className="liste-films">
        <div className="films-container">
          {filteredFilms.map((film) => (
            <Link
              key={film.id}
              to={`/details/${film.id}`}
              className="film-link"
            >
              <div key={film.id} className="film-card">
                <img src={film.cover} alt={film.title} />
                <div className="film-title">{film.title}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ListeFilms;
