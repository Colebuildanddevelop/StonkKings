import React from "react";
import { ResponsiveLine } from '@nivo/line';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  stockInfo: {
    display: 'inline-block'
  }
}));

const Chart = (props) => {
  const classes = useStyles(); 
  return (
    <div>
      {props.stockInfo ? (
        <div>
          <Typography variant="h5" className={classes.stockInfo}>
            {props.stockInfo.name}
          </Typography>
          <Typography variant="subtitle1" className={classes.stockInfo}>
            {props.stockInfo.exchange}
          </Typography>
          <Typography variant="h6" className={classes.stockInfo}>
            {props.stockInfo.symbol}
          </Typography>
        </div>
      ) : null}
      <div style={{height: 400}}>
        <ResponsiveLine
          data={props.data}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{
            type: "time",
            format: "%Y-%m-%d"
          }}
          xFormat="time:%Y-%m-%d"
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: false,
            reverse: false
          }}
          axisTop={null}
          axisRight={null}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "price",
            legendOffset: -40,
            legendPosition: "middle"
          }}
          axisBottom={{
            format: "%b %d",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            orient: "bottom",
            legendPosition: "middle",
            legend: "date",
            legendOffset: 36
          }}
          colors={{ scheme: "category10" }}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabel="y"
          pointLabelYOffset={-12}
          useMesh={true}
        />
      </div> 
    </div>
  )
}

export default Chart;