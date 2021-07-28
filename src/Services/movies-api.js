import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const YOUR_ACCESS_KEY = 'da583aa5b747705b0c594860e9daf70e';

export async function fetchTrendingFilms() {
  return await axios
    .get(`trending/movie/day?api_key=${YOUR_ACCESS_KEY}`)
    .then(res => res.data.results);
}

// export function fetchMovieByQuerry(movieName) {
//     return fetchWithErrorHandling(`search/${movieName}?api_key=${YOUR_ACCESS_KEY}`)
// }

// export function fetchMovieDetails(movieId, movieName) {
//     return fetchWithErrorHandling(`${movieName}/${movieId}?api_key=${YOUR_ACCESS_KEY}`)
// }

// export function fetchMovieActors(movieName, movieId) {
//     return fetchWithErrorHandling(`${movieName}/${movieId}/credits?api_key=${YOUR_ACCESS_KEY}`)
// }

// export function fetchMovieReviews(movieName, movieId) {
//     return fetchWithErrorHandling(`${movieName}/${movieId}/reviews?api_key=${YOUR_ACCESS_KEY}`)
// }
