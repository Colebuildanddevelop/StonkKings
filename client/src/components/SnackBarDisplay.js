import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { withStyles } from "@material-ui/core/styles";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const useStyles = (theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
});

class SnackBarDisplay extends React.Component {
  state = {
    open: false,
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Snackbar
          open={this.props.open}
          autoHideDuration={6000}
          onClose={this.props.handleClose}
          anchorOrigin={{
            horizontal: "right",
            vertical: "bottom",
          }}
        >
          {this.props.error === true ? (
            <Alert onClose={this.props.handleClose} severity="error">
              {this.props.message}
            </Alert>
          ) : (
            <Alert onClose={this.props.handleClose} severity="success">
              {this.props.message}
            </Alert>
          )}
        </Snackbar>
      </div>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(SnackBarDisplay);
