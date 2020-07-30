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


TODO 

  BACKEND
  - create models
    - user
    - tournament 
    - entry
    - trade

  - create controllers
    - user 
    - tournament 
    - entry 
    - trade

  - create middleware? 
    - verifyToken
    - checkDuplicate

  - create routes 
    - user
    - tournament 
    - entry 
    - trade

  FRONTEND
  - create layout diagrams 
  - create simple forms to test backend routes 

  SPECIFIC
    - tournament to be created with a creatorId, 
      - convert jwt to userID ?  

    - Entry 
      - controller needs to save a tournament id and user id
      - store username, if want to see users entries then query for show entries by username....? 
        - 
      - show needs to populate
      - index needs to populate

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
  
======================================================================
TODO agane

- make validations for tournament entry fee

- make layouts for the site in awwapp !

- if logged in should have all user credentials on app open
    - if local storage has a token, fetch user data with it ???

- DRY up authActions !

- get all tournament data
    - add duration to backend
    - format table in the frontend !

- get simple login to work first 

- when user presses enter tournament
  - an entry is created
  - users account is debited the entry fee
  - tournament is associated
  - user is associated 

  entry 
    BACKEND 
    - first check to see if the user has enough balance,
    - then debit it etc. 

    FRONT 
    - when enter is pressed, 
      - need some type of confirmation, <- do later? 
      - send a post to api/entries with tournamentId in body,
      - route to the tournament "compete page" 
      - need to create a awwapp for tournament compete page. 
      - tournament compete 

    - tournament page
      - COMPONENTS 
        - search stocks x 
        - when selected fetch api and start polling for live data x
        - display a candle chart of the data x 
        - get name of stock and other information to display x 
        - APPBAR
          - My positions
          - Trade History
          - All Entrants
        - 
      - TODO
        - style search bar and make a better input method
        - make search use api to suggest stocks 
        - poll for live data?
        - create nivo chart for volume data

- TODO big functionality
  - buy and sell (need to make sure trade is not created if dont have enough shares to sell?)
  - make search have suggestions
  - toast all errors
  - update chart every second with live data 
  - award winner of tournament
  - show trade history x 
  - show entrants in tournament 
  - create tournament
  - enter tournament x
  - redeem main account balance somehow 
  - show tournament history ( entrants, their trades, the winner, the payout) 
  - add friends  

  ENTRY 
    - restrict to one entry per tournament x
    - 
    - cant enter tourneys that have started x
    - entry limit x
      - when an entry is created, increment the tournaments entries to include x
    - start time has to be less then end time !!!!!!!!!!
    - on enter the dom needs to update to show the balance changed !!!!!
    - create a confirmation to enter !!!!!!!!
    - create a way to view tournament page with out entering x 
    - display errors !!!!!!!!! 
    - increment tournament total prize on entry!!!!!!

  BUY & SELL

    - verify malicious req
    - cant trade unless tournament has started
    - handle selling and buying in the backend x 
    - handle selling and buying in the frontend 
      - display tournament balance, update in dom positions and balance every trade that is created  
      - handle latest price x
        - poll fetch the latest quote and push to data ? 
    - handle getting all current postitions

    - BUY
      - user must have enough tournament balance to buy
      - On buy, user sends share amount and price of stock? 
        - if user sends this information then can easily be cheated... !!!!!!!
          - therefore user specifies the stock ticker and the backend works off the latest price? 
          - user specifying buy or sell can mess up the data need validations ???? 
          - 
        - A Trade is created and associated to the entry for that user and that tournament,
          - a user must be the owner of the entry in order to make a trade x 
          - a user must have a sufficient balance to trade x

    - SELL 
      - if you want to short a stock...
        - do you have to figure out margin calls? 
      - go long only for now
      - 

    - How to get current positions? 
      - could calculate based off trade history.... 
        - for each symbol ...
          - get net positions
            - 

SHOW POSITIONS AND TRADE HISTORY 
  - include positions object in response to get entries


- two different problems with trades

  - helper returns empty array randomly? 
  - will track trades that should not have been created because restrictions? 
    - make trade middleware to prevent creation? 
    - make helper method on trade controller? 
      - get all trades based on entry id,
      - calulate pos in frontend?
      - either set state after action... dont you in redux?
      - 


CREATING TOURNAMENTS
  - 

STYLING IDEAS
  - buttons with icons


HANDLING SUCCESS AND ERRORS

  - create a component that transitions an alert at an absolute positions at the top of the screen 

MISC

  - right now when we reflect dom changes we dispatch a whole action rather than initally setting component state then updating that state which would be more optimal  


how would i seed data 

  - create touranemnts

  - create users

  - create entries

  - create trades 

