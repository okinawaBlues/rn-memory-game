import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

export default class Score extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.scoreContainer}>
        <Text style={styles.score}>
          You have found {this.props.score} pairs in the game!
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scoreContainer: {
    flex: 1,
    alignItems: "center"
  },
  score: {
    fontSize: 20,
    fontWeight: "bold"
  },
  username: {
    fontSize: 15
  }
});
