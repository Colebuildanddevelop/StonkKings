import React from "react";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";

const DisplayErrors = (props) => {
  for (let field in props.authErrors) {
    console.log(props.authErrors[field]);
    props.enqueueSnackbar(props.authErrors[field], { variant: "error" });
  }
  return null;
};

const mapStateToProps = (state) => ({
  authErrors: state.auth.error,
});

export default withSnackbar(connect(mapStateToProps)(DisplayErrors));
