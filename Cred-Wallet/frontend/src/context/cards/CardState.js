import CardContext from "./cardContext";
import React, { useState } from "react";

const CardState = (props) => {
  const host = process.env.REACT_APP_API_URL;
  const cardsInitial = [];
  const [cards, setCards] = useState(cardsInitial);

  // Get all Cards
  const getCards = async () => {
    // API Call
    const response = await fetch(`${host}/api/cards/fetchallcards`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setCards(json);
  };

  // Add a Card
  const addCard = async (
    BankName,
    CardNumber,
    CardHolderName,
    ExpiryDate,
    cvc
  ) => {
    // TODO: API Call
    // API Call
    const response = await fetch(`${host}/api/cards/addcard`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        BankName,
        CardNumber,
        CardHolderName,
        ExpiryDate,
        cvc,
      }),
    });

    const card = await response.json();
    setCards(cards.concat(card));
  };

  // Delete a Card
  const deleteCard = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/cards/deletecard/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();

    const newCards = cards.filter((card) => {
      return card._id !== id;
    });
    setCards(newCards);
  };

  // Edit a Card
  const editCard = async (
    id,
    BankName,
    CardNumber,
    CardHolderName,
    ExpiryDate,
    cvc
  ) => {
    // API Call
    const response = await fetch(`${host}/api/cards/updatecard/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        BankName,
        CardNumber,
        CardHolderName,
        ExpiryDate,
        cvc,
      }),
    });
    const json = await response.json();

    let newCards = JSON.parse(JSON.stringify(cards));

    // Logic to edit in client
    for (let index = 0; index < newCards.length; index++) {
      const element = newCards[index];
      if (element._id === id) {
        newCards[index].BankName = BankName;
        newCards[index].CardNumber = CardNumber;
        newCards[index].CardHolderName = CardHolderName;
        newCards[index].ExpiryDate = ExpiryDate;
        newCards[index].cvc = cvc;
        break;
      }
    }
    setCards(newCards);
  };

  return (
    <CardContext.Provider
      value={{ cards, addCard, deleteCard, editCard, getCards }}
    >
      {props.children}
    </CardContext.Provider>
  );
};
export default CardState;
