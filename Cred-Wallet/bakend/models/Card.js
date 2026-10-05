const mongoose = require("mongoose");
const { Schema } = mongoose;

const CardSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  BankName: {
    type: String,
    required: true,
  },
  CardNumber: {
    type: String,
    required: true,
  },
  CardHolderName: {
    type: String,
    required: true,
  },
  ExpiryDate: {
    type: String,
    required: true,
  },
  cvc: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("cards", CardSchema);