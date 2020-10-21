import React from "react";
import { connect } from "react-redux";
import { logout } from "../redux/actions/auth.actions";
// MATERIAL UI
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  dialogContainer: {
    backgroundColor: theme.palette.primary.light,
  },
}));

const LogoutModal = (props) => {
  const classes = useStyles();
  return (
    <>
      <Dialog open={props.open} onClose={props.handleModal}>
        <Grid className={classes.dialogContainer} container>
          <Button onClick={() => props.logout()} fullWidth>
            Logout!
          </Button>
        </Grid>
      </Dialog>
    </>
  );
};

export default connect(null, { logout })(LogoutModal);
