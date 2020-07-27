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
        <Grid container>
          <Grid item xs={12}>
            <DialogTitle id="simple-dialog-title">Create Tournament</DialogTitle>
          </Grid>
          <Grid item xs={12}>
            <DialogContent>
              <DialogContentText>
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
              <Button onClick={props.handleModal} autoFocus color="primary" >
                Cancel
              </Button>
              <Button onClick={props.createTournament} color="primary" autoFocus>
                Create
              </Button>
            </DialogActions>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}

export default CreateTournamentModal;
