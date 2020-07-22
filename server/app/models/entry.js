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

EntrySchema.methods.getPositions = function() {
  const allPositions = [];
  mongoose.model('Trade').find({entry: this._id})
    .exec((err, trades) => {
      const allPositions = [];
      const allTickers = trades.map(t => t.stockTicker);
      const uniqueTickers = allTickers.filter((val, index, self) => self.indexOf(val) === index);
      uniqueTickers.forEach(ticker => {
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
        console.log('pushing')
        allPositions.push(position)
      });
      console.log(allPositions)
    });
}

module.exports = mongoose.model("Entry", EntrySchema);


// buy 1 stock at 10 
// buy 1 stock at 5

// avg price : 7.5 @ 2 total pos val = 15

// sell one stock at 15 
// 7.5 @ 1, 