const shuffleArray = (cardsArray) => { // utilization of a helper array to randomize the order of the objects inside the array
    var i = cardsArray.length;
    var j;
    var temp;
  
    if (i == 0) {
      return cardsArray;
    }
  
    while (--i) {
      j = Math.floor(Math.random() * (i + 1));
      temp = cardsArray[i];
      cardsArray[i] = cardsArray[j];
      cardsArray[j] = temp;
    }
    return cardsArray;
  };
  
  export default shuffleArray;