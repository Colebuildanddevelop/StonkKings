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
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    top: '50%',
    left: '35%',
    backgroundColor: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  timer: {
    padding: 5,
    textAlign: 'right'
  }
}));

const TournamentModal = (props) => {
  const classes = useStyles();
  const isUserEntered = () => {
    let hasEntered = false;
    props.tournamentInfo.entries.forEach(entry => {
      props.currentUser.entries.forEach(userEntry => {
        if (entry === userEntry) {
          hasEntered = true;
        }
      });
    });
    return hasEntered;
  }
  // getModalStyle is not a pure function, we roll the style only on the first render

  return (
    <div>
      {props.tournamentInfo ? (
        <div>
          <Dialog
            open={props.open}
            onClose={props.handleModal}
          >
            <Grid container>
              <Grid item xs={6}>
                <DialogTitle id="simple-dialog-title">{props.tournamentInfo.name}</DialogTitle>
              </Grid>
              <Grid item xs={6}>
                <DialogTitle className={classes.timer} id="simple-dialog-title">
                  <Countdown countDownEnd={new Date(props.tournamentInfo.startTime).getTime()} overMsg={"Started!"}/>
                </DialogTitle>
                <DialogTitle className={classes.timer} id="simple-dialog-title">
                  <Countdown countDownEnd={new Date(props.tournamentInfo.endTime).getTime()} overMsg={"Ended!"}/>
                </DialogTitle>
              </Grid>
              <Grid item xs={6}>
                <DialogContent>
                  {props.currentUser ? (
                    <div>
                      <DialogContentText>
                        Your Credits: {props.currentUser.accountBalance} 
                      </DialogContentText>
                      <DialogContentText>
                        Entry Fee: - {props.tournamentInfo.entryFee} 
                      </DialogContentText>
                      <DialogContentText>
                        Resulting Balance: {props.currentUser.accountBalance - props.tournamentInfo.entryFee} 
                      </DialogContentText>
                    </div>
                  ) : (
                    <DialogContentText>
                      Please login!
                    </DialogContentText>
                  )}
                </DialogContent>
              </Grid>
              <Grid item xs={6}>
                <DialogContent>
                  <DialogContentText>
                    Entries: {props.tournamentInfo.entries ? props.tournamentInfo.entries.length : null} / {props.tournamentInfo.entryLimit}
                  </DialogContentText>
                  <DialogContentText>
                    Current prize pool: {props.tournamentInfo.entries ? props.tournamentInfo.entries.length * props.tournamentInfo.entryFee : null}
                  </DialogContentText>
                </DialogContent>
              </Grid>
              <Grid item xs={12}>
                {(props.tournamentInfo.entries && isUserEntered()) ? (
                  <DialogActions>
                    <Button autoFocus color="primary" component={Link} to={`/tournament/${props.tournamentInfo.id}`}>
                      Enter Tournament
                    </Button>
                  </DialogActions>
                ) : (
                  <DialogActions>
                    <Button autoFocus color="primary" onClick={props.handleModal}>
                      Cancel
                    </Button>
                    <Button onClick={() => props.handleEnter(props.tournamentInfo.id)} color="primary" autoFocus>
                      Sign Up
                    </Button>
                  </DialogActions>
                )}
              </Grid>
            </Grid>
            <AlertDisplay />
          </Dialog>
        </div>
      ) : null};
    </div>
  );
}

export default TournamentModal;
