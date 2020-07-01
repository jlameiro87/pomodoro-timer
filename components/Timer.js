import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  timeText: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingTop: 10
  },
  secs: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  circleShapeView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 150,
    borderRadius: 150/2,
    border: '3px solid',
    borderColor: 'blue',
  },
});

export default function Timer (props) {
  const [time, setTime] = useState({ "h": 0, "m": 0, "s": 0 });

  useEffect(() => {
    secondsToTime(props.seconds);
  });

  const addLeadingZeros = (value) => {
    value = String(value);
    while (value.length < 2) {
      value = '0' + value;
    }
    return value;
  }

  const secondsToTime = (secs) => {
    let hours = Math.floor(secs / (60 * 60))
    let divisor_for_minutes = secs % (60 * 60)
    let minutes = Math.floor(divisor_for_minutes / 60)

    let divisor_for_seconds = divisor_for_minutes % 60
    let seconds = Math.ceil(divisor_for_seconds)

    setTime({
      "h": hours,
      "m": minutes,
      "s": seconds
    });
  }

  const getTitle = () => {
    return props.isRunning ? "Stop" : "Start";
  }

  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>
        {props.timeText}
      </Text>
      <View style={styles.circleShapeView}>
        <Text style={styles.secs}>
          {addLeadingZeros(time.m)}:{addLeadingZeros(time.s)}
        </Text>
      </View>
      <Button title={getTitle()} onPress={props.startTimer} />
    </View>
  );
}