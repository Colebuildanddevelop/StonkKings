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
    padding: 5,
    textAlign: 'right'
  },
  dialogBox: {
    backgroundColor: theme.palette.primary.dark,
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
              open={this.props.open}
              onClose={this.props.handleModal}
            >
              <Grid container className={classes.dialogBox}>
                <Grid item xs={6}>
                  <DialogTitle id="simple-dialog-title">{this.props.tournamentInfo.name}</DialogTitle>
                </Grid>
                <Grid item xs={6}>
                  <DialogTitle className={classes.timer} id="simple-dialog-title">
                    <Countdown countDownEnd={new Date(this.props.tournamentInfo.startTime).getTime()} overMsg={"Started!"}/>
                  </DialogTitle>
                  <DialogTitle className={classes.timer} id="simple-dialog-title">
                    <Countdown countDownEnd={new Date(this.props.tournamentInfo.endTime).getTime()} overMsg={"Ended!"}/>
                  </DialogTitle>
                </Grid>
                <Grid item xs={6}>
                  <DialogContent>
                    {this.props.currentUser ? (
                      <div>
                        <DialogContentText>
                          Your Credits: {this.props.currentUser.accountBalance} 
                        </DialogContentText>
                        <DialogContentText>
                          Entry Fee: - {this.props.tournamentInfo.entryFee} 
                        </DialogContentText>
                        <DialogContentText>
                          Resulting Balance: {this.props.currentUser.accountBalance - this.props.tournamentInfo.entryFee} 
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
                      Entries: {this.props.tournamentInfo.entries ? this.props.tournamentInfo.entries.length : null} / {this.props.tournamentInfo.entryLimit}
                    </DialogContentText>
                    <DialogContentText>
                      Current prize pool: {this.props.tournamentInfo.entries ? this.props.tournamentInfo.entries.length * this.props.tournamentInfo.entryFee : null}
                    </DialogContentText>
                  </DialogContent>
                </Grid>
                <Grid item xs={12}>
                  {this.props.entered ? (
                    <DialogActions>
                      <Button autoFocus color="primary" component={Link} to={`/tournament/${this.props.tournamentInfo.id}`}>
                        Enter Tournament
                      </Button>
                    </DialogActions>
                  ) : (
                    <DialogActions>
                      <Button autoFocus color="primary" onClick={this.props.handleModal}>
                        Cancel
                      </Button>
                      <Button onClick={() => this.handleSignUp()} color="primary" autoFocus>
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
