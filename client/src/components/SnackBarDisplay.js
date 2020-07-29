import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { withStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = (theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
});

// put open state in parent component,
//  when trade is created handle open in handle trade function,
// pass results of created trade to be displayed in snasckbar

class SnackBarDisplay extends React.Component {

  state = {
    open: false
  }


  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Snackbar
          open={this.props.open} 
          autoHideDuration={6000} 
          onClose={this.props.handleClose}
          anchorOrigin={{
            horizontal: 'right',
            vertical: 'bottom'
          }}
        >
          {this.props.error === true ? (
            <Alert 
              onClose={this.props.handleClose}
              severity="error"
            >
              {this.props.message}
            </Alert>
          ) : (
            <Alert 
              onClose={this.props.handleClose}
              severity="success"
            >
              {this.props.message}
            </Alert>
          )}
        </Snackbar>
      </div>
    );
  }
}

export default withStyles(useStyles, {withTheme: true})(SnackBarDisplay);


        // <Alert severity="warning">This is a warning message!</Alert>
        // <Alert severity="info">This is an information message!</Alert>
        // <Alert severity="success">This is a success message!</Alert>