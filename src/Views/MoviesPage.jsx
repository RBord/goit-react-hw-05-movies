import { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import * as moviesAPI from '../Services/movies-api';

export default function MoviesPage() {
  const { url } = useRouteMatch();
  const [movieName, setMovieName] = useState('');
  const [movies, setMovies] = useState([]);

  const onHandleSubmit = newMovieQuerry => {
    setMovieName(newMovieQuerry);
    setMovies([]);
  };

  useEffect(() => {
    if (movieName === '') return;
    async function getMoviesByQuerry() {
      try {
        moviesAPI.fetchMovieByQuerry(movieName).then(setMovies);
      } catch (error) {
        console.error('Что-то пошло не так!');
      }
    }
    getMoviesByQuerry();
  }, [movieName]);
  console.log(movies);
  return (
    <>
      <form
        onSubmit={e => {
          e.preventDefault();
          onHandleSubmit(e.target.elements.movieName.value);
        }}
      >
        <input type="text" name="movieName" />
        <button>Search</button>
      </form>
      <hr />
      {movies && (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link to={`${url}/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
