const slider = document.querySelector("#slider");
poster = document.getElementById("poster");
const title = document.getElementById("title");
const description = document.getElementById("description");

const films = [
  "tt0121766",
  "tt0076759",
  "tt0080684",
  "tt0086190",
  "tt0120915",
  "tt0121765",
];

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
    const filmData = await loadData();
    generateItems(filmData);
    document.addEventListener("click", activate, false);
  } catch (error) {
    console.log(error);
  }
}

async function loadData() {
  try {
    const filmData = [];
    for (index = 0; index < films.length; index++) {
      response = await fetch(
        `https://api.themoviedb.org/3/movie/${films[index]}`,
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

function activate(e) {
  const items = document.querySelectorAll(".item");
  e.target.matches(".next") && slider.append(items[0]);
  e.target.matches(".prev") && slider.prepend(items[items.length - 1]);
}

function generateItems(filmData) {
  for (index = 0; index < filmData.length; index++) {
    const item = document.createElement("li");
    item.setAttribute("class", "item");
    item.style.backgroundImage = `url(images/posters/${films[index]}.jpg`;

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
    slider.appendChild(item);
  }
}
