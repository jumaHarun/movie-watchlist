const movieWrapper = document.getElementById('movieWrapper')
const watchlistEl = document.getElementById('watchlistWrapper')
const searchInput = document.getElementById('search')

let watchlist = []

document.addEventListener('click', (e) => {
  if (e.target.dataset.search) {
    const query = searchInput.value
    let html = ''
    fetch(`http://www.omdbapi.com/?apikey=8b0ff547&s=${query}`)
      .then(res => res.json())
      .then(data => {
        data.Search.map(movie => {
          fetch(`http://www.omdbapi.com/?apikey=8b0ff547&t=${movie.Title}`)
            .then(res => res.json())
            .then(data => {
              html += getMovieHtml(data)
              renderHome(html)
            })
            .catch(err => console.log(err))
        })
      })
      .catch(err => console.log(err))
  }

  if (e.target.dataset.add) { }

  if (e.target.dataset.remove) { }
})

function renderHome(html) {
  if (movieWrapper) {
    movieWrapper.innerHTML = html
  }
}

function getMovieHtml(data) {
  const { Title, Poster, Rated, Runtime, Genre, Plot } = data

  return `
  <div class="data-grid">
    <div class="data-img">
      <img src="${Poster}" alt="a poster for the movie called ${Title}">
    </div>
    
    <div class="data-details">
      <div class="movie-title">
        <h3 class="title">${Title}</h3>

        <div class="movie-rating">
          <img src="/images/star.png" alt="a star image to show rating" class="rating-img">
          <p class="rating">${Rated}</p>
        </div>
      </div>

      <div class="movie-details">
        <p class="duration">${Runtime}</p>
        <p class="genre">${Genre}</p>
        <div class="add-wrapper">
          <img src="/images/add-icon.png" alt="add icon" class="add-icon" id="addBtn">
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
  `
}