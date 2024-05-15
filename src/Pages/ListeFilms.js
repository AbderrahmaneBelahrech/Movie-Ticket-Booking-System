import React, { useState, useEffect } from "react";
import axios from "axios";
import cinemaLogo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./css/listeFilm.css";

function ListeFilms(props) {
  const [films, setFilms] = useState([]);
  const [currentFilmIndex, setCurrentFilmIndex] = useState(0);

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
          <Link to="/home">Home</Link>
          <Link to="/movies">Movies</Link>
          <Button className="logout" variant="light" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>
      <div className="liste-films">
        <div className="center-content">
          <div className="film-item" style={{ position: "relative" }}>
            <Button
              variant="outline-primary"
              onClick={handlePrev}
              className="nav-button"
              style={{
                position: "absolute",
                top: "50%",
                right: "41vh",
                transform: "translateY(-50%)",
                padding: "8px",
                border: "none",
                background: "transparent",
                color: "whitesmoke",
                cursor: "pointer",
              }}
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
              style={{
                position: "absolute",
                top: "50%",
                left: "41vh",
                transform: "translateY(-50%)",
                padding: "8px",
                border: "none",
                background: "transparent",
                color: "whitesmoke",
                cursor: "pointer",
              }}
            >
              {">"}
            </Button>
          </div>
        </div>
        <h2 className="newRel">New Édition :</h2>
        <div className="movie-container">
          <div className="movie-list">
            {films.slice(0, 6).map((film, index) => (
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
        <h2 className="newRel">Action</h2>
        <div className="movie-container">
          <div className="movie-list">
            {films
              .filter((film) =>
                film.categories.some((cat) => cat.name === "Action")
              )
              .slice(0, 6)
              .map((film, index) => (
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
        <h2 className="newRel">Comedie</h2>
        <div className="movie-container">
          <div className="movie-list">
            {films
              .filter((film) =>
                film.categories.some((cat) => cat.name === "Comedie")
              )
              .slice(0, 6)
              .map((film, index) => (
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
