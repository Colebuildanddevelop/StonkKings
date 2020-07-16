const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EntrySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  tournament: {
    type: Schema.Types.ObjectId,
    ref: "Tournament"
  },
  trades: [{
    type: Schema.Types.ObjectId,
    ref: "Trade"
  }], 
  accountBalance: { type: Number, default: 10000 } 
})

module.exports = mongoose.model("Entry", EntrySchema);