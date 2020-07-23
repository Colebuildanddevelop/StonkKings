import React from "react";
// MATERIAL UI  
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class MyPositions extends React.Component {

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
          <TableBody>
            {this.props.positions.map((position, idx) => {
              console.log(position)
              return (
                <TableRow key={idx}>
                  <TableCell>{position.ticker}</TableCell>
                  <TableCell>{position.netShares}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>    
    )
  }
}

export default MyPositions;