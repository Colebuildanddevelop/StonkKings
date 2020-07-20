const User = require("../models/user");
const Tournament = require("../models/tournament");

const checkUserBalance = (req, res, next) => {
  // Username
  User.findById(req.userId)
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        res.status(400).send({ message: "User was not found!" });
        return;
      }
      Tournament.findById(req.body.tournamentId)
        .exec((err, tournament) => {
          if (err) {
            res.status(500).send({message: err});
          }
          if (!tournament) {
            res.status(400).send({ message: "Tournament was not found!" });
            return;
          }
          if (user.accountBalance < tournament.entryFee) {
            res.send({message: "User funds insufficient for entry!"})
            return;
          }
          const priorBalance = user.accountBalance;
          user.accountBalance = priorBalance - tournament.entryFee;
          user.save() 
          next();
        });
    });
};

module.exports = checkUserBalance;