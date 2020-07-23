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

class MyPositions extends React.Component {

  componentDidMount() {
    this.props.getTradesByEntryId(this.props.currentEntry._id)
  }

  consolidatePositionsArr = () => {
    const allTickers = this.props.tradeData.tradesByEntry.map(t => t.stockTicker);
    const uniqueTickers = allTickers.filter((val, index, self) => self.indexOf(val) === index);
    const positions = uniqueTickers.map(ticker => {
      const position = {
        ticker: ticker,
        netShares: 0
      }
      this.props.tradeData.tradesByEntry.forEach(trade => {
        if (trade.stockTicker === ticker) {
          if (trade.buyOrSell === "buy") {
            position.netShares = position.netShares + trade.amountOfShares
          } else {
            position.netShares = position.netShares - trade.amountOfShares
          }
        }
      });
      return position;
    })
    return positions
  }

  render() {
    return (
      <TableContainer component={Paper} >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Stock Name</TableCell>
              <TableCell>Net Shares</TableCell>
            </TableRow>
          </TableHead>
          {this.props.tradeData ? (
            <TableBody>
              {this.consolidatePositionsArr().map((position, idx) => {
                return (
                  <TableRow key={idx}>
                    <TableCell>{position.ticker}</TableCell>
                    <TableCell>{position.netShares}</TableCell>
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
  tradeData: state.trade,
  
});

export default connect(
  mapStateToProps,
  { getTradesByEntryId }
)(MyPositions);