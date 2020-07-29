import React from "react";
import Button from "@material-ui/core/Button";
import TradeModal from "../components/TradeModal";
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
    color: theme.palette.primary.dark
  },
  sellButton: {
    width: "30%",
    padding: 8,
    marginRight: 10,
    backgroundColor: "red",
    borderColor: "red",
    color: theme.palette.primary.dark
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
    shareAmountField: 0,
    openModal: false
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
  }

  render() {
    const { classes } = this.props
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
      </div>
    )
  }
}

export default connect(
  null,
  { createTrade, getTradesByEntryId }
)(withStyles(useStyles, {withTheme: true})(TradeBar));