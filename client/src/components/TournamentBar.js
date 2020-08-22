import React from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import withMediaQuery from '../higherOrderComponents/withMediaQuery';
// Material UI 
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const useStyles = (theme) => ({
  root: {
  },
  paper: {
    backgroundColor: theme.palette.primary.main 
  }, 
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    textDecoration: 'none',
    marginRight: 30
  },
  mobileTitles: {


  },
  button: {
    backgroundColor: theme.palette.primary.dark,
    color: 'bolder'
  }
});

const TournamentInformation = (props) => {
  return (
    <>
      <Typography onClick={() => props.setView("buy/sell")} variant="h6" color="inherit" className={props.classes.title}>
        Buy/Sell
      </Typography>
      <Typography onClick={() => props.setView("tradeHistory")} variant="h6" color="inherit" className={props.classes.title}>
        Trade History
      </Typography>
      <Typography onClick={() => props.setView("allEntrants")} variant="h6" color="inherit" style={{flexGrow: 1}} className={props.classes.title}>
        All Entrants
      </Typography>
      {props.currentEntry && !props.currentEntry.message ? (
        <Typography style={{margin: 0}} variant="h6" color="inherit" className={props.classes.title}>
          Tournament Balance: {props.currentEntry.tournamentBalance.toFixed(2)}
        </Typography>
      ) : (
        null
      )}
    </>
  )
} 

class TournamentBar extends React.Component {

  state = {
    drawerOpen: false 
  }

  setViewAndCloseDrawer = (view) => {
    this.props.setView(view);
    this.setState({
      drawerOpen: false
    });
  }

  render() {
    const { classes } = this.props;
    console.log(this.props.mediaQuery)
    return (
      <>
        <AppBar position="static" color="secondary">
          <Toolbar>
            {this.props.mediaQuery ? (
              <>
                <TournamentInformation
                  setView={this.props.setView}
                  currentEntry={this.props.currentEntry}
                  classes={classes}
                />
              </>
            ) : (
              <>
                <Button className={classes.button} onClick={() => this.setState({ drawerOpen: true })} fullWidth>
                  Tournament Information
                </Button>
                <SwipeableDrawer 
                  classes={{ paper: classes.paper }} 
                  open={this.state.drawerOpen} 
                  onClose={() => this.setState({ drawerOpen: false })} 
                  anchor="top"
                >
                  <div style={{ padding: 20, textAlign: "center" }}>
                    {this.props.currentEntry && !this.props.currentEntry.message ? (
                      <Typography variant="h6" color="inherit" className={classes.title}>
                        Tournament Balance: {this.props.currentEntry.tournamentBalance.toFixed(2)}
                      </Typography>
                    ) : (
                      null
                    )}
                    <Typography className={classes.title} onClick={() => this.setViewAndCloseDrawer("buy/sell")} variant="h6" color="inherit">
                      Buy/Sell
                    </Typography>
                    <Typography className={classes.title} onClick={() => this.setViewAndCloseDrawer("tradeHistory")} variant="h6" color="inherit">
                      Trade History
                    </Typography>
                    <Typography className={classes.title} onClick={() => this.setViewAndCloseDrawer("allEntrants")} variant="h6" color="inherit" style={{flexGrow: 1}}>
                      All Entrants
                    </Typography>


                  </div>
                </SwipeableDrawer>

              </>
            )}
          </Toolbar>
        </AppBar>
      </>
    );
  }
}

const mapStateToProps = state => ({
  currentEntry: state.entry.currentEntry,
  currentUser: state.auth.currentUser
})

export default connect(
  mapStateToProps
)(withStyles(useStyles, {withTheme: true})(withMediaQuery('(min-width:770px)')(TournamentBar)));