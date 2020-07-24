import React from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";

const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    margin: theme.spacing(3, 0, 2),
  },
});

class CreateTournament extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AddCircleOutlineIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Tournament Details
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="tournamentName"
              label="Tournament Name"
              name="tournamentName"
              autoFocus
            />
            <TextField
              variant="outlined"
              type="number"
              margin="normal"
              defaultValue="20"
              required
              
              name=""
              label="Max Players"
              id=""
            />
            <InputLabel htmlFor="outlined-adornment-amount">Entry Fee</InputLabel>
            <OutlinedInput
              type="number"
              margin="normal"
              defaultValue="20"
              required
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              name=""
              id="outlined-adornment-amount"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Create Tournament
            </Button>
          </form>
        </div>
      </Container>
    )
  }
}

export default withStyles(useStyles, {withTheme: true})(CreateTournament);