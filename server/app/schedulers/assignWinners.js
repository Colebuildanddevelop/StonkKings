const TournamentModel = require("../models/tournament");
const UserModel = require("../models/user");

// scheduler
const assignWinnerScheduler = () => {
  const assignWinner = () => {
    TournamentModel.find({})
      .populate("entries")
      .exec((err, tournaments) => {
        if (err) {
          console.log(err);
          return;
        }
        tournaments.forEach(tournament => {
          if (tournament.endTime < new Date() && (tournament.winners.length === 0) && tournament.entries.length !== 0) {
            const balances = tournament.entries.map(entry => entry.tournamentBalance);
            console.log(balances)
            const highestBalance = Math.max(...balances);
            console.log(highestBalance)
            const winners = tournament.entries.filter(entry => entry.tournamentBalance === highestBalance);
            winners.forEach(winner => {
              UserModel.findById(winner.user)
                .exec((err, user) => {
                  if (err) {
                    console.log(err);
                    return;
                  }
                  user.accountBalance += tournament.entryFee * tournament.entries.length;
                  user.wins += 1;
                  console.log("user", user)
                  user.save(err => {
                    if (err) {
                      console.log(err);
                      return;
                    }
                    console.log("user saved")
                  });
                })
            })
            console.log(winners)
            tournament.winners = winners;
            tournament.save();
          }
        });
      });
  }
  setInterval(assignWinner, 10000);
}

module.exports = assignWinnerScheduler;

