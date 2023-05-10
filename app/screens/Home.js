import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  Alert
} from "react-native";

export default class Home extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
  }

  render() {
    // const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.topContent}>
          <Text style={styles.bigText} />
          <Image
            style={{ width: 300, height: 100 }}
            source={require("../img/logo.png")}
          />
        </View>

        <View style={styles.mainContent}>
           <Text style={styles.label}>Choose level: </Text>

          <Button
            onPress={() => this.props.navigation.push("Game")}
            title="Easy (4x4) "
            color="#87499d"
          />
          <Button
            onPress={() => this.props.navigation.navigate("Game2")}
            title="Advanced ( 4x6 ) "
            color="#87499d"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  topContent: {
    flex: 1,
    marginBottom: -100,
    justifyContent: "center"
  },
  bigText: {
    fontSize: 25,
    fontWeight: "bold"
  },
  mainContent: {
    flex: 1,
    marginBottom: -150
  },
  label: {
    marginBottom: 5,
    justifyContent: "center",
    fontSize: 15,
    fontWeight: "bold",
    color: "#333"
  },
  textField: {
    width: 200,
    height: 40,
    borderColor: "#bfbfbf",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10
  }
});
