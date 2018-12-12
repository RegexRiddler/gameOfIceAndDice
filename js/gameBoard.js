// Retrieve chosen character from character selection page //
const retrievedCharacter = localStorage.getItem("character");
const chosenCharacter = JSON.parse(retrievedCharacter)

// Declare turn and position tracker //
let dieRoll = null;
let isPlayerTurn = true;
let playerPosition = 1;
let npcPosition = 1;
let playerPenaltyCounter = null;
let npcPenaltyCounter = null;
let playerDiePenalty = null;
let npcDiePenalty = null;

// Initaite the board //
const startTile = document.getElementById("pos1");
startTile.querySelector("img").src = `${chosenCharacter.avatar}`;
startTile.querySelector("img").style.display = "block";
startTile.querySelector("span").innerHTML = "";
document.getElementById("die").innerHTML = "Die: "

rollButton.addEventListener("click", function() {
  if (isPlayerTurn === true) {
    movePlayer();
  }
});

// Event handler for dismissing trap cards for player traps //
dismissTrapCard.addEventListener("click", function() {
  document.getElementById("trapCard").style.display = "none";
  // Only when card is dismissed can npc take its turn //
  moveNpc();
});

// Event handler for dismissing trap cards for npc traps //
dismissNpcTrapCard.addEventListener("click", function() {
  document.getElementById("npcTrapCard").style.display = "none";
});

// Reset the characters previous position, remove avatar and place tile number back //
function resetPreviousPosition(npcOrPlayer) {
  switch (npcOrPlayer) {
    case "player":
      let playerCurrentPosition = document.getElementById(`pos${playerPosition}`);
      if (npcPosition === playerPosition) {
        playerCurrentPosition.querySelector("img").style.display = "block";
        playerCurrentPosition.querySelector("img").src = "images/avatars/white-walker.png"; }
      else {
        playerCurrentPosition.querySelector("img").style.display = "none";
        playerCurrentPosition.querySelector("span").innerHTML = `${playerPosition}`; }
      break;

    case "npc":
      let npcCurrentPosition = document.getElementById(`pos${npcPosition}`);
      if (playerPosition === npcPosition) {
        npcCurrentPosition.querySelector("img").style.display = "block";
        npcCurrentPosition.querySelector("img").src = `${chosenCharacter.avatar}`; }
      else {
        npcCurrentPosition.querySelector("img").style.display = "none";
        npcCurrentPosition.querySelector("span").innerHTML = `${npcPosition}`; }
      break;
  }  
}

// Place the avatar on the new tile //
function setNewPosition(npcOrPlayer, dieRoll) {
  switch (npcOrPlayer) {
    case "player":
      if (playerPosition + dieRoll >= 30) {
        playerPosition = 30;
        let endTile = document.getElementById("pos30");
        endTile.querySelector("img").src = `${chosenCharacter.avatar}`;
        endTile.querySelector("img").style.display = "block";
        endTile.querySelector("span").innerHTML = "";
        displayEndGameMessage("player");
      } else {
        let playerNewPosition = document.getElementById(`pos${playerPosition + dieRoll}`);
        playerNewPosition.querySelector("img").src = `${chosenCharacter.avatar}`;
        playerNewPosition.querySelector("img").style.display = "block";
        playerNewPosition.querySelector("span").innerHTML = "";
        playerPosition += dieRoll;
      }
      break;

    case "npc":
      if (npcPosition + dieRoll >= 30) {
        npcPosition = 30;
        let endTile = document.getElementById("pos30");
        endTile.querySelector("img").src = "images/avatars/white-walker.png";
        endTile.querySelector("img").style.display = "block";
        endTile.querySelector("span").innerHTML = "";
        displayEndGameMessage("npc");
      } else {
        let npcNewPosition = document.getElementById(`pos${npcPosition + dieRoll}`);
        npcNewPosition.querySelector("img").src = "images/avatars/white-walker.png";
        npcNewPosition.querySelector("img").style.display = "block";
        npcNewPosition.querySelector("span").innerHTML = "";
        npcPosition += dieRoll;
      }      
      break;
  }
}

// The function that handle the players turn from start to finish //
function movePlayer() {
  dieRoll = Math.floor((Math.random() * 6) + 1);
  document.getElementById("die").innerHTML = "Die:" + dieRoll;

  if (playerPenaltyCounter > 0) {
    playerPenaltyCounter--
    moveNpc(); }  
  else if (playerDiePenalty > 0) {
    dieRoll -= playerDiePenalty;
    playerDiePenalty = 0;
    isPlayerTurn = false;
    // document.getElementById("rollButton").innerHTML = "roll die";
    resetPreviousPosition("player");
    setNewPosition("player", dieRoll);
    moveNpc(); }
  else if (playerPosition + dieRoll === 7 || playerPosition + dieRoll === 10 || playerPosition + dieRoll === 13 || playerPosition + dieRoll === 21 || playerPosition + dieRoll === 24 || playerPosition + dieRoll === 28) {
    document.getElementById("rollButton").innerHTML = "wait turn";
    isPlayerTurn = false;
    resetPreviousPosition("player");
    setNewPosition("player", dieRoll);
    playerTraps(playerPosition); }
  else if (dieRoll === 6) {
    document.getElementById("rollButton").innerHTML = "roll again";
    resetPreviousPosition("player");
    setNewPosition("player", dieRoll); } 
  else {
    document.getElementById("rollButton").innerHTML = "wait turn";
    isPlayerTurn = false;
    resetPreviousPosition("player");
    setNewPosition("player", dieRoll);
    moveNpc();
  }
}

// The function that handles the NPC turn from start to finish //
function moveNpc() {
  dieRoll = Math.floor((Math.random() * 6) + 1);

  setTimeout(() => {
    if (npcPenaltyCounter > 0) {
      npcPenaltyCounter--
      isPlayerTurn = true;
      if (playerPenaltyCounter > 0) {
        document.getElementById("rollButton").innerHTML = "skip turn"; }
      else {
        document.getElementById("rollButton").innerHTML = "roll again"; }
    } 
    else if (npcDiePenalty > 0) {
      dieRoll -= npcDiePenalty;
      npcDiePenalty = 0;
      resetPreviousPosition("npc");
      setNewPosition("npc", dieRoll); 
      if (playerPenaltyCounter > 0) {
        document.getElementById("rollButton").innerHTML = "skip turn"; } 
      else {
        document.getElementById("rollButton").innerHTML = "roll die"; }
      isPlayerTurn = true; }
    else if (npcPosition + dieRoll === 7 || npcPosition + dieRoll === 10 || npcPosition + dieRoll === 13 || npcPosition + dieRoll === 21 || npcPosition + dieRoll === 24 || npcPosition + dieRoll === 28) {
      resetPreviousPosition("npc");
      setNewPosition("npc", dieRoll); 
      npcTraps(npcPosition);
      if (playerPenaltyCounter > 0) {
        document.getElementById("rollButton").innerHTML = "skip turn"; } 
      else {
        document.getElementById("rollButton").innerHTML = "roll die"; }
      isPlayerTurn = true; }
    else {
      resetPreviousPosition("npc");
      setNewPosition("npc", dieRoll);
      if (playerPenaltyCounter > 0) {
        document.getElementById("rollButton").innerHTML = "skip turn"; } 
      else {
        document.getElementById("rollButton").innerHTML = "roll die"; }
      isPlayerTurn = true;    
    }
  }, 600);
}

// Function for handling player traps //
function playerTraps(trapTile) {
  setTimeout(() => {
    const trapCard = document.getElementById("trapCard");
    trapCard.style.display = "block";
  }, 1000);

  switch (trapTile) {
    case 7:
        trapCard.querySelector("span").innerHTML = "you try to swim but your gear is too heavy. you swim back to build a raft instead";

      setTimeout(() => {
        resetPreviousPosition("player");
        setNewPosition("player", -1);
      }, 500);
      break;
      
    case 10:
        trapCard.querySelector("span").innerHTML = "with an improvised raft you have made it almost to the shore of your destination, but you are met with strong currents and are dragged back to sea";

      setTimeout(() => {
        resetPreviousPosition("player");
        setNewPosition("player", -1);
      }, 500);
      break;
      
    case 13:
        trapCard.querySelector("span").innerHTML = "your journey has taken you to the far east of westeros, you are tired and hungry, and decide to spend the night at a quiet inn. you wake up noticing your valuables are gone! you spend the next 2 turns tracking the thieves";
        playerPenaltyCounter = 2;
      break;
      
    case 21:
      trapCard.querySelector("span").innerHTML = "you are traveling high in the mountains and need to acclimate to the increasing altitudes. rest for 1 turn";
      playerPenaltyCounter = 1;
    break;

    case 24:
        trapCard.querySelector("span").innerHTML = "you find yourself in a tavern brawl, outnumbered you are knocked unconsious. the next day you wake up in a haze of confusion and travel 2 paces in the wrong direction";

      setTimeout(() => {
        resetPreviousPosition("player");
        setNewPosition("player", -2);
      }, 500);
      break;

    case 28:
        trapCard.querySelector("span").innerHTML = "you have made it to the north, cold and slowed by the snow. next turn subtract 3 from your die roll";
        playerDiePenalty = 3;
      break;
  }
}

// Function for handling NPC traps //
function npcTraps(trapTile) {
    const npcTrapCard = document.getElementById("npcTrapCard");
    npcTrapCard.style.display = "block";

  switch (trapTile) {
    case 7:
      npcTrapCard.querySelector("span").innerHTML = "the white walkers boats need repair, so they head back to mainland";

      setTimeout(() => {
        resetPreviousPosition("npc");
        setNewPosition("npc", -1);
      }, 600);
      break;
      
    case 10:
      npcTrapCard.querySelector("span").innerHTML = "a massive storm is brewing, the white walkers are forced to wait it out in the eye of the storm";

      setTimeout(() => {
        resetPreviousPosition("npc");
        setNewPosition("npc", -1);
      }, 600);
      break;
      
    case 13:
      npcTrapCard.querySelector("span").innerHTML = "westeros east coast is no place for a white walker, they meet a sandstorm and are burried. they spend the next 2 turns gathering their forces";
      npcPenaltyCounter = 2;
      break;
      
    case 21:
      npcTrapCard.querySelector("span").innerHTML = "the mountain path has colappsed, and the white walkers spend the next turn finding another way";
      npcPenaltyCounter = 1;
      break;

    case 24:
      npcTrapCard.querySelector("span").innerHTML = "the white walkers meet one of khaleesis rogue dragons and must retreat 2 paces";

      setTimeout(() => {
        resetPreviousPosition("npc");
        setNewPosition("npc", -2);
      }, 600);
      break;

    case 28:
      npcTrapCard.querySelector("span").innerHTML = "an army of wildlings are ambushing the white walkers, their way forth is slowed down. The white walkers next die roll gets 3 subtracted";
      npcDiePenalty = 3;
      break;
  }
}

// Function for displaying victory/defeat message //
function displayEndGameMessage(npcOrPlayer) {
  switch (npcOrPlayer) {
    case "player":
      setTimeout(() => {
        document.getElementById("victory").style.display = "block";
        document.getElementById("victorImage").src = chosenCharacter.image;
      }, 500);
      break;
  
    case "npc":
      setTimeout(() => {
        document.getElementById("defeat").style.display = "block";
      }, 500);
      break;
  }
}