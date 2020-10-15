import React from "react";
import { useHistory } from "react-router-dom";
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
  let history = useHistory();

  const handleLogout = () => {
    localStorage.clear();
    history.push("/");
    props.handleModal();
    window.location.reload(false);
  };

  const classes = useStyles();
  return (
    <>
      <Dialog open={props.open} onClose={props.handleModal}>
        <Grid className={classes.dialogContainer} container>
          <Button onClick={() => handleLogout()} fullWidth>
            Logout!
          </Button>
        </Grid>
      </Dialog>
    </>
  );
};

export default LogoutModal;
