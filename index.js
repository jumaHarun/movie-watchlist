import { getMoviesHtml, saveToWatchlist, promptUser } from "./utils.js";

const searchInput = document.getElementById("search");
const apiKey = "8b0ff547";

let searchResults = [];

document.addEventListener("click", (e) => {
  if (e.target.dataset.button) {
    if (e.target.dataset.button === "search" && searchInput.value !== "") {
      renderPreloader();
      handleSearchBtnClick();
    } else {
      promptUser(null, "empty");
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
    const html = `
    <div class="no-data" id="noData">
      <h3>Unable to find what you're looking for. Please try another search.</h3>
    </div>
    `;
    render(html);
  }
}

function handleAddBtnClick(title) {
  const movieObj = searchResults.find((movie) => movie.Title === title);
  saveToWatchlist(movieObj);
}

async function getMoviesAPI(title) {
  try {
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
  } catch (err) {
    console.log(err);
  }
}

function render(html) {
  document.getElementById("movieWrapper").innerHTML = html;
}

function renderPreloader() {
  const html = `
  <div class="preloader-wrapper">
    <img
    src="https://media.giphy.com/media/sSgvbe1m3n93G/giphy.gif"
    alt="a preloder GIF"
    class="preloader"
    >
  </div>
  `;
  render(html);
}
