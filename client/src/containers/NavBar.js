import React from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import LogoutModal from '../components/LogoutModal';
// Material UI 
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

const useStyles = (theme) => ({
  nav: {
    backgroundColor: theme.palette.primary.dark
  },
  title: {
    fontWeight: 'bold',
    textDecoration: 'none',
    paddingRight: 30
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

  state = { 
    modalOpen: false
  }

  handleLogoutModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    })
  }

  render() {
    const { classes } = this.props;
    console.log(this.state)
    return (
      <div >
        <AppBar position="static" className={classes.nav}>
          <Toolbar>
            <Typography component={Link} to={"/lobby"} variant="h4" color="textPrimary" className={classes.title}>
              STONKKINGS
            </Typography>
            <Typography component={Link} to={"/lobby"} variant="h6" color="textPrimary" className={classes.title}>
              Lobby
            </Typography>
            <Typography component={Link} to={"/my-tournaments"} variant="h6" color="textPrimary" className={classes.title}>
              My Tournaments
            </Typography>
            <Typography component={Link} to={"/leaderboard"} variant="h6" color="textPrimary" className={classes.title}>
              Leaderboard        
            </Typography>
            <div style={{flexGrow: 1}}>
              <Button 
                variant="outlined" 
                color="secondary"
                component={Link}
                to={`/create-tournament`}
              >
                Create a Tournament
              </Button>

            </div>
            {this.props.currentUser && !this.props.currentUser.message ? 
            (
              <div>
                <Grid className={classes.userContainer} container>
                  <Grid item xs={4}>
                  </Grid>
                  <Grid item xs={2}>
                    <Avatar onClick={this.handleLogoutModal} src={this.props.currentUser.avatar}/>
                  </Grid>
                  <Grid item xs={3} className={classes.username}>
                    <Typography style={{fontWeight: 'bold'}} variant="h6" align="left">
                      {this.props.currentUser.username}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className={classes.credits} align="right" variant="h6" color="textPrimary">
                      Stonk Credits: {this.props.currentUser.accountBalance}
                    </Typography>
                  </Grid>
                  <LogoutModal handleModal={this.handleLogoutModal} open={this.state.modalOpen} />
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