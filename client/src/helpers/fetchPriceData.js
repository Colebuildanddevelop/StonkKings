
export const getPriceData = (searchString) => {
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
