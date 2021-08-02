import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as moviesAPI from '../../Services/movies-api';
import s from './HomePage.module.css';

export default function HomePage() {
  const location = useLocation();
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    moviesAPI.fetchTrendingFilms().then(setMovies);
  }, []);

  return (
    <>
      <h1>Trending today</h1>
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

HomePage.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
};
