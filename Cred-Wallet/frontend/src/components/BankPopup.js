import React from "react";
import "./styles/BankPopup.style.css";

const BankPopup = ({ bankLogos, onSelect, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content bank-popup-modal">
        <button className="close-btn" onClick={onClose}>
          x
        </button>
        <h2 className="bank-popup-title">Select Your Bank</h2>
        <div className="bank-popup-logos">
          {bankLogos.map((bank) => (
            <div
              key={bank.name}
              className="bank-popup-logo-item"
              onClick={() => onSelect(bank.name)}
            >
              <img
                src={process.env.PUBLIC_URL + "/" + bank.img}
                alt={bank.name}
                className="bank-popup-logo-img"
              />
              <span className="bank-popup-logo-label">{bank.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BankPopup;
