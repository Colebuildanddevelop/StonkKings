import React from 'react';
import { connect } from 'react-redux';
import { auth } from "../redux/actions/auth.actions";
// MATERIAL UI
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Stonk Kings
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = (theme) => ({
  root: {
    
  },
  image: {
    backgroundImage: 'url(https://images.pexels.com/photos/189528/pexels-photo-189528.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  mainContainer: {
    backgroundColor: theme.palette.primary.main
  },
  paper: {
     margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    backgroundColor: theme.palette.primary.dark,
    margin: theme.spacing(3, 0, 2),
  },
  input: {
    '&$cssFocused $notchedOutline': {
      borderColor: `${theme.palette.text.primary} !important`,
    }
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: `${theme.palette.text.primary} !important`,
    }
  },
  cssLabel: {
    color: 'white'
  },
  cssFocused: {
    color: 'white'
  },
  notchedOutline: {
    borderWidth: '1px',
    borderColor: `${theme.palette.primary.dark} !important`
  },

});

class Login extends React.Component {
  state = {
    signIn: true
  }

  componentDidUpdate() {
    if (this.props.loggedIn) {
      console.log("pushing")
      this.props.history.push('/lobby')
    }
  }

  setSignIn = (bool) => {
    this.setState({signIn: bool})
  }

  handleField = (e) => {
    this.setState({
      [e.target.name]: e.target.value 
    })
  }
  
  handleLogin = async () => {
    const log = await this.props.auth({username: this.state.username, password: this.state.password}, "signIn")
    if (log.message) {
      console.log(log.message)
    } else {
      this.props.logIn();
      this.props.history.push('/lobby')
    }
  }

  handleSignUp = async () => {
    const log = await this.props.auth({username: this.state.username, password: this.state.password, email: this.state.email}, "signUp")
    if (log.message) {
      console.log(log.message)
    } else {
      this.props.logIn()
      this.props.history.push('/lobby')
    }
  }
   
  render() {
    const { classes } = this.props;
    console.log(this.props.loggedIn)

    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className={classes.mainContainer}>
          <div className={classes.paper}>
            <Typography style={{marginBottom: 100, fontWeight: 'bold'}} component="h3" variant="h1">
              Stonk Kings!
            </Typography>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="username"
                label="Username"
                name="username"
                onChange={this.handleField}
                InputLabelProps={{
                  classes: {
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                  },
                }}
                InputProps={{
                  classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline,
                  },
                }}
              />
              {!this.state.signIn ? (
                <TextField
                  onChange={this.handleField}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  
                  InputLabelProps={{
                    classes: {
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.cssOutlinedInput,
                      focused: classes.cssFocused,
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                />
              ) : null}
              <TextField
                onChange={this.handleField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                InputLabelProps={{
                  classes: {
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                  },
                }}
                InputProps={{
                  classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline,
                  },
                }}
              />
            
              <FormControlLabel
                control={<Checkbox value="remember" color="secondary" />}
                label="Remember me"
              />
              {this.state.signIn ? (
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={() => this.handleLogin()}
                >
                  Sign In
                </Button>

              ) : (
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={() => this.handleSignUp()}
                >
                  Sign up 
                </Button>
              )}
              <Grid container>
                <Grid item>
                  {this.state.signIn ? (
                    <Link onClick={() => this.setSignIn(false)} style={{color: 'white'}} variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  ) : (
                    <Link onClick={() => this.setSignIn(true)} style={{color: 'white'}} variant="body2">
                      {"Already have an account? Sign in"}
                    </Link>
                  )}
                </Grid>
              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    );

  }
}



export default connect(
  null,
  {auth}
)(withStyles(useStyles, {withTheme: true})(Login))
    