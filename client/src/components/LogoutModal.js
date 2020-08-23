import React from 'react';
import Countdown from '../components/Countdown';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
// MATERIAL UI  
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  dialogContainer: {
    backgroundColor: theme.palette.primary.light
  }
}));

const LogoutModal = (props) => {

  let history = useHistory();

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
    props.handleModal();
  }
  
  const classes = useStyles();
  return (
    <>
      <Dialog
        open={props.open}
        onClose={props.handleModal}
      >
        <Grid className={classes.dialogContainer} container>
          <Button onClick={() => handleLogout()} fullWidth>
            Logout! 
          </Button>
        </Grid>
      </Dialog>
    </>
  );
}

export default LogoutModal;