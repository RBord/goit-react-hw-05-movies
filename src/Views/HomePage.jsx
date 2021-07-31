import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as moviesAPI from '../Services/movies-api';

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
