import { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import * as moviesAPI from '../../Services/movies-api';
import s from './MoviesPage.module.css';
import PropTypes from 'prop-types';

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
          className={s.input}
        />
        <button type="submit" className={s.button}>
          Search
        </button>
      </form>
      <hr />
      {movies && (
        <ul>
          {movies.map(({ id, title }) => (
            <li key={id}>
              <Link
                to={{
                  pathname: `/movies/${id}`,
                  state: { from: location },
                }}
                className={s.link}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

MoviesPage.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
};
