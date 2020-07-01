import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Timer from './Timer';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    height: 128,
    width: 128,
  }
});

export default class PomodoroTimer extends Component {
  state = {
    isRunning: false,
    isWorking: true,
    isResting: false,
    secondsToWork: 60,
    secondsToRest: 15,
  }

  changeTimerStatus = () => {
    this.setState(prevState => ({
      isWorking: !prevState.isWorking
    }));
  }

  startTimer = () => {
    let { isRunning } = this.state;

    if (!isRunning) {
      this.timer = setInterval(this.countDown, 1000);
    } else {
      clearInterval(this.timer);
    }
    
    this.setState(prevState => ({ isRunning: !prevState.isRunning }));
  }

  countDown = () => {
    let seconds;
    if (this.state.isWorking) {
      seconds = this.state.secondsToWork - 1;
      this.setState({ secondsToWork: seconds });
    } else {
      seconds = this.state.secondsToRest - 1;
      this.setState({ secondsToRest: seconds });
    }
    
    if (seconds == 0) {
      this.changeTimerStatus();

      if (this.state.isWorking) {
        this.setState({ secondsToWork: 60 });
      } else {
        this.setState({ secondsToRest: 15 });
      }
    }
  }
  
  render () {
    return (
      <View>
        {
          this.state.isWorking ? 
          <Timer
            timeText="WORK TIMER"
            seconds={this.state.secondsToWork}
            startTimer={this.startTimer}
            isRunning={this.state.isRunning}
          /> : 
          <Timer
            timeText="BREAK TIMER"
            seconds={this.state.secondsToRest}
            startTimer={this.startTimer}
            isRunning={this.state.isRunning}
          />
        }
      </View>
    )
  }
}
