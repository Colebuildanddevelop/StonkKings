import React from 'react';
import Countdown from '../components/Countdown';
import { Link } from 'react-router-dom';
// MATERIAL UI  
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = (theme) => ({
  timer: {
    textAlign: 'right'
  },
  paper: {
    margin: 0
  },
  dialogTitle: {
    backgroundColor: theme.palette.primary.dark,
  },
  dialogContainer: {
    backgroundColor: theme.palette.primary.light
  },
  dialogContent: {
    fontWeight: 'bold',
    color: theme.palette.primary.dark
  }, 
  calcContainer: {
    borderBottom: 1,
    borderColor: 'black',
    display: 'flex'
  },
  calcTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.palette.primary.dark,
    flexGrow: 1 
  },
  enterButton: {
    width: '100%',
    fontWeight: 'bold',
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.text.secondary,
   '&:hover': {
     backgroundColor: theme.palette.text.primary,
   }
  },
  signUpButton: {
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
});

// updates and sets entered to true, and never gets reset to false. 
// when clicked sign in current user is updated but curr tournament clicked info is not 
// tournament info only updated on click tournament row which row info is updated when handleenter 


class TournamentModal extends React.Component {
  
  state = {
    entered: false
  }

  handleSignUp = () => {
    this.props.handleEnter(this.props.tournamentInfo.id)
    this.setState({
      entered: !this.state.entered
    }) 
  }
  
  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.props.tournamentInfo ? (
          <div>
            <Dialog
              classes={{
                paper: classes.paper
              }}
              open={this.props.open}
              onClose={this.props.handleModal}
            >
              <Grid className={classes.dialogContainer} container >
                <Grid className={classes.dialogTitle} container item xs={12}>
                  <Grid item xs={6}>
                    <DialogTitle id="simple-dialog-title">{this.props.tournamentInfo.name}</DialogTitle>
                  </Grid>
                  {new Date(this.props.tournamentInfo.startTime) > new Date() ? (
                    <Grid item xs={6}>
                      <DialogTitle className={classes.timer} id="simple-dialog-title">
                        Starts: <Countdown countDownEnd={new Date(this.props.tournamentInfo.startTime).getTime()} overMsg={"Started!"}/>
                      </DialogTitle>
                    </Grid>
                  ) : (
                    <Grid item xs={6}>
                      {new Date(this.props.tournamentInfo.endTime) > new Date() ? (
                        <DialogTitle className={classes.timer} id="simple-dialog-title">
                          Ends: <Countdown countDownEnd={new Date(this.props.tournamentInfo.endTime).getTime()} overMsg={"Ended!"}/>
                        </DialogTitle>
                      ) : (
                      <DialogTitle className={classes.timer} id="simple-dialog-title">
                        Tournament has ended.
                      </DialogTitle>
                      )}
                    </Grid>
                  )}
                </Grid>
                <Grid item container xs={6}>
                  <DialogContent className={classes.dialogContent}>
                    {this.props.currentUser ? (
                      <div>
                        <Grid className={classes.calcContainer} item xs={12}>
                          <DialogContentText className={classes.calcTitle}>
                            Your Credits: 
                          </DialogContentText>
                          <DialogContentText className={classes.dialogContent}>
                            {this.props.currentUser.accountBalance} 
                          </DialogContentText>
                        </Grid>
                        <Grid className={classes.calcContainer} item xs={12}>
                          <DialogContentText className={classes.calcTitle}>
                            Entry Fee: 
                          </DialogContentText>
                          <DialogContentText className={classes.dialogContent}>
                            - {this.props.tournamentInfo.entryFee} 
                          </DialogContentText>
                        </Grid>
                        <Grid className={classes.calcContainer} item xs={12}>
                          <DialogContentText className={classes.calcTitle}>
                            Resulting Balance: 
                          </DialogContentText>
                          <DialogContentText className={classes.dialogContent}>
                            {this.props.currentUser.accountBalance - this.props.tournamentInfo.entryFee} 
                          </DialogContentText>
                        </Grid>
                      </div>
                    ) : (
                      <DialogContentText>
                        Please login!
                      </DialogContentText>
                    )}
                  </DialogContent>
                </Grid>
                <Grid item container xs={6}>
                  <DialogContent className={classes.dialogContent}>
                    <Grid className={classes.calcContainer} item xs={12}>
                      <DialogContentText className={classes.calcTitle}>
                        Entries:
                      </DialogContentText>
                      <DialogContentText className={classes.dialogContent}>
                        {this.props.tournamentInfo.entries ? this.props.tournamentInfo.entries.length : null} / {this.props.tournamentInfo.entryLimit}
                      </DialogContentText>
                    </Grid>
                    <Grid className={classes.calcContainer} item xs={12}>
                      <DialogContentText className={classes.calcTitle}>
                        Total prize pool:
                      </DialogContentText>
                      <DialogContentText className={classes.dialogContent}>
                        {this.props.tournamentInfo.entries ? this.props.tournamentInfo.entries.length * this.props.tournamentInfo.entryFee : null}
                      </DialogContentText>
                    </Grid>
                  </DialogContent>
                </Grid>
                <Grid item xs={12}>
                  {this.props.entered ? (
                    <DialogActions>
                      <Button className={classes.enterButton} variant="contained" autoFocus component={Link} to={`/tournament/${this.props.tournamentInfo.id}`}>
                        Enter Tournament
                      </Button>
                    </DialogActions>
                  ) : (
                    <DialogActions>
                      <Button className={classes.cancelButton} autoFocus variant="outlined" onClick={this.props.handleModal}>
                        Cancel
                      </Button>
                      <Button className={classes.signUpButton} onClick={() => this.handleSignUp()} color="primary" autoFocus>
                        Sign Up
                      </Button>
                    </DialogActions>
                  )}
                </Grid>
              </Grid>
            </Dialog>
          </div>
        ) : null}
      </div>
    );
  }
}

export default withStyles(useStyles, {withTheme: true})(TournamentModal);
