import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import CreditCard from "./CreditCard";
import "./css/Reserve.css";
import { toast } from "react-toastify";

function Reserve() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [filmDetails, setFilmDetails] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [nombre, setNombre] = useState(1);
  const [prix, setPrix] = useState(50);
  const [typePlace, setTypePlace] = useState("standard");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [formValid, setFormValid] = useState(false);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [total, setTotal] = useState(prix);
  const [reservationSuccess, setReservationSuccess] = useState(false);

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

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const incrementerNombre = () => {
    if (nombre < 5) {
      setNombre(nombre + 1);
      setTotal((nombre + 1) * prix); // Recalculer le total
    }
  };

  const decrementerNombre = () => {
    if (nombre > 1) {
      // Modifier la condition pour ne pas descendre en dessous de 1
      setNombre(nombre - 1);
      setTotal((nombre - 1) * prix); // Recalculer le total
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const reservationDetails = {
      price: prix * nombre,
      numberOfTickets: nombre,
      projectionDate: date,
      projectionTime: time,
      seatType: typePlace,
    };

    const userId = localStorage.getItem("userId");
    const movieId = id;

    try {
      const response = await axios.post(
        `http://localhost:8080/api/reservations?userId=${userId}&movieId=${movieId}`,
        reservationDetails
      );

      if (response.status === 201) {
        setReservationSuccess(true);
        alert("Reservation effectuer avec success");
        navigate("/home");
      } else {
        console.error(
          "Erreur lors de l'envoi des informations de réservation."
        );
      }
    } catch (error) {
      console.error(
        "Erreur lors de l'envoi des informations de réservation :",
        error
      );
    }
  };

  const handleTypePlaceChange = (event) => {
    const selectedType = event.target.value;
    setTypePlace(selectedType);

    if (selectedType === "orchestre") {
      setPrix(50 * 1.2);
    } else if (selectedType === "vip") {
      setPrix(50 * 1.6);
    } else {
      setPrix(50);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };
  useEffect(() => {
    const isSecondFormValid =
      date !== "" && typePlace !== "" && time !== "" && total > 0;
    if (currentStep === 2 && isSecondFormValid) {
      setFormValid(true);
      console.log("form remplit ");
    } else if (currentStep === 3) {
      setFormValid(true);
    }
  }, [currentStep, date, time, typePlace, total, nom, prenom, email]);

  const renderFilmDetails = () => {
    if (currentStep === 1 && filmDetails) {
      const {
        title,
        description,
        releaseDate,
        director,
        genre,
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
        <div className="film-details">
          <img src={cover} alt={title} className="film-image" />
          <div style={{ marginTop: "100px", color: "aliceblue" }}>
            <h1 className="film-details-text title">Titre : {title}</h1>

            <h5 className="film-details-text details">
              Année de sortie : {formattedDate}
            </h5>
            <h5 className="film-details-text details">
              Réalisateur : {director}
            </h5>
            <div className="details-container">
              <h5 className="film-details-text details">
                Genres :&nbsp;
                {categories.map((category, index) => (
                  <span key={index}>
                    {category.name}
                    {index !== categories.length - 1 ? ", " : ""}
                  </span>
                ))}
              </h5>
            </div>
            <h5 className="film-details-text details">
              Durée : {formatDuration(duration)}{" "}
            </h5>
            <p className="film-details-text description">
              Description : {description}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderForm = () => {
    if (currentStep === 2) {
      const availableTimes = ["11:30", "14:30", "17:30"]; // Define available times
      const timeOptions = availableTimes.map((time, index) => (
        <option key={index} value={time}>
          {time}
        </option>
      ));

      return (
        <div className="session-form-container">
          <h2>Informations de paiement</h2>
          <form>
            <div>
              <label htmlFor="date" style={{ color: "black" }}>
                Date :
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </div>
            <div>
              <label htmlFor="time" style={{ color: "black" }}>
                Heure :
              </label>
              <select
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              >
                {timeOptions}
              </select>
            </div>
            <div>
              <label htmlFor="place" style={{ color: "black" }}>
                Place :
              </label>
              <select
                id="place"
                value={typePlace}
                onChange={handleTypePlaceChange} // Utilisation de la fonction handleTypePlaceChange
                required
              >
                <option value="standard">Standard</option>
                <option value="orchestre">Orchestre</option>
                <option value="vip">VIP</option>
              </select>
            </div>
            <h5 className="ticket" style={{ color: "black" }}>
              Tickets{" "}
            </h5>
            <div className="qty mt-5">
              <span className="minus bg-dark" onClick={decrementerNombre}>
                -
              </span>
              <input
                type="number"
                className="count"
                name="qty"
                value={nombre}
                min={1}
                max={5}
                readOnly
                onChange={(e) => setTotal(e.target.value)}
              />
              <span className="plus bg-dark" onClick={incrementerNombre}>
                +
              </span>
            </div>
          </form>
        </div>
      );
    } else if (currentStep === 3) {
      return (
        <div
          className="reservation-form-container"
          style={{
            margin: "30px auto 0",
            "max-width": "600px",
            height: "429px",
          }}
        >
          <CreditCard />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="film-details-container">
      <div className="progress-container">
        <div className={`step ${currentStep === 1 ? "active" : ""}`}>1</div>
        <div className={`step ${currentStep === 2 ? "active" : ""}`}>2</div>
        <div className={`step ${currentStep === 3 ? "active" : ""}`}>3</div>
      </div>

      {renderFilmDetails()}
      {renderForm()}

      <div className="navigation-buttons">
        <button
          className="btn btn-primary"
          onClick={handlePrevStep}
          disabled={currentStep === 1}
        >
          Previous
        </button>
        <button
          className="btn btn-primary"
          onClick={currentStep === 3 ? handleSubmit : handleNextStep}
          disabled={!formValid && currentStep !== 1}
        >
          {currentStep === 3 ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
}

export default Reserve;
