const searchInput = document.getElementById('search')
const apiKey = '8b0ff547'

document.addEventListener('click', (e) => {
  if (e.target.dataset.button) {
    if (e.target.dataset.button === 'search') {
      handleSearchBtnClick()
    }

    if (e.target.dataset.button === 'add') {
      handleAddBtnClick()
    }

    if (e.target.dataset.button === 'remove') {
      handleRemoveBtnClick()
    }
  }
})

function handleSearchBtnClick() {
  let html = ''

  fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchInput.value}`)
    .then(res => res.json())
    .then(data => {
      data.Search.map(movie => {
        fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${movie.Title}`)
          .then(res => res.json())
          .then(data => {
            if (!data.Error) {
              html += getMoviesHtml(data)
              render(html)
            }
          })
      })
    })
    .catch(err => console.log(`API ERROR: ${err}`))
}

function handleAddBtnClick() {
  console.log('Add to watchlist')
}

function handleRemoveBtnClick() {
  console.log('Remove from watchlist')
}


function getMoviesHtml(movieObj) {
  const { Title, Year, Poster, imdbRating, Runtime, Genre, Plot, Type } = movieObj

  return `
  <div class="data-grid">
    <div class="data-img">
      <img src="${Poster}" alt="a poster for the movie called ${Title}">
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
          <img src="/images/add-icon.png" alt="add icon" class="add-icon" data-button="add">
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

function render(html) {
  document.getElementById('movieWrapper').innerHTML = html
}