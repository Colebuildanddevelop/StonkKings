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
    fetch(`https://api.polygon.io/v1/last_quote/stocks/${this.props.searchString}?apiKey=0HSD1_g6AHAZBDvy1MspyMzGZMlKjokSsoLoTB`)
      .then(res => res.json())
      .then(priceData => {
        this.props.setPrice(priceData.last.askprice.toFixed(2))
      });
  }

  render() {
    return (
      <div>
        <Typography variant="h5">
          Current Price
        </Typography>
        <Typography variant="h6">
          {this.props.currentPrice}
        </Typography>
      </div>
    );
  }
}

export default LatestPrice;
            