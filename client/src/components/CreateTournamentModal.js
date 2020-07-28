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
  dialogBox: {
    backgroundColor: theme.palette.primary.light,
    
  },
  title: {
    backgroundColor: theme.palette.primary.dark
  }

}));

const CreateTournamentModal = (props) => {
  const classes = useStyles();

  // getModalStyle is not a pure function, we roll the style only on the first render
  console.log(props)

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleModal}
      >
        <Grid container className={classes.dialogBox}>
          <Grid item xs={12} className={classes.title}>
            <DialogTitle id="simple-dialog-title">Create Tournament</DialogTitle>
          </Grid>
          {!props.createTournamentSuccess ? (
            <div>
              <Grid item xs={12}>
                <DialogContent>
                  <DialogContentText >
                    Tournament Name: {props.tournamentName}
                  </DialogContentText>
                  <DialogContentText>
                    Max Entries: {props.entryLimit}
                  </DialogContentText>
                  <DialogContentText>
                    Entry Fee: {props.entryFee}
                  </DialogContentText>
                  <DialogContentText>
                    Start Time: {props.startTime}
                  </DialogContentText>
                  <DialogContentText>
                    End Time: {props.endTime}
                  </DialogContentText>
                </DialogContent>
              </Grid>
              <Grid item xs={12}>
                <DialogActions>
                  <Button variant="outlined" onClick={props.handleModal}>
                    Cancel
                  </Button>
                  <Button variant="outlined" onClick={props.createTournament}>
                    Create
                  </Button>
                </DialogActions>
              </Grid>
            </div>
          ) : (
            <div>
              <Grid item xs={12}>
                <DialogContent>
                  <DialogContentText >
                    Tournament was created! 
                  </DialogContentText>
                </DialogContent>
              </Grid>
              <Grid item xs={12}>
                <DialogActions>
                  <Button variant="outlined">
                    Go to lobby!
                  </Button>
                </DialogActions>
              </Grid>
            </div>
          )}
        </Grid>
      </Dialog>
    </div>
  );
}

export default CreateTournamentModal;
