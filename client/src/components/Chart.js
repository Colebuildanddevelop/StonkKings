import React from "react";
import { ResponsiveLine } from "@nivo/line";

// re renders with intraday format and daily data...
const Chart = (props) => {
  return (
    <div style={{ height: 400 }}>
      <ResponsiveLine
        theme={{
          grid: {
            line: {
              stroke: "grey",
            },
          },
          axis: {
            ticks: {
              text: {
                fill: "white",
              },
            },
            legend: {
              text: {
                fill: "white",
              },
            },
          },
          crosshair: {
            line: {
              stroke: "white",
            },
          },
        }}
        data={props.data}
        margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
        xScale={{
          type: "time",
          format: props.xScaleFormat,
          precision: "minute",
        }}
        xFormat={props.xFormat}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: false,
          reverse: false,
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
          legendPosition: "middle",
        }}
        axisBottom={{
          format: "%b %d",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          orient: "bottom",
          legendPosition: "middle",
          legend: "date",
          legendOffset: 36,
        }}
        colors={["#64dd17"]}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabel="y"
        pointLabelYOffset={-12}
        useMesh={true}
      />
    </div>
  );
};

export default Chart;
