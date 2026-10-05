import React, { useContext } from "react";
import { getCardType } from "../utils/cardType";
import cardContext from "../context/cards/cardContext";
import "./styles/CardItem.style.css";

const CardItem = ({ card, updateCard, handleAlert }) => {
  const { deleteCard } = useContext(cardContext);
  const type = getCardType(card.CardNumber);
  // Card color by issuer
  let cardColor;
  switch (type) {
    case "rupay":
      cardColor = "#e53935";
      break;
    case "visa":
      cardColor = "#1abc47";
      break;
    case "mastercard":
      cardColor = "#fbb034";
      break;
    case "amex":
      cardColor = "#016fd0";
      break;
    case "discover":
      cardColor = "#f76d1a";
      break;
    case "dinersclub":
      cardColor = "#2e2e2e";
      break;
    case "jcb":
      cardColor = "#007b5f";
      break;
    default:
      cardColor = "linear-gradient(25deg, #939393, #717171)";
  }
  return (
    <div className="card-item-container">
      <div className="card-item-flip" tabIndex={0}>
        <div
          className="card-item card-item-inner"
          style={{ background: cardColor }}
        >
          {/* Front Side */}
          <div className="card-face card-front">
            {/* Bank Logo and Name */}
            <div className="card-bank-name">
              {card.BankName && (
                <img
                  src={
                    card.BankName
                      ? `/bank/${card.BankName}.png`
                      : `/bank/nothing.png`
                  }
                  alt={card.BankName}
                  className="card-bank-logo"
                />
              )}
              {card.BankName}
            </div>
            {/* Chip Image */}
            <div src="/chip.png" alt="chip" className="card-chip-img"></div>
            {/* Issuer Logo */}
            <img
              src={type === "rupay" ? "/rupay.png" : `/type/${type}.png`}
              alt={type}
              className="card-type-img"
            />
            <div className="card-number">
              {card.CardNumber &&
                card.CardNumber.replace(/\D/g, "")
                  .replace(/(.{4})/g, "$1 ")
                  .trim()}
            </div>
            <div className="card-name">
              {card.CardHolderName && card.CardHolderName.toUpperCase()}
            </div>
            <div className="card-expiry">{card.ExpiryDate}</div>
          </div>
          {/* Back Side */}
          <div className="card-item-back">
            <div className="magnetic-stripe"></div>
            <div className="card-stripe"></div>
            <span className="card-cvc-value">{card.cvc || "•••"}</span>
            <img
              src={type === "rupay" ? "/rupay.png" : `/type/${type}.png`}
              alt={type}
              className="card-type-img-back"
            />
          </div>
        </div>
      </div>
      <div className="card-item-actions">
        <div
          className="delete-card-icon"
          onClick={() => {
            deleteCard(card._id);
            handleAlert && handleAlert("Deleted Successfully", "success");
          }}
        ></div>
        <div
          className="edit-card-icon"
          onClick={() => {
            updateCard(card);
          }}
        ></div>
      </div>
    </div>
  );
};

export default CardItem;
