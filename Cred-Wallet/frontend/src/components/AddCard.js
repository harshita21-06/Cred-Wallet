import React, { useContext, useState } from "react";
import cardContext from "../context/cards/cardContext";
import CardPreview from "./CardPreview";
import "./styles/AddCard.style.css";
import { getCardType } from "../utils/cardType";
import BankPopup from "./BankPopup";

const bankLogos = [
  { name: "ALLAHABAD BANK", img: "bank/ALLAHABAD BANK.png" },
  { name: "ANDHRA BANK", img: "bank/ANDHRA BANK.png" },
  { name: "AXIS BANK", img: "bank/AXIS BANK.png" },
  { name: "STATE BANK OF INDIA", img: "bank/STATE BANK OF INDIA.png" },
  { name: "BANK OF BARODA", img: "bank/BANK OF BARODA.png" },
  { name: "UCO BANK", img: "bank/UCO BANK.png" },
  { name: "UNION BANK OF INDIA", img: "bank/UNION BANK OF INDIA.png" },
  { name: "BANK OF INDIA", img: "bank/BANK OF INDIA.png" },
  { name: "BANDHAN BANK LIMITED", img: "bank/BANDHAN BANK LIMITED.png" },
  { name: "CANARA BANK", img: "bank/CANARA BANK.png" },
  { name: "GRAMIN VIKASH BANK", img: "bank/GRAMIN VIKASH BANK.png" },
  { name: "CORPORATION BANK", img: "bank/CORPORATION BANK.png" },
  { name: "INDIAN BANK", img: "bank/INDIAN BANK.png" },
  { name: "INDIAN OVERSEAS BANK", img: "bank/INDIAN OVERSEAS BANK.png" },
  {
    name: "ORIENTAL BANK OF COMMERCE",
    img: "bank/ORIENTAL BANK OF COMMERCE.png",
  },
  { name: "PUNJAB AND SIND BANK", img: "bank/PUNJAB AND SIND BANK.png" },
  { name: "PUNJAB NATIONAL BANK", img: "bank/PUNJAB NATIONAL BANK.png" },
  { name: "RESERVE BANK OF INDIA", img: "bank/RESERVE BANK OF INDIA.png" },
  { name: "SOUTH INDIAN BANK", img: "bank/SOUTH INDIAN BANK.png" },
  { name: "UNITED BANK OF INDIA", img: "bank/UNITED BANK OF INDIA.png" },
  { name: "CENTRAL BANK OF INDIA", img: "bank/CENTRAL BANK OF INDIA.png" },
  { name: "VIJAYA BANK", img: "bank/VIJAYA BANK.png" },
  { name: "DENA BANK", img: "bank/DENA BANK.png" },
  {
    name: "BHARATIYA MAHILA BANK LIMITED",
    img: "bank/BHARATIYA MAHILA BANK LIMITED.png",
  },
  { name: "FEDERAL BANK LTD", img: "bank/FEDERAL BANK LTD.png" },
  { name: "HDFC BANK LTD", img: "bank/HDFC BANK LTD.png" },
  { name: "ICICI BANK LTD", img: "bank/ICICI BANK LTD.png" },
  { name: "IDBI BANK LTD", img: "bank/IDBI BANK LTD.png" },
  { name: "PAYTM BANK", img: "bank/PAYTM BANK.png" },
  { name: "FINO PAYMENT BANK", img: "bank/FINO PAYMENT BANK.png" },
  { name: "INDUSIND BANK LTD", img: "bank/INDUSIND BANK LTD.png" },
  { name: "KARNATAKA BANK LTD", img: "bank/KARNATAKA BANK LTD.png" },
  { name: "KOTAK MAHINDRA BANK", img: "bank/KOTAK MAHINDRA BANK.png" },
  { name: "YES BANK LTD", img: "bank/YES BANK LTD.png" },
  { name: "SYNDICATE BANK", img: "bank/SYNDICATE BANK.png" },
  { name: "SBM Bank India", img: "bank/SBM Bank India.png" },
  { name: "BANK OF MAHARASHTRA", img: "bank/BANK OF MAHARASHTRA.png" },
];

const AddCard = (props) => {
  const context = useContext(cardContext);
  const { addCard } = context;

  const [card, setCard] = useState({
    BankName: "",
    CardNumber: "",
    CardHolderName: "",
    ExpiryDate: "",
    cvc: "",
    focus: "",
  });

  const [formError, setFormError] = useState("");
  const [showBankModal, setShowBankModal] = useState(false);

  const handleBankSelect = (bankName) => {
    setCard({ ...card, BankName: bankName });
    setShowBankModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isCardNumberValid || !isExpiryValid || !isCvcValid || !card.BankName) {
      setFormError("Please fill all fields correctly and select a bank.");
      return;
    }
    addCard(
      card.BankName,
      card.CardNumber,
      card.CardHolderName,
      card.ExpiryDate,
      card.cvc
    );
    setCard({
      BankName: "",
      CardNumber: "",
      CardHolderName: "",
      ExpiryDate: "",
      cvc: "",
      focus: "",
    });
    setFormError("");
    props.handleAlert("Cards Added Successfully", "success");
  };

  const onChange = (e) => {
    setCard({ ...card, [e.target.name]: e.target.value });
  };
  const handleInputFocus = (evt) => {
    setCard({ ...card, focus: evt.target.name });
  };

  const isCardNumberValid =
    card.CardNumber.length >= 13 && card.CardNumber.length <= 16;
  const isExpiryValid = /^\d{2}\/\d{2}$/.test(card.ExpiryDate);
  const isCvcValid = card.cvc.length >= 3 && card.cvc.length <= 4;

  const isDisabled = !isCardNumberValid || !isExpiryValid || !isCvcValid;

  return (
    <div className="addcard-container">
      <h1 className="addcard-title">Add Card</h1>
      <div className="addcard-inner">
        <div className="addcard-card-preview">
          <CardPreview
            cvc={card.cvc}
            expiry={card.ExpiryDate}
            name={card.CardHolderName}
            number={card.CardNumber}
            focus={card.focus}
            bankName={card.BankName}
          />
        </div>
        <form onSubmit={handleSubmit} className="addcard-form">
          <div className="signup-name">
            <button
              type="button"
              className="enabled-submit-button"
              onClick={() => setShowBankModal(true)}
              style={{ marginBottom: 10, marginLeft: 10, width: "100%" }}
            >
              {card.BankName ? (
                <div className="select-bank">
                  <img
                    src={
                      bankLogos.find((b) => b.name === card.BankName)?.img ||
                      "bank/nothing.png"
                    }
                    alt={card.BankName}
                    // style={{ width: 32, height: 32, marginRight: 8 }}
                    className="select-bank-logo"
                  />
                  <span>{card.BankName}</span>
                </div>
              ) : (
                "Select Bank"
              )}
            </button>
          </div>
          <div className="signup-name">
            <input
              type="text"
              className="form-name-input"
              id="CardNumber"
              name="CardNumber"
              maxLength={19}
              value={card.CardNumber.replace(/(\d{4})(?=\d)/g, "$1 ")}
              onChange={(e) => {
                // Remove all non-digits and spaces, then format with spaces every 4 digits
                let value = e.target.value.replace(/\D/g, "").slice(0, 16);
                // Only check issuer after every 4 digits
                if (value.length % 4 === 0 && value.length >= 4) {
                  getCardType(value);
                }
                setCard({ ...card, CardNumber: value });
              }}
              onFocus={handleInputFocus}
              placeholder=""
              autoComplete="off"
              required
            />
            <label htmlFor="CardNumber" className="form-name">
              Card Number{" "}
              {isCardNumberValid ? (
                <span className="addcard-valid">✔</span>
              ) : null}
            </label>
          </div>
          <div className="signup-name">
            <input
              type="text"
              className="form-name-input"
              id="CardHolderName"
              name="CardHolderName"
              maxLength={20}
              value={card.CardHolderName}
              onChange={(e) => {
                // Only allow a-z and A-Z, max 20 chars
                const value = e.target.value
                  .replace(/[^a-zA-Z ]/g, "")
                  .slice(0, 20);
                onChange({
                  target: { name: "CardHolderName", value },
                });
              }}
              onFocus={handleInputFocus}
              placeholder=" "
              autoComplete="off"
              required
            />
            <label htmlFor="CardHolderName" className="form-name">
              Name
            </label>
          </div>
          <div className="signup-name">
            <input
              type="text"
              className="form-name-input"
              id="ExpiryDate"
              name="ExpiryDate"
              maxLength={5}
              value={card.ExpiryDate}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, "");
                if (value.length === 2 && !card.ExpiryDate.includes("/")) {
                  value = value + "/";
                } else if (value.length > 2) {
                  value = value.slice(0, 2) + "/" + value.slice(2, 4);
                }
                // Only allow month 1-12
                const [mm] = value.split("/");
                if (
                  mm &&
                  mm.length === 2 &&
                  (parseInt(mm, 10) < 1 || parseInt(mm, 10) > 12)
                ) {
                  return; // Do not update if month is invalid
                }
                setCard({ ...card, ExpiryDate: value });
              }}
              onFocus={handleInputFocus}
              placeholder=" "
              autoComplete="off"
              required
            />
            <label htmlFor="ExpiryDate" className="form-name">
              Expiry Date (MM/YY){" "}
              {isExpiryValid ? <span className="addcard-valid">✔</span> : null}
            </label>
          </div>
          <div className="signup-name">
            <input
              type="text"
              className="form-name-input"
              id="cvc"
              name="cvc"
              maxLength={4}
              value={card.cvc}
              onChange={onChange}
              onFocus={handleInputFocus}
              placeholder=" "
              autoComplete="off"
              required
            />
            <label htmlFor="cvc" className="form-name">
              CVV {isCvcValid ? <span className="addcard-valid">✔</span> : null}
            </label>
          </div>
          <button
            type="submit"
            className={
              isDisabled || !card.BankName
                ? "disabled-submit-button"
                : "enabled-submit-button"
            }
            disabled={isDisabled || !card.BankName}
          >
            {isDisabled || !card.BankName ? "Fill all fields" : "Add Card"}
          </button>
          {formError && <div className="form-error">{formError}</div>}
        </form>
      </div>
      {showBankModal && (
        <BankPopup
          bankLogos={bankLogos}
          onSelect={handleBankSelect}
          onClose={() => setShowBankModal(false)}
        />
      )}
    </div>
  );
};

export default AddCard;
