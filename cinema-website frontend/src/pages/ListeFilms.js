import React, { useState, useEffect } from "react";
import axios from "axios";
import cinemaLogo from "../assets/cinema-logo.png";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./css/listeFilm.css";

function ListeFilms() {
  const [films, setFilms] = useState([]);
  const [currentFilmIndex, setCurrentFilmIndex] = useState(0);

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

  const handleNext = () => {
    setCurrentFilmIndex((prevIndex) =>
      prevIndex === films.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentFilmIndex((prevIndex) =>
      prevIndex === 0 ? films.length - 1 : prevIndex - 1
    );
  };

  if (films.length === 0) {
    return <div>Loading...</div>;
  }

  const currentFilm = films[currentFilmIndex];

  return (
    <div>
      <header className="header">
        <img src={cinemaLogo} alt="Logo" className="logo" />
        <div className="buttons">
          <Link to="/">Accueil</Link>
          <Link to="/films">Films</Link>
          <Link className="button" to="/login">
            Se connecter
          </Link>
        </div>
      </header>
      <div className="liste-films">
        <div className="center-content">
          <div className="film-item" style={{ position: "relative" }}>
            <Button
              variant="outline-primary"
              onClick={handlePrev}
              className="nav-button"
            >
              {"<"}
            </Button>
            <Link to={`/details/${currentFilm.id}`}>
              <img
                src={currentFilm.cover}
                alt={currentFilm.title}
                className="film-image"
              />
            </Link>
            <Button
              variant="outline-primary"
              onClick={handleNext}
              className="nav-button-droite"
            >
              {">"}
            </Button>
          </div>
        </div>
        <div className="movie-container">
          <h2 className="release">Nouvelle Édition :</h2>
          <div className="movie-list">
            {films.map((film, index) => (
              <Link
                key={film.id}
                to={`/details/${film.id}`}
                className="movie-item"
                onClick={() => setCurrentFilmIndex(index)}
              >
                <div className="movie-details">
                  <img
                    src={film.cover}
                    alt={film.title}
                    className="movie-poster"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListeFilms;
