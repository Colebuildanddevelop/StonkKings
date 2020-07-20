const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true },
  email: String,
  password: String,
  profilePicture: String,
  friends: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  entries: [{
    type: Schema.Types.ObjectId, 
    ref: "Entry"
  }]
})

const user = mongoose.model("User", UserSchema);
user.accountBalance = 10000
module.exports = user;