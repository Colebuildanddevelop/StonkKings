import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  buyButton: {
    backgroundColor: "green",
    color: "white"
  },
  sellButton: {
    backgroundColor: "red",
    color: "white"
  }
}));

const TradeBar = () => {
  const classes = useStyles();
  return (
    <div>
      <Button className={classes.buyButton}>BUY</Button>
      <Button className={classes.sellButton}>SELL</Button>
    </div>
  )
}

export default TradeBar;