// Character objects store api endpoints and pre determined array positions for character information //
const jonSnow = {
  endpoint: "https://www.anapioficeandfire.com/api/characters/583",
  alias: 0,
  image: "images/characters/jon-snow.png",
  avatar: "images/avatars/jon-snow.png"
};

const samwell = {
  endpoint: "https://www.anapioficeandfire.com/api/characters/954",
  alias: 2,
  image: "images/characters/samwell-tarly.png",
  avatar: "images/avatars/samwell-tarly.png"
};

const walder = {
  endpoint: "https://www.anapioficeandfire.com/api/characters/2",
  alias: 0,
  image: "images/characters/brandon-stark-and-walder.png",
  avatar: "images/avatars/brandon-stark-and-walder.png"
};

const gregorClegane = {
  endpoint: "https://www.anapioficeandfire.com/api/characters/1442",
  alias: 1,
  image: "images/characters/gregor-clegane.png",
  avatar: "images/avatars/gregor-clegane.png"
};

const khalDrogo = {
  endpoint: "https://www.anapioficeandfire.com/api/characters/1346",
  alias: 1,
  image: "images/characters/khal-drogo.png",
  avatar: "images/avatars/khal-drogo.png"
};

const cerseiLannister = {
  endpoint: "https://www.anapioficeandfire.com/api/characters/238",
  alias: 0,
  image: "images/characters/cersei-lannister.png",
  avatar: "images/avatars/cersei-lannister.png"
};

const aryaStark = {
  endpoint: "https://www.anapioficeandfire.com/api/characters/148",
  alias: 10,
  image: "images/characters/arya-stark.png",
  avatar: "images/avatars/arya-stark.png"
};

const daenerysTargaryen = {
  endpoint: "https://www.anapioficeandfire.com/api/characters/1303",
  alias: 3,
  image: "images/characters/daenerys-targaryen.png",
  avatar: "images/avatars/daenerys-targaryen.png"
};

const melisandre = {
  endpoint: "https://www.anapioficeandfire.com/api/characters/743",
  alias: 0,
  image: "images/characters/melisandre.png",
  avatar: "images/avatars/melisandre.png"
};

const brienneOfTarth = {
  endpoint: "https://www.anapioficeandfire.com/api/characters/216",
  alias: 0,
  image: "images/characters/brienne-of-tarth.png",
  avatar: "images/avatars/brienne-of-tarth.png"
};

displayCharacter(jonSnow);

function displayCharacter(character) {

  const characterName = document.getElementById("characterName");
  const characterAlias = document.getElementById("characterAlias");
  const characterImage = document.getElementById("characterImage");

  fetch(character.endpoint)
  .then(response => response.json())
  .then(data => {
     characterName.innerHTML = data.name;
     characterAlias.innerHTML = data.aliases[character.alias];
     characterImage.src = character.image;
  })
  .catch(error => console.log(error));

  // Store íng the chosen character in local storage for retrieval on next page //
  localStorage.setItem("character", JSON.stringify(character));
}

characterSelect.addEventListener("click", function() {
  document.getElementById("versusCard").style.display = "block";
});