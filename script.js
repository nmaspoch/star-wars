const filmTitle = document.getElementById("film");
const description = document.getElementById("description");

async function getFilm(id) {
  try {
    const response = await fetch(`https://swapi.dev/api/films/${id}/`);
    if (!response.ok) {
      throw new Error(response.status);
    }

    const data = await response.json();

    filmTitle.innerText = data.title;
    description.innerText = data.opening_crawl;

    // console.log(data)
  } catch (error) {
    console.log(error);
  }
}

