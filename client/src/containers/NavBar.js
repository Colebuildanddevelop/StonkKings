import React from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// Material UI 
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  nav: {
    backgroundColor: theme.palette.primary.dark
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    textDecoration: 'none',
    marginRight: 30
  },
  userContainer: {
    padding: 10,
    alignContent: "right"
  }, 
  username: {
    paddingTop: 10
  },
  credits: {
    paddingLeft: 5
  },
  loginButton: {
    backgroundColor: theme.palette.text.primary
  }
});

class NavBar extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.nav}>
          <Toolbar>
            <Typography component={Link} to={"/"} variant="h4" color="textPrimary" className={classes.title}>
              STONKKINGS
            </Typography>
            <Typography component={Link} to={"/"} variant="h6" color="textPrimary" className={classes.title}>
              Lobby
            </Typography>
            <Typography component={Link} to={"/"} variant="h6" color="textPrimary" className={classes.title}>
              My Tournaments
            </Typography>
            <Typography component={Link} to={"/"} variant="h6" color="textPrimary" style={{flexGrow: 1}} className={classes.title}>
              Leaderboard        
            </Typography>
            {this.props.currentUser && !this.props.currentUser.message ? 
            (
              <div>
                <Grid container className={classes.userContainer}>
                  <Grid item xs={4}>
                  </Grid>
                  <Grid item xs={2}>
                    <Avatar src={this.props.currentUser.avatar}/>
                  </Grid>
                  <Grid item xs={3} className={classes.username}>
                    <Typography variant="h6" align="left">
                      {this.props.currentUser.username}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className={classes.credits} align="right" variant="h6" color="textPrimary">
                      Stonk Credits: {this.props.currentUser.accountBalance}
                    </Typography>
                  </Grid>
                </Grid>
              </div>
            ) : (
              <Button 
                className={classes.loginButton}
                variant="contained"
                component={Link}
                to={"/login"} 
              >
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
})

export default connect(
  mapStateToProps
)(withStyles(useStyles, {withTheme: true})(NavBar));