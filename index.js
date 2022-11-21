const searchInput = document.getElementById('search')
const prompt = document.getElementById('prompt')
const apiKey = '8b0ff547'

let searchResults = []

document.addEventListener('click', (e) => {
  if (e.target.dataset.button) {
    if (e.target.dataset.button === 'search') {
      handleSearchBtnClick()
    }

    if (e.target.dataset.button === 'add') {
      if (e.target.dataset.movie) {
        handleAddBtnClick(e.target.dataset.movie)
      }

    }

    if (e.target.dataset.button === 'remove') {
      handleRemoveBtnClick()
    }
  }
})

async function handleSearchBtnClick() {
  try {
    const moviesArray = await getMoviesAPI(searchInput.value)
    const html = getMoviesHtml(moviesArray)

    render(html)

  } catch (err) {
    console.log(err)
  }
}

function handleAddBtnClick(title) {
  const movieObj = searchResults.find(movie => movie.Title === title)
  saveToWatchlist(movieObj)
}

async function getMoviesAPI(title) {
  const moviesArray = []
  const responseOne = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${title}`)
  const dataOne = await responseOne.json()

  for await (const movie of dataOne.Search) {
    const responseTwo = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${movie.Title}`)
    const dataTwo = await responseTwo.json()
    if (!dataTwo.Error) {
      moviesArray.push(dataTwo)
    }
  }
  searchResults = moviesArray
  return moviesArray
}

function saveToWatchlist(obj) {
  let watchlist = []

  if (localStorage.getItem('localWatchlist')) {
    watchlist = JSON.parse(localStorage.getItem('localWatchlist'))

    const found = watchlist.find(movie => movie.Title === obj.Title)

    if (!found) {
      watchlist.push(obj)
      localStorage.setItem('localWatchlist', JSON.stringify(watchlist))
      promptUser(obj, 1)
    } else {
      promptUser(obj, 2)
    }
  } else {
    watchlist.push(obj)
    localStorage.setItem('localWatchlist', JSON.stringify(watchlist))
    promptUser(obj, 1)
  }
}

function getMoviesHtml(moviesArray) {
  let html = ''

  moviesArray.map(movie => {
    const { Title, Year, Poster, imdbRating, Runtime, Genre, Plot, Type } = movie

    html += `
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
          <img src="/images/add-icon.png" alt="add icon" class="add-icon" data-button="add" data-movie="${Title}">
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
  })

  return html
}

function promptUser(obj, n) {
  prompt.style.display = 'block'
  prompt.textContent = n === 1 ? `${obj.Title} saved to watchlist 🚀`
    : `${obj.Title} is already in your watchlist 👏🏻`
  setTimeout(() => {
    prompt.style.display = 'none'
    prompt.textContent = ''
  }, 1500)
}

function render(html) {
  document.getElementById('movieWrapper').innerHTML = html
}