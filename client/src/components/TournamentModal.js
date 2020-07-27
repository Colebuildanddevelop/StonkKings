import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
}));

const TournamentModal = (props) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  console.log(props)
  return (
    <div>
      {props.tournamentInfo ? (
        <div>
          <Dialog
            open={props.open}
            onClose={props.handleModal}
          >
            <DialogTitle id="simple-dialog-title">{props.tournamentInfo.name}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Let Google help apps determine location. This means sending anonymous location data to
                Google, even when no apps are running.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button autoFocus color="primary">
                Disagree
              </Button>
              <Button color="primary" autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      ) : null};
    </div>
  );
}

export default TournamentModal;


        // <div className={classes.paper}>
          // <Typography>
            // {props.tournamentInfo.name}
          // </Typography>
          // <Typography>
            // Are you sure? 
          // </Typography>
          // <Button>
            // Yes
          // </Button>
          // <Button>
            // Cancel
          // </Button>
        // </div>
        // ): null}


