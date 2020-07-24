import React from "react";
import { connect } from "react-redux";
// MATERIAL UI
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
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

const DateAndTimeSelectors = (props) => {

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        margin="normal"
        id="date-picker-dialog"
        label={props.dateLabel}
        format="MM/dd/yyyy"
        value={props.dateValue}
        onChange={(value) => props.handleChangeTime(value, `selectedDateFor${props.name}`)}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
      <KeyboardTimePicker
        margin="normal"
        id="time-picker"
        label={props.timeLabel}
        value={props.timeValue}
        onChange={(value) => props.handleChangeTime(value, `selectedTimeFor${props.name}`)}
        KeyboardButtonProps={{
          'aria-label': 'change time',
        }}
      />
    </MuiPickersUtilsProvider>
  );
}

class CreateTournament extends React.Component {

  state = {
    tournamentName: "",
    entryLimit: 20,
    entryFee: 100,
    selectedDateForStart: new Date(),
    selectedTimeForStart: new Date(),
    selectedDateForEnd: new Date(),
    selectedTimeForEnd: new Date() 
  }
  
  handleChangeTime = (value, name) => {
    this.setState({
      [name]: value 
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  formatTime = (dateSelected, timeSelected) => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return new Date(`${monthNames[dateSelected.getMonth()]} ${dateSelected.getDate()}, ${dateSelected.getFullYear()} ${timeSelected.getHours()}:${timeSelected.getMinutes()}:${timeSelected.getSeconds()}`).toString();
  }

  createTournamentFetch = (e) => {
    e.preventDefault()
    console.log(this.formatTime(this.state.selectedDateForStart, this.state.selectedTimeForStart))
    fetch("http://localhost:3000/api/tournaments", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "x-access-token": localStorage.token
      },
      body: JSON.stringify({
        name: this.state.tournamentName,
        entryFee: this.state.entryFee,
        entryLimit: this.state.entryLimit,
        startTime: this.formatTime(this.state.selectedDateForStart, this.state.selectedTimeForStart),
        endTime: this.formatTime(this.state.selectedDateForEnd, this.state.selectedTimeForEnd)
      })
    })
    .then(res => res.json())
    .then(console.log)
    .catch(console.log)
  }

  render() {
    console.log(this.state)
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
              value={this.state.name}
              onChange={this.handleChange}
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
              value={this.state.entryLimit}      
              onChange={this.handleChange}        
              variant="outlined"
              type="number"
              margin="normal"
              required
              name="entryLimit"
              label="Max Players"
              id=""
            />
            <InputLabel htmlFor="outlined-adornment-amount">Entry Fee</InputLabel>
            <OutlinedInput
              value={this.state.entryFee}      
              onChange={this.handleChange}        
              type="number"
              required
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              name="entryFee"
              id="outlined-adornment-amount"
            />
            <DateAndTimeSelectors 
              name={"Start"}   
              dateLabel={"Choose start date"}
              timeLabel={"Choose start time"}
              dateValue={this.state.selectedDateForStart}
              timeValue={this.state.selectedTimeForStart}
              handleChangeTime={this.handleChangeTime}
            />
            <DateAndTimeSelectors 
              name={"End"}   
              dateLabel={"Choose end date"}
              timeLabel={"Choose end time"}
              dateValue={this.state.selectedDateForEnd}
              timeValue={this.state.selectedTimeForEnd}
              handleChangeTime={this.handleChangeTime}
            />
            <Button
              onClick={this.createTournamentFetch}
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


