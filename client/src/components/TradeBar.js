import React from "react";
import Button from "@material-ui/core/Button";
import TradeModal from "../components/TradeModal";
import SnackBarDisplay from "../components/SnackBarDisplay";
import { connect } from "react-redux";
import { createTrade, getTradesByEntryId } from "../redux/actions/trade.actions";
// MATERIAL UI
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';


const useStyles = (theme) => ({
  buyButton: {
    width: "30%",
    padding: 8,
    marginRight: 10,
    backgroundColor: theme.palette.text.primary,
    borderColor: theme.palette.text.primary,
    color: theme.palette.primary.dark,
    '&:hover': {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.primary.main
    }
  },
  sellButton: {
    width: "30%",
    padding: 8,
    marginRight: 10,
    backgroundColor: "red",
    borderColor: "red",
    color: theme.palette.primary.dark,
    '&:hover': {
      color: 'red',
      backgroundColor: theme.palette.primary.main
    }
  },
  sharesField: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: 5
  },
  sharesFieldInput: {
    fontSize: 30
  }
});

class TradeBar extends React.Component {

  state = {
    shareAmountField: 1,
    openModal: false,
    openSnackBar: false
  }
  
  handleShareField = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleModal = (e) => {
    this.setState({
      openModal: !this.state.openModal,
      buyOrSell: e.currentTarget.name
    });
  }

  handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({
      openSnackBar: false
    });
  };

  handleClickSnackBar = () => {
    this.setState({
      openSnackBar: true
    });
  };

  handleTrade = async (e) => {
    console.log(e.currentTarget.name)
    await this.props.createTrade({
      entryId: this.props.entryId,
      stockTicker: this.props.stockTicker,
      time: new Date(),
      buyOrSell: this.state.buyOrSell,
      price: this.props.currentPrice,
      amountOfShares: parseInt(this.state.shareAmountField)
    }, localStorage.token)
    await this.props.getTradesByEntryId(this.props.entryId)
    await this.props.getCurrentEntry();
    this.handleModal(e);
    this.handleClickSnackBar();
  }

  render() {
    const { classes } = this.props
    let snackbarmessage = "";
    let snackbarErr = false;
    if (this.props.createdTrade !== []) {
      if (this.props.createdTrade.message) {
        snackbarmessage = this.props.createdTrade.message
        snackbarErr = true;
      } else {
        let buyOrSell = this.props.createdTrade.buyOrSell === 'buy' ? "purchased" : "sold";
        snackbarmessage = `You ${buyOrSell} ${this.props.createdTrade.amountOfShares} share(s) of ${this.props.createdTrade.stockTicker} for $${this.props.createdTrade.price}!`
      }
    }
    return (
      <div>
        <Button onClick={this.handleModal} size="large" name="buy" variant="outlined" className={classes.buyButton}>BUY</Button>
        <Button onClick={this.handleModal} size="large" name="sell" variant="outlined" className={classes.sellButton}>SELL</Button>
        <TradeModal
          handleShareField={this.handleShareField}

          handleTrade={this.handleTrade}
          handleModal={this.handleModal}
          price={this.props.currentPrice}
          stockTicker={this.props.stockTicker}
          amountOfShares={parseInt(this.state.shareAmountField)}
          buyOrSell={this.state.buyOrSell}
          open={this.state.openModal}
          currentEntry={this.props.currentEntry}
        />
        <SnackBarDisplay 
          handleClose={this.handleCloseSnackBar}
          open={this.state.openSnackBar}
          message={snackbarmessage}
          error={snackbarErr}
        />
      </div>
    )
  }
}

export default connect(
  null,
  { createTrade, getTradesByEntryId }
)(withStyles(useStyles, {withTheme: true})(TradeBar));