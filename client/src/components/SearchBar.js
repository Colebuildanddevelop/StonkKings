import React from "react";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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

class SearchBar extends React.Component {

  state = {
    search: ""
  }

  handleSearchTerm = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }  

  render() {
    const { classes } = this.props; 
    return (
      <div>
        <div className={classes.search}  >
          <div className={classes.searchIcon} >
            <SearchIcon  />
          </div>
          <InputBase
            placeholder="Search..."
            name="search"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
            onChange={this.handleSearchTerm}
            value={this.state.search}
          />
          <Button onClick={() => this.props.handleSearchSubmit(this.state.search)}>Search</Button>
        </div>
        {this.props.error ? (
          <Typography>
            {this.props.error}
          </Typography>
        ) : (null)}
      </div>
    );
  }
}

export default withStyles(useStyles, {withTheme: true})(SearchBar);



