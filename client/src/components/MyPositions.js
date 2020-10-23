import React from "react";
// MATERIAL UI
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

const headCells = [
  {
    id: "ticker",
    numeric: false,
    disablePadding: false,
    label: "Ticker Symbol",
  },
  {
    id: "averagePrice",
    numeric: false,
    disablePadding: false,
    label: "Average Price",
  },
  {
    id: "netShares",
    numeric: false,
    disablePadding: false,
    label: "Net Shares",
  },
];

const EnhancedTableHead = (props) => {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow className={classes.tableHead}>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  tableHead: {
    fontWeight: "bold",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.secondary,
    width: "100%",
  },
  row: {
    fontWeight: "bold",
    color: theme.palette.primary.dark,
  },
  tablePagination: {
    color: theme.palette.primary.dark,
  },
}));

const MyPositions = (props) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("entryFee");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  let hasPositions = false;
  const consolidatePositionsArr = () => {
    const allTickers = props.tradeData.tradesByEntry.map((t) => t.stockTicker);
    const uniqueTickers = allTickers.filter(
      (val, index, self) => self.indexOf(val) === index
    );
    const positions = uniqueTickers.map((ticker) => {
      const position = {
        ticker: ticker,
        netShares: 0,
        averagePrice: 0,
      };
      let sharePriceXNumOfSharesSum = 0;
      let totalShares = 0;
      props.tradeData.tradesByEntry.forEach((trade) => {
        if (trade.stockTicker === ticker) {
          if (trade.buyOrSell === "buy") {
            sharePriceXNumOfSharesSum += trade.amountOfShares * trade.price;
            totalShares += trade.amountOfShares;

            position.netShares = position.netShares + trade.amountOfShares;
          } else {
            position.netShares = position.netShares - trade.amountOfShares;
          }
        }
      });
      position.averagePrice = sharePriceXNumOfSharesSum / totalShares;
      if (position.netShares > 0) {
        hasPositions = true;
      }
      return position;
    });

    return positions;
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
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
    return consolidatePositionsArr().filter((position) => {
      if (position.netShares > 0) {
        return {
          ticker: position.ticker,
          netShares: position.netShares,
          averagePrice: (Math.round(position.averagePrice * 100) / 100).toFixed(
            2
          ),
        };
      }
      return null;
    });
  };

  const rows = formatRows();
  return (
    <div>
      {hasPositions ? (
        <div className={classes.root}>
          <Paper className={classes.paper}>
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
                          <TableCell
                            className={classes.row}
                            component="th"
                            scope="row"
                          >
                            {row.ticker}
                          </TableCell>
                          <TableCell className={classes.row} align="left">
                            {row.averagePrice.toFixed(2)}
                          </TableCell>
                          <TableCell className={classes.row} align="left">
                            {row.netShares}
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
      ) : null}
    </div>
  );
};

export default MyPositions;
