import React from "react";
import { connect } from "react-redux";
import { getEntryByUsernameAndTournamentName } from "../redux/actions/entry.actions";
import { getTradesByEntryId } from "../redux/actions/trade.actions";
import { getEntriesByTournamentId } from "../redux/actions/entry.actions"

// COMPONENTS
import SearchBar from "../components/SearchBar";
import Chart from "../components/Chart";
import TradeBar from "../components/TradeBar";
import LatestPrice from "../components/LatestPrice";
import MyPositions from "../components/MyPositions";
import TournamentBar from "../components/TournamentBar";
import TradeHistoryTable from "../components/TradeHistoryTable";
import AllEntrantsTable from "../components/AllEntrantsTable";

// MATERIAL UI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = (theme) => ({
  searchBar: {
    backgroundColor: theme.palette.primary.main,
    width: '100%',
    marginTop: 30,
    marginBottom: 30
  },
  chartContainer: {
    backgroundColor: theme.palette.primary.dark,
    borderRadius: 5
  }
});

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
    currentView: "buy/sell",
    xScaleFormat: "%Y-%m-%d",
    xFormat: "time:%Y-%m-%d"
  }

  componentDidMount() {
    this.getPriceData("IBM", "TIME_SERIES_DAILY");
    this.props.getEntriesByTournamentId(this.props.match.params.id);
    console.log(this.props.tournaments.filter(tournament => tournament.id === this.props.match.params.id));
    if (localStorage.userId) {
      this.handleGetCurrentEntry();
    }
  }

  componentDidUpdate() { 

  }

  getPriceData = (searchString, timeFunction="IBM", intradayInterval="") => {
    const queryString = this.formatPriceQuery(searchString, timeFunction, intradayInterval)
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
                let xScaleFormat = "%Y-%m-%d"
                let xFormat = "time:%Y-%m-%d"
                if (intradayInterval !== "") {
                  xScaleFormat = "%Y-%m-%d %H:%M:%S";
                  xFormat = "time:%Y-%m-%d %H:%M:%S";
                }
                this.setState({
                  error: null,
                  stockData: [{
                    id: searchString,
                    data: formattedData
                  }],
                  stockInfo: {
                    symbol: stockInfo["Symbol"],
                    name: stockInfo["Name"],
                    exchange: stockInfo["Exchange"],
                    sector: stockInfo["Sector"]
                  },
                  currentPrice: priceData["Global Quote"]["05. price"],
                  xFormat: xFormat,
                  xScaleFormat: xScaleFormat
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
    if (intradayInterval === "") {
      this.getPriceData(this.state.currentSearch, timeFunction);
    } else {
      this.getPriceData(this.state.currentSearch, timeFunction, intradayInterval)
    }
  }

  formatPriceQuery = (searchString, timeFunction, intradayInterval="") => {
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
    const { classes } = this.props;
    return (
      <div>
        <TournamentBar setView={this.changeView} />
        {this.state.currentView === "buy/sell" ? (
          <div style={{width: "95%", margin: "auto"}}>
            <Grid container>
              <Grid item className={classes.searchBar}>
                <SearchBar 
                  handleSearchSubmit={this.handleSearchSubmit} 
                  error={this.state.error} 
                />
              </Grid>
              <Grid container >
                {this.state.stockInfo ? (
                  <Grid container item justify="space-between" item xs={12} md={6}>
                    <div>
                      <div style={{display: 'flex'}}>
                        <Typography variant="h5" className={classes.stockInfo}>
                          {this.state.stockInfo.name}
                        </Typography>
                        <Typography style={{marginLeft: 10}} variant="h6" className={classes.stockInfo}>
                          {this.state.stockInfo.symbol}
                        </Typography>
                      </div>
                      <div>
                        <Typography>
                          {this.state.stockInfo.sector}
                        </Typography>
                      </div>
                    </div>
                  </Grid>
                ) : null}
                <Grid container item xs={12} md={6} style={{marginTop: 30}} alignItems="flex-start" justify="flex-end" direction="row">
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
                  <Button onClick={() => this.handleChangeTimeFunction("TIME_SERIES_INTRADAY", "15min")}>
                    15 min
                  </Button>
                </Grid>
              </Grid>
              <Grid item xs={12} className={classes.chartContainer}>
                <Chart
                  stockInfo={this.state.stockInfo}
                  data={this.state.stockData}
                  xFormat={this.state.xFormat}
                  xScaleFormat={this.state.xScaleFormat}
                />
              </Grid>
              {this.props.currentEntry && !this.props.currentEntry.message ? (
                <Grid container item xs={12}>
                  <Grid item xs={6} style={{marginTop: 10}}>
                    <TradeBar 
                      getCurrentEntry={this.handleGetCurrentEntry}
                      createdTrade={this.props.createdTrade}
                      currentEntry={this.props.currentEntry}
                      currentPrice={this.state.currentPrice}
                      stockTicker={this.state.stockInfo.symbol}
                      entryId={this.props.currentEntry._id || null} 
                    />
                  </Grid>
                  <Grid container item alignItems="flex-start" justify="flex-end" direction="row" xs={6}>
                    <LatestPrice 
                      searchString={this.state.stockInfo.symbol}
                      setPrice={this.setPrice}
                      currentPrice={this.state.currentPrice}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MyPositions tradeData={this.props.tradeData} />
                  </Grid>
                </Grid>
              ): (null)}
            </Grid>
          </div>
        ) : null}
        {this.state.currentView === "tradeHistory" ? (
          <div>
            <TradeHistoryTable data={this.props.tradeData.tradesByEntry}/>
          </div>
        ) : null}
        {this.state.currentView === "allEntrants" ? (
          <div>
            <AllEntrantsTable data={this.props.entries} /> 
          </div>
        ) : null}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentEntry: state.entry.currentEntry,
  entries: state.entry.tournamentEntries,
  currentUser: state.auth.currentUser,
  createdTrade: state.trade.createdTrade,
  tradeData: state.trade,
  tournaments: state.tournament.tournamentsArr,
});

export default connect(
  mapStateToProps,
  { getEntryByUsernameAndTournamentName, getTradesByEntryId, getEntriesByTournamentId }
)(withStyles(useStyles, {withTheme: true})(Tournament));
  
