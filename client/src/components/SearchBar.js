import React from "react";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = theme => ({
  search: {
    position: "relative",
    borderRadius: 10,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.25),
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.primary
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  }
});

// class SearchBar extends React.Component {

  // state = {
    // search: ""
  // }

  // handleSearchTerm = (e) => {
    // this.setState({
      // [e.target.name]: e.target.value
    // })
  // }  

  // render() {
    // const { classes } = this.props; 
    // return (
      // <div>
        // <div className={classes.search}  >
          // <div className={classes.searchIcon} >
            // <SearchIcon  />
          // </div>
          // <InputBase
            // placeholder="Search..."
            // name="search"
            // classes={{
              // root: classes.inputRoot,
              // input: classes.inputInput,
            // }}
            // inputProps={{ 'aria-label': 'search' }}
            // onChange={this.handleSearchTerm}
            // value={this.state.search}
          // />
          // <Button onClick={() => this.props.handleSearchSubmit(this.state.search)}>Search</Button>
        // </div>
        // {this.props.error ? (
          // <Typography>
            // {this.props.error}
          // </Typography>
        // ) : (null)}
      // </div>
    // );
  // }
// }



const SearchBar = (props) => {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [currentSelected, setCurrentSelected] = React.useState({});
  const [search, setSearch] = React.useState("")
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
    setSearch(e.currentTarget.value)
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
      id="asynchronous-demo"
      style={{ width: 300 }}
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

export default withStyles(useStyles, {withTheme: true})(SearchBar);



