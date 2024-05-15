import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import cinemaLogo from "../assets/logo.png";
import axios from "axios";
import "./css/detailsFilm.css";
import { Button } from "react-bootstrap";

function DetailsFilm(props) {
  const { id } = useParams();
  const [filmDetails, setFilmDetails] = useState(null);

  const navigate = useNavigate(); // Utilisation de useNavigate pour la redirection

  const handleLogout = () => {
    props.setIsLoggedIn(false);
    navigate("/");
  };

  useEffect(() => {
    const fetchFilmDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/movies/${id}`);
        setFilmDetails(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des détails du film :",
          error
        );
        setFilmDetails(null);
      }
    };

    fetchFilmDetails();
  }, [id]);

  if (!filmDetails) {
    return <p>Chargement des détails du film...</p>;
  }

  const {
    title,
    description,
    releaseDate,
    director,
    duration,
    cover,
    trailer,
  } = filmDetails;

  // Extraire la partie "YYYY-MM-DD" de la date de sortie
  const formattedDate = releaseDate.split(" ")[0];

  const categories = filmDetails.categories;

  const formatDuration = (totalHours) => {
    const hours = Math.floor(totalHours);
    const minutes = Math.round((totalHours - hours) * 60); // Convertir la partie décimale en minutes
    return `${hours} h ${minutes} min`;
  };

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

      <div className="film-detailss">
        <h1 className="film-details-textt title">Titre : {title}</h1>
        <div className="content-containerr">
          <div className="image-containerr">
            <img src={cover} alt={title} className="film-imagee" />
          </div>
          <div className="video-container">
            <iframe
              width="760"
              height="415"
              src={trailer}
              title="Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="details-containerr">
          <h5 className="film-details-textt details">
            Année de sortie : {formattedDate}
          </h5>
          <h5 className="film-details-textt details">
            Réalisateur : {director}
          </h5>
          <div className="details-container">
            <h5 className="film-details-textt details">
              Genres :&nbsp;
              {categories.map((category, index) => (
                <span key={index}>
                  {category.name}
                  {index !== categories.length - 1 ? ", " : ""}
                </span>
              ))}
            </h5>
          </div>

          <h5 className="film-details-textt details">
            Durée : {formatDuration(duration)}{" "}
            {/* Passer la durée totale en heures décimales */}
          </h5>

          <div className="desc">
            <p className="film-details-textt description">
              Description : {description}
            </p>
            <Link className="reservebtn" to={`/reserve/${id}`}>
              Réserver
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsFilm;
