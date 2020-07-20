import React from "react";
import SearchBar from "../components/SearchBar";
import Chart from "../components/Chart";

class Tournament extends React.Component {

  state = {
    stockData: [{
      id: "IBM",
      data: [{
        x: "2020-06-01",
        y: 1
      }]
    }],
    currentSearch: "IBM",
    timeInterval: "Daily",
    queryString: "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&outputsize=compact&apikey=MFZK4WADD8FSBHVF"
  }

  componentDidMount() {
    fetch(this.state.queryString)
      .then(res => res.json())
      .then(data => {
        const timeSeriesHash = data[`Time Series (${this.state.timeInterval})`];
        const formattedData = Object.keys(timeSeriesHash).map(key => {
          console.log(key)
          return {
            x: key, 
            y: parseFloat(timeSeriesHash[key]["4. close"])
          };
        });
        this.setState({
          stockData: [{
            id: this.state.currentSearch,
            data: formattedData
          }] 
        })
      });
  }

  handleSearchSubmit = (searchString) => {
    this.setState({
      queryString: `https://www.alphavantage.co/query?function=${this.state.timeInterval}&symbol=${searchString}&interval=5min&outputsize=full&apikey=MFZK4WADD8FSBHVF`,
      currentSearch: searchString
    })
  }

  handleTimeInterval = (timeInterval) => {
    this.setState({
      queryString: `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${this.state.currentSearch}&interval=${timeInterval}&outputsize=full&apikey=MFZK4WADD8FSBHVF`
    })
  }

  render() {
    console.log(this.state.stockData)
    return (
      <div>
        <SearchBar handleSearchSubmit={this.handleSearchSubmit} />
        <div style={{height: 400}}>
          <Chart
            data={this.state.stockData}
          />
        </div>
      </div>
    )
  }
}

export default Tournament;