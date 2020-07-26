import React from "react";
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

class AlertDisplay extends React.Component {

  state = {
    open: true
  }

  render () {
    if (this.props.entry && this.props.entry.message) {
      return (
        <Collapse in={this.state.open}>
          <Alert onClick={() => this.setState({open: false})} severity="error">{this.props.entry.message}</Alert>
        </Collapse>
      )
    } else {
      return null
    }
  }
}

const mapStateToProps = state => ({
  auth: state.auth.currentUser || null,
  entry: state.entry.createdEntry || null
});

export default connect(
  mapStateToProps 
)(AlertDisplay); 

// when props change display alert
// on click hide alert

// props change again show alert
// make display state in parent....
    // when clicked parent display false
      // cause parent and child to re render but wont show child 
      // when child props change 