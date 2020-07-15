const TournamentModel= require("../models/tournament");

const TournamentController = {
  index: async (req, res) => {
    const found = await TournamentModel.find({});
    res.send(found)  
  },
  show: async (req, res) => {
    const found = await TournamentModel.findOne({ name: req.params.name});
    if (!found) return res.send({error: "No user found"})
    res.send(found)  
  },
  create: async (req, res) => {
    const tournament = new TournamentModel({
      name: req.body.name,
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