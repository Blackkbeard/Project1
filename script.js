// Vairables
const gameState = ""; // for player 1 player 2
const cards = [];
const player1 = "";
const player2 = "";

gameStart();
// To Start the Game upon loading of webpage
function gameStart() {
  // query selector
  //to get overlays from htmL to array(overlay)
  let overlays = Array.from(document.getElementsByClassName("overlay"));
  // to get gamecards from html to array(card)
  let cards = Array.from(document.getElementsByClassName("gamecard"));
  // Adding event listeners to Overlay
  overlays.forEach((overlay) => {
    overlay.addEventListener("click", () => {
      overlay.classList.remove("visible"); // to remove overlay upon click
      game.startGame(); // initialise game
    });
  });
}

//--- MVP---//
// Creating click function for the cards itself

// Creating Shuffle Cards, randomising cards

// Deploying randomised card

// Restarting game upon completion

//------- Stretch Goal-------//
// 1) 2 Player mode 2 Player scores

// 2) creating exploding cards
