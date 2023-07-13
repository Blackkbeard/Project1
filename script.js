// creating audio controller for start and end song
class AudioController {
  constructor() {
    this.bgMusic = new Audio("Music/maple.mp3");
    this.victorySound = new Audio("Music/music.mp3");
    this.gameOverSound = new Audio("Music/music.mp3");
    this.bgMusic.volume = 0.05; //volume
    this.bgMusic.loop = true; // to loop
  }
  startMusic() {
    // start music function
    this.bgMusic.play();
  }
  stopMusic() {
    // start music function
    this.bgMusic.pause();
    this.bgMusic.currentTime = 0;
  }
  restartMusic() {
    //restart music function
    this.stopMusic();
    this.bgMusic.play();
  }

  victory() {
    // victory music function
    this.stopMusic();
    this.victorySound.play();
  }
  gameOver() {
    // game over function
    this.stopMusic();
    this.gameOverSound.play();
  }
}
// to shuffle cards & set cards & timer
class MixOrMatch {
  constructor(totalTime, cards) {
    // TO pass time and card from HTML
    this.cardsArray = cards;
    this.totalTime = totalTime;
    this.timer = document.getElementById("time-remaining"); // To pull time from HTML
    this.audioController = new AudioController(); // To call the audio when game starts
  }
  startGame() {
    this.cardToCheck = null; // To check
    this.timeRemaining = this.totalTime;
    this.matchedCards = [];
    this.busy = true;
    setTimeout(() => {
      this.audioController.restartMusic();
      this.shuffleCards(this.cardsArray);
      this.countdown = this.startCountdown();
      this.busy = false;
    }, 500);
    this.hideCards();
    this.timer.innerText = this.timeRemaining;
  }
  startCountdown() {
    return setInterval(() => {
      this.timeRemaining--;
      this.timer.innerText = this.timeRemaining;
      if (this.timeRemaining === 0) this.gameOver();
    }, 1000);
  }
  flipCard(card) {
    if (this.canFlipCard(card)) {
      card.classList.add("visible");

      if (this.cardToCheck) {
        this.checkForCardMatch(card);
      } else {
        this.cardToCheck = card;
      }
    }
  }
  canFlipCard(card) {
    return (
      !this.busy &&
      !this.matchedCards.includes(card) &&
      card !== this.cardToCheck
    );
  }
  hideCards() {
    this.cardsArray.forEach((card) => {
      card.classList.remove("visible");
      card.classList.remove("matched");
    });
  }
  gameOver() {
    clearInterval(this.countdown);
    this.audioController.gameOver();
    document.getElementById("game-over-text").classList.add("visible");
  }
  victory() {
    clearInterval(this.countdown);
    this.audioController.victory();
    document.getElementById("victory-text").classList.add("visible");
  }
  checkForCardMatch(card) {
    if (this.getCardType(card) === this.getCardType(this.cardToCheck))
      this.cardMatch(card, this.cardToCheck);
    else this.cardMismatch(card, this.cardToCheck);

    this.cardToCheck = null;
  }
  cardMatch(card1, card2) {
    this.matchedCards.push(card1);
    this.matchedCards.push(card2);
    card1.classList.add("matched");
    card2.classList.add("matched");

    if (this.matchedCards.length === this.cardsArray.length) this.victory();
  }
  cardMismatch(card1, card2) {
    this.busy = true;
    setTimeout(() => {
      card1.classList.remove("visible");
      card2.classList.remove("visible");
      this.busy = false;
    }, 1000);
  }

  shuffleCards(cardsArray) {
    // Fisher-Yates Shuffle Algorithm.
    for (let i = cardsArray.length - 1; i > 0; i--) {
      let randIndex = Math.floor(Math.random() * (i + 1));
      cardsArray[randIndex].style.order = i;
      cardsArray[i].style.order = randIndex;
    }
  }
  getCardType(card) {
    return card.getElementsByClassName("value")[0].src;
  }
}
// To Start the Game upon loading of webpage
function ready() {
  // query selector
  //to get overlays from htmL to array(overlay). To Use to Code overlay later.
  let overlays = Array.from(document.getElementsByClassName("overlaytext"));
  // to get gamecards from html to array(card)
  let cards = Array.from(document.getElementsByClassName("card"));
  let game = new MixOrMatch(60, cards);
  // Adding event listeners to Overlay
  overlays.forEach((overlay) => {
    overlay.addEventListener("click", () => {
      overlay.classList.remove("visible"); // to remove overlay upon click
      game.startGame(); // initialise game
    });
  });

  // Creating click function for the cards itself
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      // to each click, we flip the card
      game.flipCard(card);
    });
  });
}
// Loading process. TO Load the page.
if (document.readyState === "loading") {
  //Once Dom content loaded all html file, it initialises
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

// Creating Shuffle Cards, randomising cards

// Deploying randomised card

// Restarting game upon completion
