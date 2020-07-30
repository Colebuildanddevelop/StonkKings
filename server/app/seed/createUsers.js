const TournamentModel = require("../models/tournament");
const UserModel = require("../models/user");

function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

const usernames = [
  "Esther",
  "TY",
  "Lili",
  "Phyllis",
  "Stephanie",
  "Krysta",
  "Richard",
  "Eric",
  "Freddy",
  "Luis",
  "Lauren",
  "Edwin",
  "Raul",
  "Rupa",
  "Vidhi",
  "Joshua",
  "stockLover",
  "Izuku",
  "Light",
  "L",
  "Goku"
]

const createUsers = () => {
  UserModel.collection.drop();

  let counter = 20; 
  for (let i=0; i<counter; i++) {
    
    UserModel.create({
      username: usernames[i],
      password: makeId(),
      email: makeid() + "@gmail.com",
      avatar: "https://i.pravatar.cc/300"
    })
    .then(console.log)
    .catch(err => {
      console.log(err);
      return;
    })
  }
}

module.exports = createUsers;