const searchInput = document.getElementById('search')
const searchBtn = document.getElementById('search-btn')
const addBtn = document.getElementById('addBtn')
const removeBtn = document.getElementById('rmBtn')
const movieWrapper = document.getElementById('movieWrapper')
const watchlistEl = document.getElementById('watchlistWrapper')

const watchlist = [
  {
    title: 'Blade Runner',
    poster: '/images/blade-runner.png',
    ratings: 8.1,
    duration: '117 min',
    genre: 'Action, Drama, Sci-fi',
    plot: 'A blade runner must pursue and terminate four replicants who stole a ship in space, and have returned to Earth to find their creator.'
  }
]

const movies = [
  {
    title: 'Blade Runner',
    poster: '/images/blade-runner.png',
    ratings: 8.1,
    duration: '117 min',
    genre: 'Action, Drama, Sci-fi',
    plot: 'A blade runner must pursue and terminate four replicants who stole a ship in space, and have returned to Earth to find their creator.'
  },
  {
    title: 'Blade Runner',
    poster: '/images/blade-runner.png',
    ratings: 8.1,
    duration: '117 min',
    genre: 'Action, Drama, Sci-fi',
    plot: 'A blade runner must pursue and terminate four replicants who stole a ship in space, and have returned to Earth to find their creator.'
  },
  {
    title: 'Blade Runner',
    poster: '/images/blade-runner.png',
    ratings: 8.1,
    duration: '117 min',
    genre: 'Action, Drama, Sci-fi',
    plot: 'A blade runner must pursue and terminate four replicants who stole a ship in space, and have returned to Earth to find their creator.'
  }
]

function handleAddBtnClick() { }

function handleRemoveBtnClick() { }

function handleSearchBtnClick() { }





function getMovieHtml(data) {
  let html = ''
  data.forEach(movie => {
    const { title, poster, ratings, duration, genre, plot } = movie
    html += `
  <div class="data-grid">
    <div class="data-img">
      <img src="${poster}" alt="#">
    </div>
    
    <div class="data-details">
      <div class="movie-title">
        <h3 class="title">${title}</h3>

        <div class="movie-rating">
          <img src="/images/star.png" alt="#" class="rating-img">
          <p class="rating">${ratings}</p>
        </div>
      </div>

      <div class="movie-details">
        <p class="duration">${duration}</p>
        <p class="genre">${genre}</p>
        <div class="add-wrapper">
          <img src="/images/add-icon.png" alt="add icon" class="add-icon" id="addBtn">
          <p>Watchlist</p>
        </div>
      </div>

    </div>
    <div class="movie-plot">
    <p>
      ${plot}
    </p>
    </div>
  </div>
  <hr>
  `
  })

  return html
}

function getWatchlistHtml(data) {
  let html = ''
  data.forEach(movie => {
    const { title, poster, ratings, duration, genre, plot } = movie
    html += `
  <div class="data-grid">
    <div class="data-img">
      <img src="${poster}" alt="#">
    </div>
    
    <div class="data-details">
      <div class="movie-title">
        <h3 class="title">${title}</h3>

        <div class="movie-rating">
          <img src="/images/star.png" alt="#" class="rating-img">
          <p class="rating">${ratings}</p>
        </div>
      </div>

      <div class="movie-details">
        <p class="duration">${duration}</p>
        <p class="genre">${genre}</p>
        <div class="add-wrapper">
          <img src="/images/rm-icon.png" alt="remove icon" class="add-icon" id="rmBtn">
          <p>Remove</p>
        </div>
      </div>

    </div>
    <div class="movie-plot">
    <p>
      ${plot}
    </p>
    </div>
  </div>
  <hr>
  `
  })

  return html
}

function renderHome(data) {
  movieWrapper.innerHTML = getMovieHtml(data)
}

function renderWatchlist(data) {
  watchlistEl.innerHTML = getWatchlistHtml(data)
}

if (movieWrapper) {
  renderHome(movies)
}

if (watchlistEl) {
  renderWatchlist(watchlist)
}

/*
http://www.omdbapi.com/?apikey=8b0ff547&
http://img.omdbapi.com/?apikey=8b0ff547&

Make two API calls one for search array and next for individual movie data

async function apiCall(movie) {
  const res = await fetch(`http://www.omdbapi.com/?apikey=8b0ff547&s=${movie}`)
  const data = await res.json()
  console.log(data.Search)
}
 */