const Entry = require("../models/entry");

// user must have sufficient balance
// user must be owner of the entry

const tradeRestrictions = (req, res, next) => {
  Entry.findById(req.body.entryId)
    .exec((err, entry) => {
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
      }
      if (entry.tournamentBalance < (req.body.amountOfShares * req.body.price)) {
        res.status(400).send({ message: "User does not have enough funds to make this trade!" });
        return;
      }
      req.entry = entry;
      next();
    })
};

module.exports = tradeRestrictions;