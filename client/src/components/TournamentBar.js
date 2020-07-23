import React from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// Material UI 
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    textDecoration: 'none',
    marginRight: 30
  },
});

class TournamentBar extends React.Component {
  render() {
    console.log(this.props.currentEntry)
    const { classes } = this.props;
    if (!this.props.currentEntry) return null;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="secondary">
          <Toolbar>
            <Typography component={Link} to={"/"} variant="h6" color="inherit" className={classes.title}>
              Buy/Sell
            </Typography>
            <Typography component={Link} to={"/"} variant="h6" color="inherit" className={classes.title}>
              Trade History
            </Typography>
            <Typography component={Link} to={"/"} variant="h6" color="inherit" style={{flexGrow: 1}} className={classes.title}>
              All Entrants
            </Typography>
            <Typography component={Link} to={"/"} variant="h6" color="inherit"  className={classes.title}>
              Account Balance: {this.props.currentEntry.tournamentBalance.toFixed(2)}
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentEntry: state.entry.currentEntry,
  currentUser: state.auth.currentUser
})

export default connect(
  mapStateToProps
)(withStyles(useStyles, {withTheme: true})(TournamentBar));