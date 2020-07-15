MAIN

- Users can see a list of all avalible tournaments (/lobby)
- Users are assigned in house currency 
- Users can have a friends list
- Users can create a public lobby and get a share of the profits? 
- Users can view the results of passed tournaments
- Users can see their own and other Users tournament history
    - tournament history includes all the trades the user placed in that tournament

TOURNAMENT

- Users are assigned a starting balance
- Users can buy and sell stocks (short) using that balance
- Users can search a list of stocks and visualize their price history and volume
- At the end of a Tournament the user with the highest account balance is rewarded the entry fees

Models/ Relationships

User
has_many entrants
{
  username: String,
  password: String, 
  email: String,
  profilePicture: String,
  accountBalance: Integer,
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