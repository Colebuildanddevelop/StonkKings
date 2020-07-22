import React from "react";
import { connect } from "react-redux";
import { getEntryByUsernameAndTournamentName } from "../redux/actions/entry.actions";
import SearchBar from "../components/SearchBar";
import Chart from "../components/Chart";
import TradeBar from "../components/TradeBar";

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
  }

  componentDidMount() {
    this.getPriceData("IBM");
    if (localStorage.userId) {
      this.props.getEntryByUsernameAndTournamentName(localStorage.userId, this.props.match.params.id);
    }
  }

  getPriceData = (searchString) => {
    fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${searchString}&outputsize=compact&apikey=MFZK4WADD8FSBHVF`)
      .then(res => res.json())
      .then(data => {
        if (data["Error Message"]) {
          this.setState({
            error: data["Error Message"]
          })
          return;
        }
        const timeSeriesHash = data[`Time Series (${this.state.timeInterval})`];
        const formattedData = Object.keys(timeSeriesHash).map(key => {
          return {
            x: key, 
            y: parseFloat(timeSeriesHash[key]["4. close"])
          };
        });
        fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${searchString}&apikey=dMFZK4WADD8FSBHVF`)
          .then(res => res.json())
          .then(data => {
            this.setState({
              error: null,
              stockData: [{
                id: searchString,
                data: formattedData
              }],
              stockInfo: {
                symbol: data["Symbol"],
                name: data["Name"],
                exchange: data["Exchange"]
              }
            })
          })
      });
  }

  handleSearchSubmit = (searchString) => {
    this.getPriceData(searchString);
  }

  handleTimeInterval = (timeInterval) => {
    this.setState({
    })
  }
  
  handleTrade = () => {
    console.log("trading")
    console.log(this.props);

  }

  render() {
    console.log(this.props);
    return (
      <div>
        <SearchBar 
          handleSearchSubmit={this.handleSearchSubmit} 
          error={this.state.error} 
        />
        <Chart
          stockInfo={this.state.stockInfo}
          data={this.state.stockData}
        />
        <TradeBar 
          entryId={""}
          stockTicker={this.state.stockInfo.symbol}
          handleTrade={this.handleTrade}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentEntry: state.entry.currentEntry,
  currentUser: state.auth.currentUser
})

export default connect(
  mapStateToProps,
  { getEntryByUsernameAndTournamentName }
)(Tournament);
  