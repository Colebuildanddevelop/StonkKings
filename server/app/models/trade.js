const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TradeSchema = new Schema({
  entry: {
    type: Schema.Types.ObjectId,
    ref: "Entry"
  },
  stockTicker: String,
  time: Date,
  BuyOrSell: String,
  price: Number, 
  shares: Number 
})

module.exports = mongoose.model("Entry", TradeSchema);