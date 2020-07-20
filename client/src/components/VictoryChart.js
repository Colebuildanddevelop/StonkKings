import React from "react";
import { 
  VictoryChart,
  VictoryAxis,
  VictoryCandlestick,
  VictoryLine,
  VictoryTheme,
  VictoryBrushContainer,
  VictoryZoomContainer,
  createContainer
} from 'victory';

const data = [
  {x: new Date(1982, 1, 1), y: 125},
  {x: new Date(1987, 1, 1), y: 257},
  {x: new Date(1993, 1, 1), y: 345},
  {x: new Date(1997, 1, 1), y: 515},
  {x: new Date(2001, 1, 1), y: 132},
  {x: new Date(2005, 1, 1), y: 305},
  {x: new Date(2011, 1, 1), y: 270},
  {x: new Date(2015, 1, 1), y: 470}
]
console.log(data)

class Chart extends React.Component {

  state = {};
  
  handleZoom(domain) {
    this.setState({selectedDomain: domain});
  }

  handleBrush(domain) {
    this.setState({zoomDomain: domain});
  }

  render() {
    const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi")
    return (
      <div>
          <VictoryChart
            width={1000}
            height={400}
            scale={{x: "time"}}
            containerComponent={
              <VictoryZoomVoronoiContainer responsive={false}
                zoomDimension="x"
                zoomDomain={this.state.zoomDomain}
                onZoomDomainChange={this.handleZoom.bind(this)}
                labels={({ datum }) => `${(datum.x.getMonth()+1)}/${datum.x.getDate()}/${datum.x.getFullYear()}, $${datum.y}`}
      
              />
            }
          >
            <VictoryLine
              style={{
                data: {stroke: "blue"}
              }}
              data={this.props.data}
            />

          </VictoryChart>

          <VictoryChart
            width={1000}
            height={90}
            scale={{x: "time"}}
            padding={{top: 0, left: 50, right: 50, bottom: 30}}
            containerComponent={
              <VictoryBrushContainer responsive={false}
                brushDimension="x"
                brushDomain={this.state.selectedDomain}
                onBrushDomainChange={this.handleBrush.bind(this)}
              />
            }
          >
            <VictoryAxis
              tickValues={[
                new Date(2000, 1, 1),
                new Date(2005, 1, 1),
                new Date(2010, 1, 1),
                new Date(2015, 1, 1), 
                new Date(2020, 1, 1)
              ]}
              tickFormat={(x) => new Date(x).getFullYear()}
            />
            <VictoryLine
              style={{
                data: {stroke: "blue"}
              }}
              data={this.props.data}
            />
          </VictoryChart>
      </div>
    );
  }
}

export default Chart;
