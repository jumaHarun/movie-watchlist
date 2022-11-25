﻿function getMoviesHtml(moviesArray, flag) {
  let html = "";

  moviesArray.map((movie) => {
    const { Title, Year, Poster, imdbRating, Runtime, Genre, Plot, Type } =
      movie;

    html += `
  <div class="data-grid">
    <div class="data-img">
      <img src="${
        Poster === "N/A" ? "/images/default.webp" : Poster
      }" alt="a poster for the movie called ${Title}">
    </div>

    <div class="data-details">
      <div class="movie-title">
        <h3 class="title"></h3>
        <h3 class="title">${Title}<span class="year"> &#9900 ${Year}</span></h3>

        <div class="movie-rating">
          <img src="/images/star.png" alt="a star image to show rating" class="rating-img">
          <p class="rating">${imdbRating} <span class="type"> &#9900 ${Type}</span></p>
        </div>
      </div>

      <div class="movie-details">
        <p class="duration">${Runtime}</p>
        <p class="genre">${Genre}</p>
        <div class="add-wrapper">
          <img src="/images/${
            flag ? "rm" : "add"
          }-icon.png" alt="add icon" class="add-icon" data-button="${
      flag ? "remove" : "add"
    }" data-movie="${Title}">
          <p>Watchlist</p>
        </div>
      </div>
    </div>

    <div class="movie-plot">
      <p>
        ${Plot}
      </p>
    </div>
  </div>
  <hr>
  `;
  });

  return html;
}

function savePrompt(obj, n) {
  const prompt = document.getElementById("prompt");
  prompt.style.display = "block";
  prompt.textContent =
    n === 1
      ? `${obj.Title} saved to watchlist 🚀`
      : `${obj.Title} is already in your watchlist 👏🏻`;
  setTimeout(() => {
    prompt.style.display = "none";
    prompt.textContent = "";
  }, 1500);
}

function saveToWatchlist(obj) {
  let watchlist = [];

  if (localStorage.getItem("localWatchlist")) {
    watchlist = JSON.parse(localStorage.getItem("localWatchlist"));

    const found = watchlist.find((movie) => movie.Title === obj.Title);

    if (!found) {
      watchlist.push(obj);
      localStorage.setItem("localWatchlist", JSON.stringify(watchlist));
      savePrompt(obj, 1);
    } else {
      savePrompt(obj, 2);
    }
  } else {
    watchlist.push(obj);
    localStorage.setItem("localWatchlist", JSON.stringify(watchlist));
    savePrompt(obj, 1);
  }
}

export { getMoviesHtml, saveToWatchlist };