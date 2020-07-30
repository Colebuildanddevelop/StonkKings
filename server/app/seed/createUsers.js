const TournamentModel = require("../models/tournament");
const UserModel = require("../models/user");

const createUsers = () => {
  UserModel.collection.drop();
  UserModel.create([
    {
      username: 'cole',
      password: '123',
      email: 'cole@cole.com'
    },
    {
      username: 'raul',
      password: '123',
      email: 'raul@cole.com'
    }
  ])
  .then(user => {
    console.log(user)
  })
  .catch(console.log)
}

module.exports = createUsers;