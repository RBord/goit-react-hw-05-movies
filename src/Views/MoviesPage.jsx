import { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import * as moviesAPI from '../Services/movies-api';

export default function MoviesPage() {
  const location = useLocation();
  const history = useHistory();
  const [movieName, setMovieName] = useState('');
  const [movies, setMovies] = useState([]);
  const searchQuerry = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    if (movieName === '') return;
    async function getMoviesByQuerry() {
      try {
        moviesAPI.fetchMovieByQuerry(movieName).then(setMovies);
        history.push({ ...location, search: `query=${movieName}` });
      } catch (error) {
        console.error('Что-то пошло не так!');
      }
    }
    getMoviesByQuerry();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieName]);

  useEffect(() => {
    if (searchQuerry) {
      moviesAPI.fetchMovieByQuerry(searchQuerry).then(setMovies);
    }
  }, [searchQuerry]);
  return (
    <>
      <form
        onSubmit={e => {
          e.preventDefault();
          setMovieName(e.target.elements.movieName.value);
        }}
      >
        <input
          type="text"
          name="movieName"
          autoFocus
          placeholder="Search movies"
        />
        <button type="submit">Search</button>
      </form>
      <hr />
      {movies && (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link
                to={{
                  pathname: `/movies/${movie.id}`,
                  state: { from: location },
                }}
              >
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
