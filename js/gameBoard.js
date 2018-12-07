// Retrieve chosen character from character selection page //
let retrievedCharacter = localStorage.getItem("character");
let chosenCharacter = JSON.parse(retrievedCharacter)

// ICE & FIRE - THE DICE GAME //
// initiate board
// create player and npc object
// store player and npc position
// store turns
// create move function
// create a dice roll function 
// add color variables



let startTile = document.getElementById("pos1");
startTile.style.backgroundImage = `url(${chosenCharacter.avatar})`;
startTile.style.backgroundSize = "cover";
startTile.style.backgroundColor = "none";
startTile.style.border = "none";
startTile.querySelector("span").innerHTML = "";

let playerTurn = true;

let playerPos = 1;

let npcPos = 1;

function movePlayer() {
  let moveX = Math.floor((Math.random() * 6) + 1);

  if (playerPos + 6 >= 30) {

    let position = document.getElementById("pos" + playerPos);
    position.style.backgroundImage = "url(images/tiles/past-position-tile.png)";

    let finish = document.getElementById("pos30");
    finish.style.backgroundImage = `url(${chosenCharacter.avatar})`;
    finish.style.backgroundSize = "cover";
    finish.style.backgroundColor = "none";
    finish.style.border = "none";
    finish.querySelector("span").innerHTML = "";

  } else {

    let position = document.getElementById("pos" + playerPos);
    position.style.backgroundImage = "url(images/tiles/past-position-tile.png)";

    let newPos = playerPos + moveX;

    let newPosition = document.getElementById("pos" + newPos);
    newPosition.style.backgroundImage = `url(${chosenCharacter.avatar})`;
    newPosition.style.backgroundSize = "cover";
    newPosition.style.backgroundColor = "none";
    newPosition.style.border = "none";
    newPosition.querySelector("span").innerHTML = "";

    playerPos = newPos;

    die = document.getElementById("die");
    die.innerHTML = moveX;

    playerTurn = false;

    document.getElementById("button").innerHTML = "wait turn"

    moveNPC();
  }
}

function moveNPC() {
  setTimeout(() => {
    
    let moveX = Math.floor((Math.random() * 6) + 1);

    if (npcPos + 6 >= 30) {

      let position = document.getElementById("pos" + npcPos);
      position.style.backgroundImage = "url(images/tiles/past-position-tile.png)";

      let finish = document.getElementById("pos30");
      finish.style.backgroundImage = "url(images/avatars/white-walker.png)";
      finish.style.backgroundSize = "cover";
      finish.style.backgroundColor = "none";
      finish.style.border = "none";
      finish.querySelector("span").innerHTML = "";

    } else {

      let position = document.getElementById("pos" + npcPos);
      position.style.backgroundImage = "url(images/tiles/past-position-tile.png)";

      let newPos = npcPos + moveX;

      let newPosition = document.getElementById("pos" + newPos);
      newPosition.style.backgroundImage = "url(images/avatars/white-walker.png)";
      newPosition.style.backgroundSize = "cover";
      newPosition.style.backgroundColor = "none";
      newPosition.style.border = "none";
      newPosition.querySelector("span").innerHTML = "";

      npcPos = newPos;

      die = document.getElementById("die");
      die.innerHTML = moveX;

      playerTurn = true;

      document.getElementById("button").innerHTML = "roll die"
    }

  }, 500);
}

button.addEventListener("click", function() {
  if (playerTurn === true) {
    movePlayer();
  }
});

