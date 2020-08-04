import React from 'react';
import Countdown from '../components/Countdown';
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
    backgroundColor: theme.palette.primary.light,
  },
  dialogHeader: {
    backgroundColor: theme.palette.primary.dark
  },
  dialogTitle: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  dialogContent: {
    color: theme.palette.primary.dark,
    fontSize: 20,
    fontWeight: 'bold',
    border: 1,
    borderColor: theme.palette.primary.dark
  }, 
  textFieldContainer: {
    paddingLeft: 20
  },
  sharesField: {
    width: "60%",
    backgroundColor: theme.palette.primary.main,
    borderRadius: 5
  },
  sharesFieldInput: {
    padding: 10,
    paddingLeft: 20,
    fontSize: 30,
    fontWeight: 'bold'
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
        return (Math.round(currentBalance - (price * amountOfShares) ) * 100 / 100).toFixed(2);
      } else {
        return (Math.round(currentBalance + (price * amountOfShares) ) * 100 / 100).toFixed(2);
      }
  }

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleModal}
        style={{opacity: 10}}
      >
        <Grid className={classes.dialogContainer} container>
          <Grid item container xs={12} className={classes.dialogHeader}>
            <Grid item xs={6}>
              {props.buyOrSell === "buy" ? (
                <DialogTitle className={classes.dialogTitle} id="simple-dialog-title">Buy Transaction</DialogTitle>
              ) : (
                <DialogTitle style={{color: "red"}} className={classes.dialogTitle} id="simple-dialog-title">Sell Transaction</DialogTitle>
              )}
            </Grid>
            <Grid container item alignItems="flex-start" justify="flex-end" direction="row" xs={6}>
              <DialogTitle className={classes.dialogTitle} id="simple-dialog-title">{props.stockTicker}</DialogTitle>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <DialogContent >
              <DialogContentText className={classes.dialogContent}>
                Price:
              </DialogContentText>
              <DialogContentText className={classes.dialogContent}>
                Amount of shares:
              </DialogContentText>
              <DialogContentText className={classes.dialogContent}>
                Total value:
              </DialogContentText>
              <DialogContentText className={classes.dialogContent}>
                Resulting Balance:
              </DialogContentText>
            </DialogContent>
          </Grid>
          <Grid item xs={6}>
            <DialogContent>
              <DialogContentText className={classes.dialogContent}>
                {props.price}
              </DialogContentText>
              <DialogContentText className={classes.dialogContent}>
                {props.amountOfShares}
              </DialogContentText>
              <DialogContentText className={classes.dialogContent}>
                {(Math.round(props.amountOfShares * props.price * 100) / 100).toFixed(2)}
              </DialogContentText>
              <DialogContentText className={classes.dialogContent}>
                {calculateResultingBalance(props.buyOrSell, props.currentEntry.tournamentBalance, props.amountOfShares, props.price)}
              </DialogContentText>
            </DialogContent>
          </Grid>
          <Grid item xs={12} className={classes.textFieldContainer}>
            <TextField 
              defaultValue={1}
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
          </Grid>
          <Grid item xs={12}>
            <DialogActions>
              <Button onClick={props.handleModal} className={classes.button} variant="outlined" autoFocus color="inherit" >
                Cancel
              </Button>
              <Button onClick={props.handleTrade} className={classes.button} variant="outlined" color="inherit" autoFocus>
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
