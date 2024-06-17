const main = document.querySelector("main");
poster = document.getElementById("poster");
const title = document.getElementById("title");
const description = document.getElementById("description");

let currentSection;

let filmData = [];
let charactersData = [];

const filmIDs = [
  "tt0121766",
  "tt0076759",
  "tt0080684",
  "tt0086190",
  "tt0120915",
  "tt0121765",
];

const characterNames = [
  {
    firstName: "Luke",
    lastName: "Skywalker",
  },

  {
    firstName: "Leia",
    lastName: "Organa",
  },
  {
    firstName: "Han",
    lastName: "Solo",
  },
  {
    firstName: "Darth",
    lastName: "Vader",
  },
  {
    firstName: "Boba",
    lastName: "Fett",
  },
  {
    firstName: "Anakin",
    lastName: "Skywalker",
  },
  {
    firstName: "Obi-Wan",
    lastName: "Kenobi",
  },
  {
    firstName: "Yoda",
    lastName: "",
  },
];

let currentCharacterIndex = 0;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZmExODBmMmZjOWNiZjg2NGZhMzliMTJiZjcyNjI0NCIsInN1YiI6IjY2NmIwYTBkNWE3ZjI2MGFhNTUxNGVlMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._u2biB1uDLIsF0DzUejCUercMxZXvPUMXVamxZdd6vc",
  },
};

async function onLoad() {
  try {
    filmData = await loadFilmData();
    charactersData = await loadCharactersData();

    currentSection = "films";
    generateFilms(filmData);
  } catch (error) {
    console.log(error);
  }
}

async function loadFilmData() {
  try {
    for (index = 0; index < filmIDs.length; index++) {
      response = await fetch(
        `https://api.themoviedb.org/3/movie/${filmIDs[index]}`,
        options
      );

      if (!response.ok) {
        throw new Error(response.status);
      }
      const data = await response.json();
      filmData.push(data);
    }
    return filmData;
  } catch (error) {
    console.log(error);
  }
}

async function loadCharactersData() {
  try {
    for (index = 0; index < characterNames.length; index++) {
      response = await fetch(
        `https://starwars-databank-server.vercel.app/api/v1/characters/name/${characterNames[index].firstName}%20${characterNames[index].lastName}`
      );

      if (!response.ok) {
        throw new Error(response.status);
      }
      const data = await response.json();
      charactersData.push(data[0]);
    }
    return charactersData;
  } catch (error) {
    console.log(error);
  }
}

function activateFilms(e) {
  films = document.getElementById("page-container");
  const items = document.querySelectorAll(".item");
  e.target.matches(".next") && films.append(items[0]);
  e.target.matches(".prev") && films.prepend(items[items.length - 1]);
}

function activateCharacters(e) {
  // films = document.getElementById("page-container");
  // const items = document.querySelectorAll(".item");
  // e.target.matches(".next") && films.append(items[0]);
  // e.target.matches(".prev") && films.prepend(items[items.length - 1]);
  if (e.target.matches(".next")) {
    if (currentCharacterIndex === charactersData.length - 1) {
      currentCharacterIndex = 0;
    } else {
      currentCharacterIndex += 1;
    }
    setCharacter(currentCharacterIndex);
  } else if (e.target.matches(".prev")) {
    if (currentCharacterIndex === 0) {
      currentCharacterIndex = charactersData.length - 1;
    } else {
      currentCharacterIndex -= 1;
    }
    setCharacter(currentCharacterIndex);
  }
}

function loadSection(section) {
  if (section === currentSection) {
    return;
  } else {
    clearDOM();
    currentSection = section;

    if (section === "films") {
      document.removeEventListener("click", activateCharacters);
      generateFilms(filmData);
    } else if (section === "characters") {
      document.removeEventListener("click", activateFilms);
      generateCharacters(charactersData);
    }
  }
}

function generateFilms(filmData) {
  const films = document.createElement("ul");
  films.id = "page-container";

  for (index = 0; index < filmData.length; index++) {
    const item = document.createElement("li");
    item.setAttribute("class", "item");
    item.style.backgroundImage = `url(images/posters/${filmIDs[index]}.jpg`;

    const section = document.createElement("section");
    section.setAttribute("class", "content");

    const itemTitle = document.createElement("h2");
    itemTitle.setAttribute("class", "title");
    itemTitle.innerText = filmData[index].title;

    const itemDescription = document.createElement("p");
    itemDescription.setAttribute("class", "description");
    itemDescription.innerText = filmData[index].overview;

    section.appendChild(itemTitle);
    section.appendChild(itemDescription);
    item.appendChild(section);
    films.appendChild(item);
    main.appendChild(films);
  }
  document.addEventListener("click", activateFilms, false);
}

function generateCharacters(charactersData) {
  const characterSection = document.createElement("section");
  characterSection.id = "page-container";

  const characterArticle = document.createElement("article");
  characterArticle.id = "character";

  const characterImg = document.createElement("img");
  characterImg.id = "character-img";

  const characterContent = document.createElement("div");
  characterContent.id = "character-content";

  const characterName = document.createElement("h1");
  characterName.id = "character-name";

  const characterDescription = document.createElement("p");
  characterDescription.id = "character-description";

  characterContent.appendChild(characterName);
  characterContent.appendChild(characterDescription);
  characterArticle.appendChild(characterImg);
  characterArticle.appendChild(characterContent);
  characterSection.appendChild(characterArticle);
  main.appendChild(characterSection);
  document.addEventListener("click", activateCharacters, false);
  setCharacter(currentCharacterIndex);
}

function setCharacter(index) {
  console.log(index);
  document.getElementById("character-img").src = charactersData[index].image;
  document.getElementById("character-name").innerText =
    charactersData[index].name;
  document.getElementById("character-description").innerText =
    charactersData[index].description;
}

function clearDOM() {
  const pageContainer = document.getElementById("page-container");
  pageContainer.remove();
}
