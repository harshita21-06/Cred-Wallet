import React from "react";
import { getCardType } from "../utils/cardType";
import "./styles/CardPreview.style.css";

const CardPreview = ({ number, name, expiry, cvc, focus, bankName }) => {
  const type = getCardType(number);

  // Format card number with spaces and mask untyped digits with •
  const formatCardNumber = (num) => {
    const clean = (num || "").replace(/\D/g, "");
    let masked = "";
    for (let i = 0; i < 16; i++) {
      if (i < clean.length) {
        masked += clean[i];
      } else {
        masked += "•";
      }
      if ((i + 1) % 4 === 0 && i !== 15) masked += " ";
    }
    return masked;
  };

  // Format expiry date as MM/YY and mask untyped digits with •
  const formatExpiry = (exp) => {
    const clean = (exp || "").replace(/\D/g, "");
    let masked = "";
    for (let i = 0; i < 4; i++) {
      if (i < clean.length) {
        masked += clean[i];
      } else {
        masked += "•";
      }
      if (i === 1) masked += "/";
    }
    return masked;
  };

  // Determine if issuer is fetched (not 'nothing')
  const hasIssuer = type && type !== "nothing";
  // Set background style: gradient if no issuer, else color by issuer
  let cardFrontStyle;
  if (!hasIssuer) {
    cardFrontStyle = { background: "linear-gradient(25deg, #999, #999)" };
  } else {
    switch (type) {
      case "rupay":
        cardFrontStyle = { background: "#e53935" };
        break;
      case "visa":
        cardFrontStyle = { background: "#1abc47" };
        break;
      case "mastercard":
        cardFrontStyle = { background: "#fbb034" };
        break;
      case "amex":
        cardFrontStyle = { background: "#016fd0" };
        break;
      case "discover":
        cardFrontStyle = { background: "#f76d1a" };
        break;
      case "dinersclub":
        cardFrontStyle = { background: "#2e2e2e" };
        break;
      case "jcb":
        cardFrontStyle = { background: "#007b5f" };
        break;
      default:
        cardFrontStyle = { background: "#999" };
    }
  }

  return (
    <div
      className={`card-preview${focus ? " focused" : ""}${
        focus === "cvc" ? " flip" : ""
      }`}
    >
      <div className="card-inner">
        {/* Front Side */}
        <div className="card-face card-front" style={cardFrontStyle}>
          {/* Bank Logo and Name */}
          <div className="card-bank-name">
            {bankName && (
              <img
                src={bankName ? `/bank/${bankName}.png` : `/bank/nothing.png`}
                alt={bankName}
                className="card-bank-logo"
              />
            )}
            {bankName || "BANK NAME"}
          </div>
          {/* Chip Image */}
          <div src="/chip.png" alt="chip" className="card-chip-img"></div>
          {/* Issuer Logo */}
          <img
            src={type === "rupay" ? "/rupay.png" : `/type/${type}.png`}
            alt={type}
            className="card-type-img"
          />
          {/* <div className="card-details"> */}
          <div className="card-number">{formatCardNumber(number)}</div>
          <div className="card-name">
            {name ? name.toUpperCase() : "YOUR NAME HERE"}
          </div>
          <div className="card-expiry">{formatExpiry(expiry)}</div>
          {/* </div> */}
        </div>
        {/* Back Side */}
        <div className="card-face card-back">
          <div className="magnetic-stripe"></div>
          <div className="card-stripe"></div>
          <div className="card-cvc-value">{cvc || "•••"}</div>
          <img
            src={type === "rupay" ? "/rupay.png" : `/type/${type}.png`}
            alt={type}
            className="card-type-img-back"
          />
        </div>
      </div>
    </div>
  );
};

export default CardPreview;
