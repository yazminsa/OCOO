import React, { Component } from 'react';
//import './Clock.css';

class Clock extends Component {
  constructor(props) {
    super(props);

    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div><p>La hora actual: <label>{this.state.date.toLocaleTimeString()} </label> </p></div>
    );
  }
}

export default Clock;
