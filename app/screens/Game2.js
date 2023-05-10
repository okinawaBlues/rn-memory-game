import React, { Component } from "react";
import { View, Button, FlatList, Alert, StyleSheet } from "react-native";
import { FontAwesome, Entypo } from "@expo/vector-icons";   // the icon sources that the cards will use
import Score from "../components/Score"; 
import Card from "../components/Card";
import shuffleArray from "../helpers/shuffleArray";  // the helper function that the 

export default class Game extends Component {
  static navigationOptions = () => {
    return {
      headerTitle: `Match all the pairs`,
      headerStyle: {
        // backgroundColor: "#333"
        backgroundColor: "#f3f3f3"
      },
      headerTitleStyle: {
        color: "#333"
      }
    };
  };

  constructor(props) {
    super(props);
    this.state = { current_selection: [], selected_pairs: [], score: 0 };
    let sources = {
      fontawesome: FontAwesome,
      entypo: Entypo
    };
    let copyOfCards = JSON.parse(JSON.stringify(cards));  // created a copy of the cards data
    this.cards = cards.concat(copyOfCards);  // appended the copy to its original
    this.cards.map(obj => { // added a unique ID to each of the card
      let id = Math.random().toString(36).substring(7);
      obj.id = id;
      obj.src = sources[obj.src];
      obj.is_open = false;
    });
    this.cards = shuffleArray(this.cards); // arranged the cards in random order
  }

  componentDidMount() {
    this.setState({
      cards: this.cards
    });
    Alert.alert("Welcome to the advanced level of the game",
    "Your goal is to find all the pairs of each icon on the screen. Tap the (?) and to open them and see their content to match the all the pairs!");
  }

  renderCard = ({ item }) => {
    return (
      <Card
        key={item.id}
        src={item.src}
        name={item.name}
        color={item.color}
        is_open={item.is_open}
        clickCard={this.clickCard.bind(this, item.id)}
      />
    );
  };

  clickCard = (id) => { // processing the card opened by the user
    // array containing the card pairs that had already been guessed by the user
    // (utilizing the spread notation [...this.state] to add a new item to the end of the array)
    let selected_pairs = [...this.state.selected_pairs];
    // array containing the currently selected cards
    let current_selection = this.state.current_selection;
    // array containing the cards rendered on the screen
    // (utilizing the spread notation [...this.state] to add a new item to the end of the array)
    let cards = [...this.state.cards];
    let score = this.state.score;     // the user's current score
    let index = this.state.cards.findIndex((card) => { // get the index of the card clicked by the user
      return card.id == id;
    });
    // only process the cards that are not currently open and are not a part of the pair that have already been guessed by the user
    if ( cards[index].is_open == false && selected_pairs.indexOf(cards[index].name) == -1 ) {
      cards[index].is_open = true; // open the card
      current_selection.push({  // add the card in the current selection
        index: index,
        name: cards[index].name
      });
      // checking if there are already two cards opened
      if (current_selection.length == 2) {
        if (current_selection[0].name == current_selection[1].name) { //checking if names of 2 selected card objects have the same name attribute
          score = score + 1;
          selected_pairs.push(cards[index].name);
          if (score == 12) { // checking if all pairs have been opened
            Alert.alert( "Awesome!",
              "You won the game by finding all " + `${score}` + " pairs."
            );
            score = 0;
            this.resetCards(); // reset the game
          }
        } else {
          cards[current_selection[0].index].is_open = false; // close the first card from the selected pair
          setTimeout(() => {  // close the second card from the selected pair after half a second
            cards[index].is_open = false;
            this.setState({
              cards: cards
            });
          }, 500);
        }
        current_selection = []; // reset the current selection
      }
      this.setState({   // update the states 
        score: score,
        cards: cards,
        current_selection: current_selection
      });
    }
  };
  
  resetCards = () => { // we reset the game so the user can resume the game if they want to
    let cards = this.cards.map(obj => {     // close all cards
        if ( obj.is_open == false ) {
      return obj;
        }
    });

    // test with keyword this

    cards = shuffleArray(cards);     // re-shuffle the cards
    this.setState({     // update the state to reset the UI
      current_selection: [],
      selected_pairs: [],
      cards: cards,
      score: 0
    });
  };

  render() {
    let data = this.state.cards;
    return (
      <View style={styles.container}>

        <View style={styles.body}>
          <FlatList
            data={data}
            renderItem={this.renderCard}
            numColumns={4}
            keyExtractor={(item) => item.id}
            columnWrapperStyle={styles.flatlistRow}
          />
        </View>

        <View style={styles.bottomContent}>
          <Score score={this.state.score} />
        </View>
        {/* <View style={styles.resetButton}>
          <Button onPress={this.resetCards} title="Reset" color="#87499d" />
          <Button onPress={() => this.props.navigation.push("Game")} title="Level: Easy" color="#87499d" />
        </View> */}
      </View>
    );
  }
}

const cards = [
  {
    src: "fontawesome",
    name: "heart",
    color: "red"
  },
  {
    src: "entypo",
    name: "feather",
    color: "#7d4b12"
  },
  {
    src: "entypo",
    name: "flashlight",
    color: "#00f6ff"
  },
  {
    src: "entypo",
    name: "flower",
    color: "#37b24d"
  },
  {
    src: "entypo",
    name: "star",
    color: "#ffd43b"
  },
  {
    src: "entypo",
    name: "game-controller",
    color: "#0048f7"
  },
  {
    src: "entypo",
    name: "trash",
    color: "#656564"
  },
  {
    src: "entypo",
    name: "man",
    color: "black"
  },
  {
    src: "entypo",
    name: "moon",
    color: "#D3D3D3"
  },
  {
    src: "entypo",
    name: "bookmark",
    color: "#e81616"
  },
  {
    src: "fontawesome",
    name: "firefox",
    color: "#ff9900"
  },
  {
    src: "fontawesome",
    name: "apple",
    color: "#8B0000"
  },
  
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
    backgroundColor: "#fff"
  },
  body: {
    marginTop: 10
  },
  flatlistRow: {
    flex: 1,
    padding: 10
  },
  bottomContent: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  resetButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 180
  }
});
