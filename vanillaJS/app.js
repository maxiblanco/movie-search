// themoviedb.org API and query info
const API_KEY = '6eedebcb4636fb0c1d5b61c087044a69';
const API_URL = 'https://api.themoviedb.org/3/';
const API_SEARCH = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false`;
// Get DOM elements
const form = document.getElementById('search');
const resultsGrid = document.getElementById('movie-list');

form.addEventListener('submit', formSubmitted);

function formSubmitted(e) {
  e.preventDefault();
  const input = e.target.elements.searchTerm;
  const query = input.value;
  // Fetch results from API
  getResults(query).then(response => displayResults(response.results));
}

async function getResults(query) {
  const response = await fetch(`${API_SEARCH}&query=${query}`);
  const data = await response.json();
  return data;
}

function displayResults(results) {
  resultsGrid.innerHTML = '';
  console.log(results);
  resultsGrid.innerHTML = results
    .map(result => {
      return `
      <li class="card border-primary mb-3 mx-2" style="max-width: 20rem;">
        <div class="card-header">
          <h2>
            ${result.title}
          </h2>
        </div>
        <div class="card-body">
          <img src=https://image.tmdb.org/t/p/w200${result.poster_path} style="max-width: 100%; display: block; margin: auto;/>
          <p class="card-text">${result.overview}</p>
        </div>
      </li>
    `;
    })
    .join(' ');
}
