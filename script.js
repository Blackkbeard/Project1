// Vairables
const gameState = ""; // for player 1 player 2
const cards = [];
const player1 = "";
const player2 = "";

class AudioController {
  constructor() {
    this.bgMusic = new Audio("Music/maple.mp3");
    this.flipSound = new Audio("Music/flip.mp3");
    this.matchSound = new Audio("Music/music.mp3");
    this.victorySound = new Audio("Music/music.mp3");
    this.gameOverSound = new Audio("Music/music.mp3");
    this.bgMusic.volume = 0;
    this.bgMusic.loop = true;
  }
  startMusic() {
    this.bgMusic.play();
  }
  stopMusic() {
    this.bgMusic.pause();
    this.bgMusic.currentTime = 0.1;
  }
  flip() {
    this.flipSound.play();
  }
  match() {
    this.matchSound.play();
  }
  victory() {
    this.stopMusic();
    this.victorySound.play();
  }
  gameOver() {
    this.stopMusic();
    this.gameOverSound.play();
  }
}

class MixNMatch {
  constructor(totalTime, cards) {
    this.cardsArray = cards;
    this.totalTime = totalTime;
    this.timer = document.getElementById("timetaken");
    this.ticker = document.getElementById("flips");
    this.audioController = new AudioController();
  }
  startGame() {
    this.cardToCheck = null;
    this.totalClicks = 0;
    this.timeRemaining = this.totalTime;
    this.matchedCards = [];
    this.busy = true;
  }
  flipCard(card) {
    if (this.canFlipCard(card)) {
      this.audioController.flip();
      this.totalClicks++;
      this.ticker.innerText = this.totalClicks;
    }
  }
  canFlipCard(card) {
    return (
      !this.busy &&
      !this.matchedCards.includes(cards) &&
      card !== this.cardToCheck
    );
  }
}
// To Start the Game upon loading of webpage
function ready() {
  // query selector
  //to get overlays from htmL to array(overlay)
  let overlays = Array.from(document.getElementsByClassName("overlay"));
  // to get gamecards from html to array(card)
  let cards = Array.from(document.getElementsByClassName("gamecard"));
  let game = new MixNMatch(100, cards);
  // Adding event listeners to Overlay
  overlays.forEach((overlay) => {
    overlay.addEventListener("click", () => {
      overlay.classList.remove("visible"); // to remove overlay upon click
      game.startGame(); // initialise game
      let audioController = new AudioController();
      audioController.startMusic();
    });
  });
}

//--- MVP---//

// Creating click function for the cards itself
cards.forEach((card) => {
  gamecard.addEventListener("click", () => {
    game.flipCard(card);
  });
});
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", webReady());
} else {
  ready();
}

// creating audio controller

// Creating Shuffle Cards, randomising cards

// Deploying randomised card

// Restarting game upon completion

//------- Stretch Goal-------//
// 1) 2 Player mode 2 Player scores

// 2) creating exploding cards
