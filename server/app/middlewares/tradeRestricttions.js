const Entry = require("../models/entry");

// user must have sufficient balance
// user must be owner of the entry

const tradeRestrictions = (req, res, next) => {
  Entry.findById(req.body.entryId)
    .exec(async (err, entry) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!entry) {
        res.status(400).send({ message: "entry does not exist!" });
        return;
      }
      if (entry.user.toString() !== req.userId) {
        res.status(400).send({ message: "User and entry do not match!" });
        return;
      }
      if (req.body.buyOrSell === "buy") {
        if (entry.tournamentBalance < (req.body.amountOfShares * req.body.price)) {
          res.status(400).send({ message: "User does not have enough funds to make this trade!" });
          return;
        }
        
      } else {
        // if sell, then user must have enough shares of the stock to sell
        const positions = await entry.getPositions();
        if (positions === null) {
          res.status(400).send({ message: "no positions were found try again" })
          return;
        }
        // console.log(positions)
        let eligibleToSell = true;
        await positions.forEach(position => {
          if (position.ticker === req.body.stockTicker) {
            if (position.netShares < req.body.amountOfShares) {
              eligibleToSell = false;
            }
          }
        });
        if (!eligibleToSell) {
          res.status(400).send({ message: "You dont have enough shares to sell" })
          return;
        }
      }
      req.entry = entry;
      next();
    })
};

module.exports = tradeRestrictions;

