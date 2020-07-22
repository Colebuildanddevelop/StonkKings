import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import { createTrade } from "../redux/actions/trade.actions";
// MATERIAL UI
import { withStyles } from '@material-ui/core/styles';

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

  // handleTrade = (e) => {
    // this.props.createTrade({
      // entryId: "",
      // stockTicker: "",
      // time: new Date.now(),
      // buyOrSell: e.target.name,
      // price: "",
      // amountOfShares: ""
    // })
  // }

  render() {
    const { classes } = this.props
    return (
      <div>
        <Button onClick={this.props.handleTrade} name="buy" className={classes.buyButton}>BUY</Button>
        <Button name="sell" className={classes.sellButton}>SELL</Button>
      </div>
    )
  }
}

export default connect(
  null,
  { createTrade }
)(withStyles(useStyles)(TradeBar));