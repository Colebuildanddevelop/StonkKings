import React from 'react';
import Countdown from './Countdown';
// MATERIAL UI 
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import Avatar from '@material-ui/core/Avatar';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const  headCells = [
  { id: 'username', numeric: false, disablePadding: false, label: 'Username' },
  { id: 'numOfEntries', numeric: true, disablePadding: false, label: 'Number of Entries' },
  { id: 'wins', numeric: true, disablePadding: false, label: 'Wins' },
  { id: 'accountBalance', numeric: true, disablePadding: false, label: 'Account Balance'}
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow className={classes.tableHead}>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  toolbar: {
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.primary.dark
  },
  title: {
    fontWeight: 'bold',
    flexGrow: 1,
  },
  stonkKing: {
    fontWeight: 'bold',
    color: theme.palette.secondary.main,
    paddingRight: 10
  },
}));

const EnhancedTableToolbar = () => {
  const classes = useToolbarStyles();

  return (
    <Toolbar className={classes.toolbar}>
      <Grid container item alignItems="flex-start" justify="flex-end" direction="row" xs={12}>
        <Typography style={{flexGrow: 1}} className={classes.title} variant="h4" id="tableTitle" component="div">
          Leaderboard
        </Typography>

        <Typography align="right" className={classes.stonkKing} variant="h6" id="tableTitle" component="div">
          L33TPikachu
        </Typography>
        <Avatar src={'https://i1.sndcdn.com/avatars-000547985256-ntiz46-t500x500.jpg'} />
      </Grid>
    </Toolbar>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  tableHead: {
    fontWeight: 'bold',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.secondary
  },
  row: {
    fontWeight: 'bold',
    color: theme.palette.primary.dark
  },
  tablePagination: {
    color: theme.palette.primary.dark
  }
}));

const LeaderboardTable = (props) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('accountBalance');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatRows = () => {
    return props.users.map(user => {
      return {
        username: user.username,
        avatar: user.avatar,
        wins: user.wins,
        accountBalance: user.accountBalance,
        numOfEntries: user.entries.length
      }
    })
  }

  const rows = formatRows();
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar  />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                   
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={index}
                    >
                      <TableCell className={classes.row} component="th" scope="row" >
                        <Grid container alignItems="flex-start" direction="row">
                          <Avatar src={row.avatar} />
                          <Typography variant="h5" style={{marginTop: 10, paddingLeft: 10}}>
                            {row.username}
                          </Typography>
                        </Grid>
                      </TableCell>
                      {row.username === "Pikachu" ? (
                        <TableCell className={classes.row} align="right">12</TableCell>
                      ) : (
                        <TableCell className={classes.row} align="right">{row.numOfEntries}</TableCell>
                      )}
                      <TableCell className={classes.row} align="right">{row.wins}</TableCell>
                      <TableCell className={classes.row} align="right">{row.accountBalance}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          className={classes.tablePagination}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default LeaderboardTable;