import React from "react";
import Typography from "@material-ui/core/Typography";

class LatestPrice extends React.Component {

  componentDidMount() {
    const intervalId = setInterval(this.fetchPrice, 1000)
    this.setState({ intervalId: intervalId });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  fetchPrice = () => {
    console.log(this.props.searchString)
    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${this.props.searchString}&apikey=3VP9375JIOYD1569`)
      .then(res => res.json())
      .then(priceData => {
        console.log(priceData)
        this.props.setPrice(priceData["Global Quote"]["05. price"])
      });
  }

  render() {
    return (
      <div>
        <Typography variant="h5">
          Current Price
        </Typography>
        <Typography variant="h6">
          ${this.props.currentPrice}
        </Typography>
      </div>
    );
  }
}

export default LatestPrice;
            