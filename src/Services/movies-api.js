import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const YOUR_ACCESS_KEY = 'da583aa5b747705b0c594860e9daf70e';

export async function fetchTrendingFilms() {
  return await axios
    .get(`trending/movie/day?api_key=${YOUR_ACCESS_KEY}`)
    .then(res => res.data.results);
}

export async function fetchMovieByQuerry(movieName) {
  return await axios
    .get(`search/movie?api_key=${YOUR_ACCESS_KEY}&query=${movieName}`)
    .then(res => res.data.results);
}

export async function fetchMovieDetailsById(movieId) {
  return await axios
    .get(`movie/${movieId}?api_key=${YOUR_ACCESS_KEY}`)
    .then(res => res.data);
}

export async function fetchMovieActors(movieId) {
  return await axios
    .get(`movie/${movieId}/credits?api_key=${YOUR_ACCESS_KEY}`)
    .then(res => res.data.cast);
}

export async function fetchMovieReviews(movieId) {
  return await axios
    .get(`movie/${movieId}/reviews?api_key=${YOUR_ACCESS_KEY}`)
    .then(res => res.data.results);
}
