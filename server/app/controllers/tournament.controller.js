const TournamentModel= require("../models/tournament");

const TournamentController = {
  index: async (req, res) => {
    const tournaments = await TournamentModel.find({})
      .populate({ path: 'createdBy', select: 'username -_id' })
    tournamentsFormatted = tournaments.map(tournament => {
      return {
        name: tournament.name,
        createdBy: tournament.createdBy,
        entryFee: tournament.entryFee,
        totalPrize: tournament.entryFee * tournament.entries.length,
        start: tournament.start,
        endTime: tournament.endTime
      }
    })
    console.log(tournamentsFormatted)
    res.send(tournamentsFormatted)  
  },
  show: async (req, res) => {
    const tournament = await TournamentModel.findOne({ name: req.params.name})
      .populate({ path: 'createdBy', select: 'username -_id' })
    if (!tournament) return res.send({error: "No user tournament"})

    res.send(tournament)  
  },
  create: async (req, res) => {
    const tournament = new TournamentModel({
      name: req.body.name,
      createdBy: req.userId,
      entryFee: req.body.entryFee, 
      entryLimit: req.body.entryLimit,
      startTime: Date(req.body.startTime),
      endTime: Date(req.body.endTime)
    });
    tournament.save((err, tournamentCreated) => {
      if (err) return res.send({error: err})
      res.send(tournamentCreated)
    })
  }
}

module.exports = TournamentController;