import React from "react";
import SearchBar from "../components/SearchBar";
import Chart from "../components/Chart";

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
    timeInterval: "Daily",
  }

  componentDidMount() {
    this.getPriceData("IBM");
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
            console.log("fetching stock info", data)
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

  render() {
    console.log(this.state)
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
      </div>
    )
  }
}

export default Tournament;