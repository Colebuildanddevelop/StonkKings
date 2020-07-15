MAIN

- Users can see a list of all avalible tournaments (/lobby)
- Users are assigned in house currency on account creation 
- Users can have a friends list
- Users can create a public lobby
- Users can view the results of passed tournaments
- Users can see their own and other Users tournament history
    - tournament history includes all the trades the user placed in that tournament
- Users can see accounts with the most earnings
- Tournaments are filterable by name, entry fees low to high, and entry fees range. 


TOURNAMENT

- Users are assigned a starting balance
- Users can buy and sell stocks (short) using that balance
- Users can search a list of stocks and visualize their price history and volume data
- At the end of a Tournament the user with the highest account balance is rewarded the entry fees
- Users can see other entries and their trades / balances
- 


Models/ Relationships

User
has_many entrants
{
  username: String,
  password: String, 
  email: String,
  profilePicture: String,
  accountBalance: Integer,
  friends: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }]
  entries: [{
    type: Schema.Types.ObjectId, 
    ref: "Entry"
  }]
}

Entry
belongs_to User
belongs_to Tournament 
has_many Trades
{
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  tournament: {
    type: Schema.Types.ObjectId,
    ref: "Tournament"
  },
  trades: [{
    type: Schema.Types.ObjectId,
    ref: "Trade"
  }], 
  accountBalance: Integer 
}

Tournament
has_many Entries 
belongs_to User
{
  entries: [{
    type: Schema.Types.ObjectId,
    ref: "Entry"    
  }], 
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User"
  } 
  entryFee: Integer,
  entryLimit: Integer,
  startTime: Date,
  endTime: Date,
  Winners: [array of UserIds]
}

Trade
belongs to Entry 
{
  entry: {
    type: Schema.Types.ObjectId,
    ref: "Entry"
  }
  StockTicker: String,
  time: Date,
  BuyOrSell: String,
  price: Integer, 
  shares: Integer
}

ROUTES 

USER 

  - SHOW
  - UPDATE
  - DELETE
  - INDEX 
  - CREATE

TOURNAMENT
  
  - INDEX
  - SHOW
  - CREATE
  - 

ENTRY

  - INDEX 
  - SHOW 
  - CREATE
  - UPDATE

TRADE

  - INDEX
  - SHOW? 
  - CREATE
  




















Models/ Relationships

User
has_many entrants
has_many trades through entrants
has_many Tournaments, through entrants 
{
  username: String,
  password: String, 
  email: String,
  profilePicture: String,
  accountBalance: Integer,
}

Entry
belongs_to User
belongs_to Tournament 
has_many Trades
{
  user_id: Integer,
  tournament_id: Integer,
  accountBalance: Integer 
}

Tournament
has_many Users through entries
{
  entryFee: Integer,
  startTime: Date,
  endTime: Date,
  Winners: [array of UserIds] (iterate each entry for highest account balance and return user(s))
}

Trade 
belongs_to Entry
{
  entry_id: Integer,
  time: Date,
  StockTicker: String,
  BuyOrSell: String,
  price: Integer,
  shares: Integer
}



fetch("http://localhost:8080/api/auth/signin", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    username: "cole",
    password: "123"
  })
})
.then(res => res.json())
.then(console.log)