const EntryModel = require("../models/entry");

const EntryController = {
  index: async (req, res) => {
    const found = await EntryModel.find({})
      .populate({ path: 'user', select: 'username -_id' })
      .populate("tournament")
    res.send(found)  
  },
  showByUsername: async (req, res) => {
    const found = await EntryModel.find({})
      .populate({ path: 'user', select: 'username -_id' })
      .populate("tournament");
    const foundByUser = found.filter(entry => entry.user.username === req.params.username);
    res.send(foundByUser);
  },
  showByTournamentId: async (req, res) => {
    const found = await EntryModel.find({ tournament: req.params.tournamentId })
      .populate({ path: 'user', select: 'username -_id' })
    res.send(found);
  },
  showByUsernameAndTournamentName: async (req, res) => {
    const found = await EntryModel.findOne({ user: req.params.userId, tournament: req.params.tournamentId })
    if (!found) return res.send({message: "entry not found"})
    res.send(found);
  },
  create: async (req, res) => {
    const entry = new EntryModel({
      user: req.userId,
      tournament: req.body.tournamentId,
    });
    entry.save(async (err, entryCreated) => {
      if (err) return res.send({error: err});
      req.tournament.entries.push(entryCreated._id);
      req.user.entries.push(entryCreated._id);
      await req.user.save((err, userCreated => {
        if (err) return res.send({error: err});
        req.tournament.save((err, tournamentCreated) => {
          if (err) return res.send({error: err});
          res.send(entryCreated);
        });
      }));
    })
  }
}

module.exports = EntryController;