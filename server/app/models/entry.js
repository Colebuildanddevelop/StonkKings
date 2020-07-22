const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EntrySchema = new Schema({
  tournamentBalance: { type: Number, default: 100000 },
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
  }] 
});

EntrySchema.methods.getPositions = async function() {
  let allPositions = [];
  await mongoose.model('Trade').find({entry: this._id}, (err, trades) => {
    const allTickers = trades.map(t => t.stockTicker);
    const uniqueTickers = allTickers.filter((val, index, self) => self.indexOf(val) === index);
    const totalPositions = uniqueTickers.map(ticker => {
      const position = {
        ticker: ticker,
        netShares: 0
      }
      trades.forEach(trade => {
        if (trade.stockTicker === ticker) {
          if (trade.buyOrSell === "buy") {
            position.netShares = position.netShares + trade.amountOfShares
          } else {
            position.netShares = position.netShares - trade.amountOfShares
          }
        }
      });
      return position;
    });
    allPositions = totalPositions
  })
  return allPositions;
}

module.exports = mongoose.model("Entry", EntrySchema);

