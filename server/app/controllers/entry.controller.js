const EntryModel = require("../models/entry");

const EntryController = {
  index: async (req, res) => {
    const found = await EntryModel.find({})
      .populate({ path: 'user', select: 'username -_id' })
      .populate("tournament")
    res.send(found)  
  },
  showByUsername: async (req, res) => {
    console.log(req.params)
    const found = await EntryModel.find({})
      .populate({ path: 'user', select: 'username -_id' })
      .populate("tournament");
    const foundByUser = found.filter(entry => entry.user.username === req.params.username);
    res.send(foundByUser);
  },
  showByTournamentName: async (req, res) => {
    console.log(req.params)
    const found = await EntryModel.find({})
      .populate({ path: 'user', select: 'username -_id' })
      .populate("tournament");
    const foundByTournament = found.filter(entry => entry.tournament.name === req.params.tournamentName);
    res.send(foundByTournament);
  },
  create: async (req, res) => {
    const entry = new EntryModel({
      user: req.userId,
      tournament: req.body.tournamentId,
    });
    entry.save((err, entryCreated) => {
      if (err) return res.send({error: err});
      req.tournament.entries.push(entryCreated._id);
      req.tournament.save();
      res.send(entryCreated);
    })
  }
}

module.exports = EntryController;