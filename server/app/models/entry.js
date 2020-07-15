const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EntrySchema = new Schema({
})

module.exports = mongoose.model("Entry", EntrySchema);