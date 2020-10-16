import React from "react";
import CreateTournamentModal from "../components/CreateTournamentModal";
import { SERVER_URL } from "../config";
// MATERIAL UI
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    backgroundColor: theme.palette.primary.main,
    borderRadius: 10,
    padding: 20,
    width: 600,
    margin: "auto",
  },
  titleContainer: {
    marginLeft: "22%",
    marginBottom: 10,
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
  title: {
    marginRight: 10,
    color: theme.palette.text.secondary,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    marginTop: 20,
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.text.secondary,
    "&:hover": {
      backgroundColor: theme.palette.text.primary,
    },
  },
  cssOutlinedInput: {
    "&$cssFocused $notchedOutline": {
      borderColor: `${theme.palette.text.primary} !important`,
    },
  },
  cssLabel: {
    color: "white",
  },
  cssFocused: {},
  notchedOutline: {
    borderWidth: "1px",
    borderColor: `${theme.palette.primary.dark} !important`,
  },
});

const DateAndTimeSelectors = (props) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container>
        <Grid item xs={6} style={{ padding: 5 }}>
          <KeyboardDatePicker
            style={{ width: "100%" }}
            InputLabelProps={{
              style: {
                color: "white",
              },
            }}
            margin="normal"
            id={props.dateLabel}
            label={props.dateLabel}
            format="MM/dd/yyyy"
            value={props.dateValue}
            onChange={(value) =>
              props.handleChangeTime(value, `selectedDateFor${props.name}`)
            }
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </Grid>
        <Grid item xs={6} style={{ padding: 5 }}>
          <KeyboardTimePicker
            style={{ width: "100%" }}
            InputLabelProps={{
              style: {
                color: "white",
              },
            }}
            margin="normal"
            id={props.timeLabel}
            label={props.timeLabel}
            value={props.timeValue}
            onChange={(value) =>
              props.handleChangeTime(value, `selectedTimeFor${props.name}`)
            }
            KeyboardButtonProps={{
              "aria-label": "change time",
            }}
          />
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

class CreateTournament extends React.Component {
  state = {
    modalOpen: false,
    createTournamentLoading: false,
    createTournamentSuccess: null,
    tournamentName: "",
    entryLimit: 20,
    entryFee: 100,
    selectedDateForStart: new Date(),
    selectedTimeForStart: new Date(),
    selectedDateForEnd: new Date(),
    selectedTimeForEnd: new Date(),
  };

  handleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen,
      createTournamentSuccess: false,
    });
  };

  handleChangeTime = (value, name) => {
    this.setState({
      [name]: value,
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  formatTime = (dateSelected, timeSelected) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return new Date(
      `${
        monthNames[dateSelected.getMonth()]
      } ${dateSelected.getDate()}, ${dateSelected.getFullYear()} ${timeSelected.getHours()}:${timeSelected.getMinutes()}:${timeSelected.getSeconds()}`
    ).toString();
  };

  createTournamentFetch = () => {
    this.setState({
      createTournamentLoading: true,
    });
    fetch(`${SERVER_URL}/api/tournaments`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "x-access-token": localStorage.token,
      },
      body: JSON.stringify({
        name: this.state.tournamentName,
        entryFee: this.state.entryFee,
        entryLimit: this.state.entryLimit,
        startTime: this.formatTime(
          this.state.selectedDateForStart,
          this.state.selectedTimeForStart
        ),
        endTime: this.formatTime(
          this.state.selectedDateForEnd,
          this.state.selectedTimeForEnd
        ),
      }),
    })
      .then((res) => res.json())
      .then((createdTournament) => {
        this.setState({
          createTournamentLoading: false,
          createTournamentSuccess: true,
        });
      })
      .catch(console.log);
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.paper}>
        <Grid
          className={classes.titleContainer}
          item
          xs={12}
          container
          direction="row"
          alignItems="center"
        >
          <Grid item className={classes.title}>
            <Typography color="" variant="h4">
              Tournament Details
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <AddCircleOutlineIcon />
            </Avatar>
          </Grid>
        </Grid>
        <TextField
          style={{ margin: 5 }}
          color="primary"
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
        <Grid item xs={6} style={{ padding: 5 }}>
          <TextField
            fullWidth={true}
            value={this.state.entryLimit}
            onChange={this.handleChange}
            variant="outlined"
            type="number"
            margin="normal"
            required
            name="entryLimit"
            label="Max Players"
            id=""
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
        </Grid>
        <Grid item xs={6} style={{ padding: 5 }}>
          <TextField
            value={this.state.entryFee}
            fullWidth={true}
            onChange={this.handleChange}
            variant="outlined"
            type="number"
            margin="normal"
            required
            name="entryFee"
            label="Entry Fee"
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
              },
            }}
            InputProps={{
              style: {
                color: "white",
              },
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
              },
            }}
            id=""
          />
        </Grid>
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
          onClick={this.handleModal}
          fullWidth
          variant="contained"
          className={classes.submit}
        >
          Create Tournament
        </Button>
        <CreateTournamentModal
          createTournamentLoading={this.state.createTournamentLoading}
          createTournamentSuccess={this.state.createTournamentSuccess}
          open={this.state.modalOpen}
          handleModal={this.handleModal}
          createTournament={this.createTournamentFetch}
          tournamentName={this.state.tournamentName}
          entryLimit={this.state.entryLimit}
          entryFee={this.state.entryFee}
          startTime={this.formatTime(
            this.state.selectedDateForStart,
            this.state.selectedTimeForStart
          )}
          endTime={this.formatTime(
            this.state.selectedDateForEnd,
            this.state.selectedTimeForEnd
          )}
        />
      </Grid>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(CreateTournament);
