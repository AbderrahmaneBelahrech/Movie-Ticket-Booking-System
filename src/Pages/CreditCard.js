import React, { useState } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import "./css/cardPayment.css";

const CreditCard = () => {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cvc, setCvc] = useState("");
  const [focus, setFocus] = useState("");

  const handleNumberChange = (e) => {
    const formattedNumber = e.target.value.slice(0, 16);
    setNumber(formattedNumber);
  };

  return (
    <>
      <div className="rccs__card rccs__card--unknown">
        <Cards
          number={number}
          name={name}
          expiry={`${month}/${year}`}
          cvc={cvc}
          focused={focus}
        />
      </div>

      <br />
      <form>
        <div className="row">
          <div className="col-sm-11">
            <label htmlFor="number" style={   {"color": "black"}}>Card Number</label>
            <input
              type="text"
              className="form-control"
              value={number}
              name="number"
              onChange={handleNumberChange}
              onFocus={(e) => setFocus(e.target.name)}
              maxLength={16}
            />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-sm-11">
            <label htmlFor="name" style={   {"color": "black"}}>Cardholder Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value.slice(0, 20))}
              onFocus={(e) => setFocus(e.target.name)}
              maxLength={20}
            />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-sm-6">
            <label htmlFor="expiry" style={   {"color": "black"}}>Expiration Date</label>
            <div className="d-flex">
              <select
                name="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                onFocus={(e) => setFocus(e.target.name)}
              >
                <option value="">Month</option>
                <option value="01">January</option>
                <option value="02">February</option>
                {/* Ajoutez les autres mois ici */}
              </select>
              <span style={{ margin: "0 5px" }}>/</span>
              <select
                name="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                onFocus={(e) => setFocus(e.target.name)}
              >
                <option value="">Year</option>
                <option value="2022">2024</option>
                <option value="2023">2025</option>

                {/* Ajoutez les autres années ici */}
              </select>
            </div>
          </div>
          <div className="col-sm-5">
            <label htmlFor="cvc" style={   {"color": "black"}}>CVV</label>
            <input
              type="tel"
              name="cvc"
              className="card"
              value={cvc}
              onChange={(e) => setCvc(e.target.value.slice(0, 3))}
              onFocus={(e) => setFocus(e.target.name)}
              maxLength={3}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default CreditCard;
