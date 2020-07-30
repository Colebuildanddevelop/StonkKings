import React from "react";
import TableCell from '@material-ui/core/TableCell';

class Countdown extends React.Component {

  state = {
    countdown: "loading..."
  }
  
  componentDidMount() {
    const intervalId = setInterval(this.countdown, 1000)
    this.setState({intervalId: intervalId})
  }

  componentWillUnmount() {
    console.log("unmounting")
    clearInterval(this.state.intervalId)
  }
  
  countdown = () => {
    let now = new Date().getTime();

    let timeleft = this.props.countDownEnd - now;
        
    // Calculating the days, hours, minutes and seconds left
    let days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    let hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
        
    // Result is output to the specific element
      
    // Display the message when countdown is over
    this.setState({
      countdown: `${days} days, ${hours}:${minutes}:${seconds}`
    })
    if (timeleft < 0) {
      // clearInterval(this.state.intervalId);
      this.setState({
        countdown: this.props.overMsg 
      })
    }
  }

  render() {
    return (
      this.state.countdown
    )
  }
}

export default Countdown;