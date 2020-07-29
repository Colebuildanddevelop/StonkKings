import React from 'react';
import Countdown from '../components/Countdown';
import AlertDisplay from '../components/AlertDisplay';
import { Link } from 'react-router-dom';
// MATERIAL UI  
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  dialogContainer: {
    backgroundColor: theme.palette.primary.main,
  },
  sharesField: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: 5
  },
  sharesFieldInput: {
    fontSize: 30
  },
  button: {
    borderColor: theme.palette.text.primary,
  }
}));

const TradeModal = (props) => {
  const classes = useStyles();

  // getModalStyle is not a pure function, we roll the style only on the first render

  const calculateResultingBalance = (buyOrSell, currentBalance, amountOfShares, price) => {
      if (buyOrSell === "buy") {
        return (currentBalance - (price * amountOfShares));
      } else {
        return (currentBalance + (price * amountOfShares));
      }
  }

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleModal}
      >
        <Grid className={classes.dialogContainer} container>
          <Grid item xs={6}>
            <DialogTitle id="simple-dialog-title">{props.buyOrSell === "buy" ? "Buy Transaction" : "Sell Transaction"}</DialogTitle>
          </Grid>
          <Grid item xs={6}>
            <DialogTitle id="simple-dialog-title">{props.stockTicker}</DialogTitle>
          </Grid>
          <Grid item xs={6}>
            <DialogContent>
              <DialogContentText>
                Price:
              </DialogContentText>
              <DialogContentText>
                Amount of shares:
              </DialogContentText>
              <DialogContentText>
                Total value:
              </DialogContentText>
              <DialogContentText>
                Resulting Balance:
              </DialogContentText>
            </DialogContent>
          </Grid>
          <Grid item xs={6}>
            <DialogContent>
              <DialogContentText>
                {props.price}
              </DialogContentText>
              <DialogContentText>
                {props.amountOfShares}
              </DialogContentText>
              <DialogContentText>
                {props.amountOfShares * props.price}
              </DialogContentText>
              <DialogContentText>
                {calculateResultingBalance(props.buyOrSell, props.currentEntry.tournamentBalance, props.amountOfShares, props.price)}
              </DialogContentText>
            </DialogContent>
          </Grid>
          <Grid item xs={12}>
            <TextField 
              className={classes.sharesField}
              onChange={props.handleShareField}
              inputProps={{
                className: classes.sharesFieldInput
              }}
              name="shareAmountField"
              type="number" 
              id="standard-basic" 
              label="Amount of shares"
            />
            <DialogActions>
              <Button onClick={props.handleModal} className={classes.button} variant="outlined" autoFocus color="textPrimary" >
                Cancel
              </Button>
              <Button onClick={props.handleTrade} className={classes.button} variant="outlined" color="textPrimary" autoFocus>
                Confirm
              </Button>
            </DialogActions>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}

export default TradeModal;
