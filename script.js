const poster = document.getElementById("poster");
const title = document.getElementById("title");
const director = document.getElementById("director");
const release = document.getElementById("release");
const crawl = document.getElementById("crawl");

const films = [1, 2, 3, 4, 5, 6];
let currentIndex = 1;

function previous() {
  if (currentIndex === 1) {
    currentIndex = 6;
  } else {
    currentIndex -= 1;
  }
  loadFilm(currentIndex);
}

function next() {
  if (currentIndex === 6) {
    currentIndex = 1;
  } else {
    currentIndex += 1;
  }
  loadFilm(currentIndex);
}

async function loadFilm() {
  try {
    const response = await fetch(`https://swapi.dev/api/films/${currentIndex}`);
    if (!response.ok) {
      throw new Error(response.status);
    }

    const data = await response.json();

    poster.src = `images/posters/${currentIndex}.jpg`;
    title.innerText = `${data.title}`;
    director.innerText = `Director: ${data.director}`;
    release.innerText = `Released: ${data.release_date}`;
    crawl.innerText = `${data.opening_crawl}`;

    // console.log(data)
  } catch (error) {
    console.log(error);
  }
}
