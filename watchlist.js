import { getMoviesHtml } from "./utils.js";

const watchlistEl = document.getElementById("watchlistWrapper");

let watchlist = [];

document.addEventListener("click", (e) => {
  if (e.target.dataset.button === "remove") {
    handleRemoveBtnClick(e.target.dataset.movie);
  }
});

function handleRemoveBtnClick(title) {
  const watchlist1 = [];
  watchlist.map((movie) => {
    if (movie.Title !== title) {
      watchlist1.push(movie);
    }
  });
  localStorage.setItem("localWatchlist", JSON.stringify(watchlist1));
  watchlist = watchlist1;
  render();
}

function render() {
  if (localStorage.getItem("localWatchlist")) {
    watchlist = JSON.parse(localStorage.getItem("localWatchlist"));
    if (watchlist.length > 0) {
      watchlistEl.innerHTML = getMoviesHtml(watchlist, 1);
    } else {
      watchlistEl.innerHTML = `
      <div class="no-data no-list">
        <h1>Your watchlist is looking a little empty...</h1>
        <div class="list-add">
          <img src="/images/add-icon.png" alt="add icon" id="addBtnList">
          <p>Let's add some movies!</p>
        </div>
      </div>
      `;
    }
  }
}

render();
