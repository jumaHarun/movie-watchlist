let watchlist = []

if (localStorage.getItem('localWatchlist')) {
  watchlist = JSON.parse(localStorage.getItem('localWatchlist'))
  console.log(watchlist);
} else {
  console.log('No watchlist in local storage');
}
