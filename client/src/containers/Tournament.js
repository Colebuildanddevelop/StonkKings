import React from "react";
import { connect } from "react-redux";
import { getEntryByUsernameAndTournamentName } from "../redux/actions/entry.actions";
import { getTradesByEntryId } from "../redux/actions/trade.actions";
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

// MATERIAL UI
import Button from '@material-ui/core/Button';

class Tournament extends React.Component {

  state = {
    modalOpen: false,
    error: null,
    stockData: [{
      id: "IBM",
      data: [{
        x: "2020-06-01",
        y: 1
      }]
    }],
    stockInfo: {
      symbol: "IBM"
    },
    currentSearch: "IBM",
    timeFunction: "TIME_SERIES_DAILY",
    intradayInterval: "1min",
    currentPrice: "loading",
    currentView: "buy/sell"
  }

  componentDidMount() {
    this.getPriceData("IBM", "TIME_SERIES_DAILY");
    if (localStorage.userId) {
      this.handleGetCurrentEntry();
    }
  }

  getPriceData = (searchString, timeFunction="IBM", intradayInterval="") => {
    const queryString = this.formatPriceQuery(searchString, timeFunction, intradayInterval)
    console.log(queryString)
    fetch(queryString)
      .then(res => res.json())
      .then(data => {
        if (data["Error Message"]) {
          this.setState({
            error: data["Error Message"]
          })
          return;
        }
        const dataKeys = Object.keys(data)
        const timeSeriesHash = data[dataKeys[1]] 
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
  
  handleGetCurrentEntry = async () => {
    await this.props.getEntryByUsernameAndTournamentName(localStorage.userId, this.props.match.params.id);
    await this.props.getTradesByEntryId(this.props.currentEntry._id)
  }

  setPrice = (price) => {
    this.setState({
      currentPrice: parseFloat(price)
    });
  }

  handleSearchSubmit = (searchString) => {
    if (searchString !== undefined) {
      this.setState({
        currentSearch: searchString
      })
      this.getPriceData(searchString, this.state.timeFunction);
    }
  }

  handleChangeTimeFunction = (timeFunction, intradayInterval="") => {
    console.log(intradayInterval)
    this.setState({
      timeFunction: timeFunction,
      intradayInterval: intradayInterval
    }, this.getPriceData(this.state.currentSearch, timeFunction, intradayInterval));
  }

  formatPriceQuery = (searchString, timeFunction, intradayInterval="") => {
    console.log(intradayInterval)
    if (timeFunction !== "TIME_SERIES_INTRADAY") {
      return `https://www.alphavantage.co/query?function=${timeFunction}&symbol=${searchString}&outputsize=compact&apikey=3VP9375JIOYD1569`
    } else {
      return `https://www.alphavantage.co/query?function=${timeFunction}&symbol=${searchString}&interval=${intradayInterval}&apikey=3VP9375JIOYD1569`
    }
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
            <Button onClick={() => this.handleChangeTimeFunction("TIME_SERIES_MONTHLY")}>
              Monthly 
            </Button>
            <Button onClick={() => this.handleChangeTimeFunction("TIME_SERIES_WEEKLY")}>
              Weekly
            </Button>
            <Button onClick={() => this.handleChangeTimeFunction("TIME_SERIES_DAILY")}>
              Daily
            </Button>
            <Button onClick={() => this.handleChangeTimeFunction("TIME_SERIES_INTRADAY", "60min")}>
              Hourly
            </Button>
            <Button>
              15 min
            </Button>
            <Chart
              stockInfo={this.state.stockInfo}
              data={this.state.stockData}
            />
            {this.props.currentEntry && !this.props.currentEntry.message ? (
              <div>
                <TradeBar 
                  getCurrentEntry={this.handleGetCurrentEntry}
                  currentEntry={this.props.currentEntry}
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
  { getEntryByUsernameAndTournamentName, getTradesByEntryId }
)(Tournament);
  