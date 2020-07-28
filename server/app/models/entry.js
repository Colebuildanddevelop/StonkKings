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
  let allPositions = null;
  await mongoose.model('Trade').find({entry: this._id}, async (err, trades) => {
    if (err) {
      console.log("err",err)
      return;
    }
    const allTickers = await trades.map(t => t.stockTicker);
    const uniqueTickers = await allTickers.filter((val, index, self) => self.indexOf(val) === index);
    allPositions = await uniqueTickers.map(ticker => {
      const position = {
        ticker: ticker,
        netShares: 0
      }
      trades.forEach(async trade => {
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
  })
  console.log(allPositions)
  return allPositions;
}

EntrySchema.methods.getPositions2 = async function() {
  let allPositions = null;
  await mongoose.model('Trade').find({entry: this._id})
    .exec(async (err, trades) => {
      if (err) {
        console.log("err",err)
        return;
      }
      console.log("trade", trades)
      const allTickers = trades.map(t => t.stockTicker);
      const uniqueTickers = allTickers.filter((val, index, self) => self.indexOf(val) === index);
      allPositions = uniqueTickers.map(ticker => {
        const position = {
          ticker: ticker,
          netShares: 0
        }
        trades.forEach(async trade => {
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

    })
  console.log("all pos", allPositions)
  return allPositions;
}
module.exports = mongoose.model("Entry", EntrySchema);

