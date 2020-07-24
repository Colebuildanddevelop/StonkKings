import React from "react";
import { connect } from "react-redux";
import { getEntryByUsernameAndTournamentName } from "../redux/actions/entry.actions";
import { getPriceData } from "../helpers/fetchPriceData";
// COMPONENTS
import SearchBar from "../components/SearchBar";
import Chart from "../components/Chart";
import TradeBar from "../components/TradeBar";
import LatestPrice from "../components/LatestPrice";
import MyPositions from "../components/MyPositions";
import TournamentBar from "../components/TournamentBar";
import AllEntrants from "../components/AllEntrants";
import TradeHistory from "../components/TradeHistory";

class Tournament extends React.Component {

  state = {
    error: null,
    stockData: [{
      id: "IBM",
      data: [{
        x: "2020-06-01",
        y: 1
      }]
    }],
    stockInfo: {
      symbol: "IBM",
      
    },
    timeInterval: "Daily",
    currentPrice: "loading",
    currentView: "buy/sell"
  }

  componentDidMount() {
    this.getPriceData("IBM");
    if (localStorage.userId) {
      this.handleGetCurrentEntry();
    }
  }

  getPriceData = (searchString) => {
    fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${searchString}&outputsize=compact&apikey=3VP9375JIOYD1569`)
      .then(res => res.json())
      .then(data => {
        if (data["Error Message"]) {
          this.setState({
            error: data["Error Message"]
          })
          return;
        }
        const timeSeriesHash = data[`Time Series (${this.state.timeInterval})`];
        console.log(data)
        const formattedData = Object.keys(timeSeriesHash).map(key => {
          return {
            x: key, 
            y: parseFloat(timeSeriesHash[key]["4. close"])
          };
        });
        fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${searchString}&apikey=3VP9375JIOYD1569`)
          .then(res => res.json())
          .then(stockInfo => {
            fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${searchString}&apikey=3VP9375JIOYD1569`)
              .then(res => res.json())
              .then(priceData => {
                console.log(priceData["Global Quote"]["05. price"])
                this.setState({
                  error: null,
                  stockData: [{
                    id: searchString,
                    data: formattedData
                  }],
                  stockInfo: {
                    symbol: stockInfo["Symbol"],
                    name: stockInfo["Name"],
                    exchange: stockInfo["Exchange"]
                  },
                  currentPrice: priceData["Global Quote"]["05. price"]
                });
              });
          });
      });
  }

  handleGetCurrentEntry = () => {
    this.props.getEntryByUsernameAndTournamentName(localStorage.userId, this.props.match.params.id);
  }

  setPrice = (price) => {
    this.setState({
      currentPrice: parseFloat(price)
    });
  }

  handleSearchSubmit = (searchString) => {
    this.getPriceData(searchString);
  }
  
  changeView = (view) => {
    this.setState({
      currentView: view
    });
  }
  
  render() {
    return (
      <div>
        <TournamentBar setView={this.changeView} />
        {this.state.currentView === "buy/sell" ? (
          <div>
            <SearchBar 
              handleSearchSubmit={this.handleSearchSubmit} 
              error={this.state.error} 
            />
            <Chart
              stockInfo={this.state.stockInfo}
              data={this.state.stockData}
            />
            {this.props.currentEntry && !this.props.currentEntry.message ? (
              <div>
                <TradeBar 
                  getCurrentEntry={this.handleGetCurrentEntry}
                  currentPrice={this.state.currentPrice}
                  stockTicker={this.state.stockInfo.symbol}
                  entryId={this.props.currentEntry._id || null} 
                />
                <LatestPrice 
                  searchString={this.state.stockInfo.symbol}
                  setPrice={this.setPrice}
                  currentPrice={this.state.currentPrice}
                />
                <MyPositions currentEntry={this.props.currentEntry}  />
              </div>
            ): (null)}
          </div>
        ) : null}
        {this.state.currentView === "tradeHistory" ? (
          <div>
            <TradeHistory />
          </div>
        ) : null}
        {this.state.currentView === "allEntrants" ? (
          <div>
            <AllEntrants tournamentId={this.props.match.params.id} />
          </div>
        ) : null}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentEntry: state.entry.currentEntry,
  currentUser: state.auth.currentUser,
  createdTrade: state.trade.createdTrade
});

export default connect(
  mapStateToProps,
  { getEntryByUsernameAndTournamentName }
)(Tournament);
  