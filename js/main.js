// ICE & FIRE - THE DICE GAME //
// initiate board
// create player and npc object
// store player and npc position
// store turns
// create move function
// create a dice roll function 
// add color variables



let pos1 = document.getElementById("pos1");
pos1.style.backgroundColor = "#333";

let viewportOffset = pos1.getBoundingClientRect();
let y = viewportOffset.top;
let x = viewportOffset.left;

let currentPos = 1;

function move() {
  let moveX = Math.floor((Math.random() * 6) + 1);

  if (currentPos + 6 >= 30) {
    document.getElementById("pos" + currentPos).style.backgroundImage = "url('images/tiles/past-position.png')";
    document.getElementById("pos30").style.backgroundImage = "url('images/avatars/cersei-lannister.png')";
  } else {
    document.getElementById("pos" + currentPos).style.backgroundImage = "url('images/tiles/past-position.png')";
    let newPos = currentPos + moveX;
    document.getElementById("pos" + newPos).style.backgroundImage = "url('images/avatars/cersei-lannister.png')";
    currentPos = newPos;
    console.log(moveX);
  }
}

pos1.addEventListener("click", function() {
  move();
});