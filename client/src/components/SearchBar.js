import React from "react";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.main
  },
  paper: {
    backgroundColor: theme.palette.primary.main
  },
  popper: {
    backgroundColor: theme.palette.primary.main
  },
  input: {
    backgroundColor: theme.palette.primary.main
  },
  inputFocused: {
    backgroundColor: theme.palette.primary.main,
  },
  groupLabel: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.secondary
  },
  option: {
    backgroundColor: theme.palette.primary.main
  },

  inputRoot: {
    backgroundColor: theme.palette.primary.main,
    "&.MuiFormLabel-root.Mui-focused": {
      color: theme.palette.text.secondary
    }
  }
}));

const SearchBar = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const handleInputChange = (e, value) => {
    fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${value}&apikey=3VP9375JIOYD1569`)
      .then(res => res.json())
      .then(results => {
        console.log(results.bestMatches)
        setOptions(results.bestMatches || []);
        console.log(options)
      })
    console.log(e.currentTarget.value)
  }

  const handleSelected = (e, val) => {
    console.log(val)
    if (val !== null) {
      props.handleSearchSubmit(val["1. symbol"]);
    }
  }

  return (
    <Autocomplete
      classes={classes}
      id="asynchronous-demo"
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option["2. name"]}
      options={options}
      loading={loading}
      onInputChange={handleInputChange}
      onChange={handleSelected}
      ListboxProps={{
        className: classes.listBox
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search stocks..."
          variant="outlined"
          name="search"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}

export default SearchBar;



