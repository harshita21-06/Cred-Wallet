import React, { useContext, useEffect, useState } from "react";
import cardContext from "../context/cards/cardContext";
import Carditem from "./CardItem";
import AddCard from "./AddCard";
import Card from "./Card";
import { useNavigate } from "react-router-dom";
import "./styles/Cards.style.css";

const Cards = (props) => {
  const context = useContext(cardContext);
  const navigate = useNavigate();
  const { cards, getCards, editCard } = context;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getCards();
    } else {
      navigate("/");
    }
    //eslint - disable - next - line;
  }, []);
  const [card, setCard] = useState({
    id: "",
    eBankName: "",
    eCardNumber: "",
    eCardHolderName: "",
    eExpiryDate: "",
    cvc: "",
    focus: "",
  });
  const [showEditModal, setShowEditModal] = useState(false);

  const updateCard = (currentCard) => {
    setShowEditModal(true);
    setCard({
      id: currentCard._id,
      eBankName: currentCard.BankName,
      eCardNumber: currentCard.CardNumber,
      eCardHolderName: currentCard.CardHolderName,
      eExpiryDate: currentCard.ExpiryDate,
      cvc: currentCard.cvc,
    });
  };

  const handleClick = (e) => {
    editCard(
      card.id,
      card.eBankName,
      card.eCardNumber,
      card.eCardHolderName,
      card.eExpiryDate,
      card.cvc
    );
    setShowEditModal(false);
    props.handleAlert("Cards Updated Successfully", "success");
  };

  const onChange = (e) => {
    setCard({ ...card, [e.target.name]: e.target.value });
  };
  const handleInputFocus = (evt) => {
    setCard({ ...card, focus: evt.target.name });
  };

  return (
    <>
      <AddCard handleAlert={props.handleAlert} />
      {showEditModal && (
        <div
          className="edit-card-modal-overlay"
          onClick={() => setShowEditModal(false)}
        >
          <div className="edit-card-modal" onClick={(e) => e.stopPropagation()}>
            <Card
              card={card}
              editMode={true}
              onClose={() => setShowEditModal(false)}
              handleAlert={props.handleAlert}
              onSubmitEdit={(updated) => {
                editCard(
                  updated.id,
                  updated.BankName, // Use the updated bank name
                  updated.eCardNumber,
                  updated.eCardHolderName,
                  updated.eExpiryDate,
                  updated.cvc
                );
                setShowEditModal(false);
                props.handleAlert("Cards Updated Successfully", "success");
              }}
            />
          </div>
        </div>
      )}
      <h1 className="card-text">
        {cards.length === 0 ? "No Cards to display" : "Your Cards"}
      </h1>
      <div className="all-card-container">
        {cards.map((card) => {
          return (
            <Carditem
              key={card._id}
              updateCard={updateCard}
              handleAlert={props.handleAlert}
              card={card}
            />
          );
        })}
      </div>
    </>
  );
};

export default Cards;
