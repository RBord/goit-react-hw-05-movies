import { useState, useEffect } from 'react';
// import { Link, useRouteMatch } from 'react-router-dom';
import * as moviesAPI from '../Services/movies-api';

export default function HomePage() {
  // const { url } = useRouteMatch();
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
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      )}
    </>
  );
}
