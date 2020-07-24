import React from "react";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { createTrade, getTradesByEntryId } from "../redux/actions/trade.actions";
// MATERIAL UI
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const useStyles = () => ({
  buyButton: {
    backgroundColor: "green",
    color: "white"
  },
  sellButton: {
    backgroundColor: "red",
    color: "white"
  }
});

class TradeBar extends React.Component {

  state = {
    shareAmountField: 0
  }
  
  handleShareField = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  
  handleTrade = async (e) => {
    await this.props.createTrade({
      entryId: this.props.entryId,
      stockTicker: this.props.stockTicker,
      time: new Date(),
      buyOrSell: e.currentTarget.name,
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
        <Button onClick={this.handleTrade} name="buy" className={classes.buyButton}>BUY</Button>
        <Button onClick={this.handleTrade} name="sell" className={classes.sellButton}>SELL</Button>
        <TextField 
          onChange={this.handleShareField} 
          value={this.state.shareAmount} 
          name="shareAmountField"
          type="number" 
          id="standard-basic" 
          label="Amount of shares"
        />
      </div>
    )
  }
}

export default connect(
  null,
  { createTrade, getTradesByEntryId }
)(withStyles(useStyles)(TradeBar));