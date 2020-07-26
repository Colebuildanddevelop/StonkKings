const TournamentModel = require("../models/tournament");

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
          if (tournament.endTime < new Date() && (tournament.winners.length === 0)) {
            const balances = tournament.entries.map(entry => entry.tournamentBalance);
            console.log(balances)
            const highestBalance = Math.max(...balances);
            console.log(highestBalance)
            const winners = tournament.entries.filter(entry => entry.tournamentBalance === highestBalance);
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

