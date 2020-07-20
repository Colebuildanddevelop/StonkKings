import React from "react";
import SearchBar from "../components/SearchBar";
import Chart from "../components/Chart";

class Tournament extends React.Component {

  state = {
    stockData: [{}],
    currentSearch: "",
    timeInterval: "Daily",
    queryString: "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&outputsize=full&apikey=MFZK4WADD8FSBHVF"
  }

  componentDidMount() {
    fetch(this.state.queryString)
      .then(res => res.json())
      .then(data => {
        const timeSeriesHash = data[`Time Series (${this.state.timeInterval})`];
        const formattedData = Object.keys(timeSeriesHash).map(key => {
          return {
            x: new Date(key),
            y: parseInt(timeSeriesHash[key]["4. close"])
          };
        });
        console.log(formattedData)
        this.setState({
          stockData: formattedData
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
    return (
      <div>
        <SearchBar handleSearch={this.handleSearchSubmit} />
        <Chart
          data={this.state.stockData}
        />
      </div>
    )
  }
}

export default Tournament;