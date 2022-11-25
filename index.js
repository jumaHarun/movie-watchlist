import { getMoviesHtml, saveToWatchlist } from "./utils.js";

const searchInput = document.getElementById("search");
const apiKey = "8b0ff547";

let searchResults = [];

document.addEventListener("click", (e) => {
  if (e.target.dataset.button) {
    if (e.target.dataset.button === "search") {
      handleSearchBtnClick();
    }

    if (e.target.dataset.button === "add") {
      if (e.target.dataset.movie) {
        handleAddBtnClick(e.target.dataset.movie);
      }
    }
  }
});

async function handleSearchBtnClick() {
  try {
    const moviesArray = await getMoviesAPI(searchInput.value);
    const html = getMoviesHtml(moviesArray, 0);

    render(html);
  } catch (err) {
    console.log(err);
  }
}

function handleAddBtnClick(title) {
  const movieObj = searchResults.find((movie) => movie.Title === title);
  saveToWatchlist(movieObj);
}

async function getMoviesAPI(title) {
  const moviesArray = [];
  const responseOne = await fetch(
    `https://www.omdbapi.com/?apikey=${apiKey}&s=${title}`
  );
  const dataOne = await responseOne.json();

  for await (const movie of dataOne.Search) {
    const responseTwo = await fetch(
      `https://www.omdbapi.com/?apikey=${apiKey}&t=${movie.Title}`
    );
    const dataTwo = await responseTwo.json();
    if (!dataTwo.Error) {
      moviesArray.push(dataTwo);
    }
  }
  searchResults = moviesArray;
  return moviesArray;
}

function render(html) {
  document.getElementById("movieWrapper").innerHTML = html;
}
