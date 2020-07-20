import React from "react";
import { ResponsiveLine } from '@nivo/line';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.



const Chart = (props) => (
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
        legend: 'transportation',
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
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1
              }
            }
          ]
        }
      ]}
    />
)

export default Chart;