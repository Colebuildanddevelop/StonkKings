import React from "react";
import { connect } from "react-redux";
import { getTradesByEntryId } from "../redux/actions/trade.actions";
// MATERIAL UI  
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography } from "@material-ui/core";

class TradeHistory extends React.Component {

  formatDate = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
  }

  render() {
    console.log(this.props)
    if (this.props.currentEntry.message) return <Typography>Enter this tournament to make some trades</Typography>
    return (
      <TableContainer component={Paper} >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Stock Name</TableCell>
              <TableCell>Time Traded</TableCell>
              <TableCell>Buy Or Sell</TableCell>
              <TableCell># of Shares</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          {this.props.trades ? (
            <TableBody>
              {this.props.trades.map((position, idx) => {
                const formattedDate = this.formatDate(new Date(position.time)) 
                return (
                  <TableRow key={idx}>
                    <TableCell>{position.stockTicker}</TableCell>
                    <TableCell>{formattedDate}</TableCell>
                    <TableCell>{position.buyOrSell}</TableCell>
                    <TableCell>{position.amountOfShares}</TableCell>
                    <TableCell>{position.price}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          ) : null}
        </Table>
      </TableContainer>    
    )
  }
}

const mapStateToProps = state => ({
  trades: state.trade.tradesByEntry,
  currentEntry: state.entry.currentEntry
});

export default connect(
  mapStateToProps,
  { getTradesByEntryId }
)(TradeHistory);