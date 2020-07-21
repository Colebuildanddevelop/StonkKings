const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true },
  email: String,
  password: String,
  profilePicture: String,
  accountBalance: { type: Number, default: 10000 },
  friends: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  entries: [{
    type: Schema.Types.ObjectId, 
    ref: "Entry"
  }]
});

module.exports = mongoose.model("User", UserSchema);