const express = require("express");
const Card = require("../models/Card");
var fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const router = express.Router();

// ROUTE 1: fetch all cards data: GET "/api/auth/fetchallcards".  login required
router.get("/fetchallcards", fetchuser, async (req, res) => {
  try {
    const cards = await Card.find({ user: req.user.id });
    res.json(cards);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error 1");
  }
});

// ROUTE 2: add anew card: POST "/api/auth/addcard".  login required
router.post(
  "/addcard",
  fetchuser,
  [
    body("BankName", "Enter a valid BankName").isLength({ min: 3 }),
    body("CardNumber", "enter atleast 5 character CardNumber").isLength({
      min: 3,
    }),
    body("CardHolderName", "enter atleast 5 character CardHolderName").isLength(
      { min: 3 }
    ),
    body("ExpiryDate", "enter atleast 5 character ExpiryDate").isLength({
      min: 3,
    }),
    body("cvc", "enter atleast 5 character cvc").isLength({ min: 3 }),
  ],
  async (req, res) => {
    const { BankName, CardNumber, CardHolderName, ExpiryDate, cvc } = req.body;
    try {
      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const card = new Card({
        BankName,
        CardNumber,
        CardHolderName,
        ExpiryDate,
        cvc,
        user: req.user.id,
      });
      const saveCard = await card.save();
      res.json(saveCard);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error 2");
    }
  }
);

// ROUTE 3: update an existing card: PUT "/api/auth/updatecard".  login required
router.put("/updatecard/:id", fetchuser, async (req, res) => {
  const { BankName, CardNumber, CardHolderName, ExpiryDate, cvc } = req.body;
  try {
    //create a new card object
    const newCard = {};
    if (BankName) {
      newCard.BankName = BankName;
    }
    if (CardNumber) {
      newCard.CardNumber = CardNumber;
    }
    if (CardHolderName) {
      newCard.CardHolderName = CardHolderName;
    }
    if (ExpiryDate) {
      newCard.ExpiryDate = ExpiryDate;
    }
    if (cvc) {
      newCard.cvc = cvc;
    }

    //validate
    let card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(401).send("Not found");
    }
    if (card.user.toString() !== req.user.id) {
      return res.status(401).send("Action not allowed");
    }

    //find the card to be updated and update it
    card = await Card.findByIdAndUpdate(
      req.params.id,
      { $set: newCard },
      { new: true }
    );
    res.json({ card });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error 3");
  }
});

// ROUTE 4: delete an existing card: DELETE "/api/auth/deletecard".  login required
router.delete("/deletecard/:id", fetchuser, async (req, res) => {
  try {
    //validate
    let card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(401).send("Not found");
    }
    if (card.user.toString() !== req.user.id) {
      return res.status(401).send("Action not allowed");
    }

    //find the card to be deletion and delete it
    card = await Card.findByIdAndDelete(req.params.id);
    res.json({ Success: "card has been deleted", card: card });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error 4");
  }
});
module.exports = router;