import React, { useState, useEffect } from "react";
import CardPreview from "./CardPreview";
import "./styles/Card.style.css";
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

const Card = ({ card, editMode, onClose, handleAlert, onSubmitEdit }) => {
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
    bank: "",
  });
  const [showBankModal, setShowBankModal] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (editMode && card) {
      // Find a valid bank name from the list, fallback to empty string
      const validBank =
        bankLogos.find((b) => b.name === (card.BankName || card.eBankName))
          ?.name || "";
      setState({
        number: card.eCardNumber || card.CardNumber || "",
        expiry: card.eExpiryDate || card.ExpiryDate || "",
        cvc: card.cvc || "",
        name: card.eCardHolderName || card.CardHolderName || "",
        focus: "",
        bank: validBank,
      });
    }
  }, [editMode, card]);

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    if (name === "number") {
      let val = value.replace(/\D/g, "").slice(0, 16);
      setState((prev) => ({ ...prev, number: val }));
    } else if (name === "expiry") {
      let val = value.replace(/\D/g, "");
      if (val.length === 2 && !state.expiry.includes("/")) {
        val = val + "/";
      } else if (val.length > 2) {
        val = val.slice(0, 2) + "/" + val.slice(2, 4);
      }
      setState((prev) => ({ ...prev, expiry: val }));
    } else {
      setState((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const handleBankSelect = (bankName) => {
    // Always use the exact name from the list
    const validBank = bankLogos.find((b) => b.name === bankName)?.name || "";
    setState((prev) => ({ ...prev, bank: validBank }));
    setShowBankModal(false);
  };

  const isCardNumberValid =
    state.number.length >= 13 && state.number.length <= 16;
  const isExpiryValid = /^\d{2}\/\d{2}$/.test(state.expiry);
  const isCvcValid = state.cvc.length >= 3 && state.cvc.length <= 4;
  const isDisabled = !isCardNumberValid || !isExpiryValid || !isCvcValid;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isCardNumberValid || !isExpiryValid || !isCvcValid || !state.bank) {
      setFormError("Please fill all fields correctly and select a bank.");
      return;
    }
    if (onSubmitEdit) {
      onSubmitEdit({
        id: card.id,
        eCardNumber: state.number,
        eExpiryDate: state.expiry,
        cvc: state.cvc,
        eCardHolderName: state.name,
        BankName: state.bank,
      });
    }
    if (onClose) onClose();
  };

  return (
    <div className="edit-card-container">
      <div className="edit-card-form-header">
        <span>Edit Card</span>
        <span className="edit-card-close" onClick={onClose}>
          &#10005;
        </span>
      </div>
      <div className="addcard-inner">
        <div className="addcard-card-preview">
          <CardPreview
            cvc={state.cvc}
            expiry={state.expiry}
            name={state.name}
            number={state.number}
            focus={state.focus}
            bankName={state.bank}
          />
        </div>
        <form className="addcard-form" onSubmit={handleSubmit}>
          <div className="signup-name">
            <button
              type="button"
              className="enabled-submit-button"
              onClick={() => setShowBankModal(true)}
              style={{ marginBottom: 10, marginLeft: 10, width: "100%" }}
            >
              {state.bank ? (
                <div className="select-bank">
                  <img
                    src={
                      bankLogos.find((b) => b.name === state.bank)?.img ||
                      "bank/nothing.png"
                    }
                    alt={state.bank}
                    className="select-bank-logo"
                  />
                  <span>{state.bank}</span>
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
              id="number"
              name="number"
              maxLength={19}
              value={state.number.replace(/(\d{4})(?=\d)/g, "$1 ")}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              placeholder=""
              autoComplete="off"
              required
            />
            <label htmlFor="number" className="form-name">
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
              id="name"
              name="name"
              maxLength={20}
              value={state.name}
              onChange={(e) => {
                // Only allow a-z and A-Z, max 20 chars
                const value = e.target.value
                  .replace(/[^a-zA-Z ]/g, "")
                  .slice(0, 20);
                handleInputChange({
                  target: { name: "name", value },
                });
              }}
              onFocus={handleInputFocus}
              placeholder=" "
              autoComplete="off"
              required
            />
            <label htmlFor="name" className="form-name">
              Name
            </label>
          </div>
          <div className="signup-name">
            <input
              type="text"
              className="form-name-input"
              id="expiry"
              name="expiry"
              maxLength={5}
              value={state.expiry}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, "");
                if (value.length === 2 && !state.expiry.includes("/")) {
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
                handleInputChange({
                  target: { name: "expiry", value },
                });
              }}
              onFocus={handleInputFocus}
              placeholder=" "
              autoComplete="off"
              required
            />
            <label htmlFor="expiry" className="form-name">
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
              value={state.cvc}
              onChange={handleInputChange}
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
              isDisabled || !state.bank
                ? "disabled-submit-button"
                : "enabled-submit-button"
            }
            disabled={isDisabled || !state.bank}
          >
            {isDisabled || !state.bank ? "Fill all fields" : "Update Card"}
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

export default Card;
