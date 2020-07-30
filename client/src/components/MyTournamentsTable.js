import React from 'react';
import Countdown from './Countdown';
import { Link } from "react-router-dom";
// MATERIAL UI 
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
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
  { id: 'name', numeric: false, disablePadding: false, label: 'Tournament Name' },
  { id: 'entryFee', numeric: true, disablePadding: false, label: 'Entry Fee' },
  { id: 'entries', numeric: true, disablePadding: false, label: 'Entries'},
  { id: 'totalPrize', numeric: true, disablePadding: false, label: 'Total Prize' },
  { id: 'start', numeric: true, disablePadding: false, label: 'Start' },
  { id: 'end', numeric: true, disablePadding: false, label: 'End' },
  { id: 'enter', numeric: true, disablePadding: false, label: 'Enter' },
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
    flexGrow: 1,
  }
}));

const EnhancedTableToolbar = () => {
  const classes = useToolbarStyles();

  return (
    <Toolbar className={classes.toolbar}>
      <Typography className={classes.title} variant="h4" id="tableTitle" component="div">
        My Tournaments
      </Typography>
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
  },
  enterButton: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.dark,
    width: 20,
    '&:hover': {
      backgroundColor: theme.palette.text.primary
    }
  }
}));

const MyTournamentsTable = (props) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('start');
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
    return props.tournamentsArr.map(tournament => {
      return {
        tournament: tournament,
        name: tournament.name,
        entryFee: tournament.entryFee,
        entries: tournament.entries.length,
        totalPrize: tournament.entryFee * tournament.entries.length,
        start: tournament.startTime,
        end: tournament.endTime
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
                        {row.name}
                      </TableCell>
                      <TableCell className={classes.row} align="right">{row.entryFee}</TableCell>
                      <TableCell className={classes.row} align="right">{row.entries}</TableCell>
                      <TableCell className={classes.row} align="right">{row.totalPrize}</TableCell>
                      <TableCell className={classes.row} align="right">
                        <Countdown className={classes.row} countDownEnd={new Date(row.start).getTime()} overMsg={"Started!"}/>
                      </TableCell>
                      <TableCell className={classes.row} align="right">
                        <Countdown className={classes.row} countDownEnd={new Date(row.end).getTime()} overMsg={"Ended!"}/>
                      </TableCell>
                      <TableCell className={classes.row} align="right">
                        <Button className={classes.enterButton} variant="outlined" autoFocus component={Link} to={`/tournament/${row.tournament.id}`}>
                          Enter
                        </Button>
                      </TableCell>
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

export default MyTournamentsTable;