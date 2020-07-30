import React from 'react';
import Countdown from '../components/Countdown';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
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
  },
  textContainer: {
    display: 'flex'  
  },
  text: {
    fontWeight: 'bold',
    color: theme.palette.primary.dark
  },
  lobbyButton: {
    width: '100%',
    fontWeight: 'bold',
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.text.secondary,
   '&:hover': {
     backgroundColor: theme.palette.text.primary,
   }
  },
  createButton: {
    backgroundColor: theme.palette.text.primary,
    color: theme.palette.primary.dark,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.text.secondary
   }
  },
  cancelButton: {
    backgroundColor: theme.palette.primary.main
  }

}));

const CreateTournamentModal = (props) => {
  const classes = useStyles();
  const history = useHistory();

  // getModalStyle is not a pure function, we roll the style only on the first render
  console.log(props)

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleModal}
      >
        <Grid container className={classes.dialogBox}>
          {!props.createTournamentSuccess ? (
            <div>
              <Grid item xs={12} className={classes.title}>
                <DialogTitle id="simple-dialog-title">Create Tournament</DialogTitle>
              </Grid>
              <Grid item container xs={12}>
                <DialogContent>
                  <DialogContentText className={classes.text}>
                    Tournament Name: {props.tournamentName}
                  </DialogContentText>
                  <DialogContentText className={classes.text}>
                    Max Entries: {props.entryLimit}
                  </DialogContentText>
                  <DialogContentText className={classes.text}>
                    Entry Fee: {props.entryFee}
                  </DialogContentText>
                  <DialogContentText className={classes.text}>
                    Start Time: {props.startTime}
                  </DialogContentText>
                  <DialogContentText className={classes.text}>
                    End Time: {props.endTime}
                  </DialogContentText>
                </DialogContent>
              </Grid>
              <Grid item xs={12}>
                <DialogActions>
                  <Button className={classes.cancelButton}variant="outlined" onClick={props.handleModal}>
                    Cancel
                  </Button>
                  <Button className={classes.createButton} variant="primary" onClick={props.createTournament}>
                    Create
                  </Button>
                </DialogActions>
              </Grid>
            </div>
          ) : (
            <div>
              <Grid item xs={12} className={classes.title}>
                <DialogTitle id="simple-dialog-title">Tournament Successfully Created!</DialogTitle>
              </Grid>
              <Grid item xs={12}>
                <DialogActions>
                  <Button className={classes.lobbyButton} onClick={() => history.push('/')} variant="contained">
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
