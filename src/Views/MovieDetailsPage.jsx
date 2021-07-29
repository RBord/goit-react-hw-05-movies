import { useState, useEffect } from 'react';
import { useParams, Route, NavLink, useRouteMatch } from 'react-router-dom';
import * as moviesAPI from '../Services/movies-api';
import Cast from './Cast';
import Reviews from './Reviews';

export default function MovieDetailsPage() {
  const { url } = useRouteMatch();
  const { movieId } = useParams();
  const [movie, setMovie] = useState();

  useEffect(() => {
    moviesAPI.fetchMovieDetailsById(movieId).then(setMovie);
  }, [movieId]);
  return (
    <>
      {movie && (
        <>
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <div>
              <h1>{movie.title}</h1>
              <p>User score: {movie.vote_average}</p>
              <h2>Overview</h2>
              <p>{movie.overview}</p>
              <h2>Genres</h2>
              {movie.genres && (
                <ul>
                  {movie.genres.map(genre => (
                    <li key={genre.id}>{genre.name}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <hr />
          <p>Additional information</p>
          <ul>
            <li>
              <NavLink to={`${url}/cast`}>Cast </NavLink>
            </li>
            <li>
              <NavLink to={`${url}/reviews`}>Reviews </NavLink>
            </li>
          </ul>
          <hr />

          <Route path={`/movies/:movieId/cast`}>
            <Cast />
          </Route>
          <Route path={`/movies/:movieId/reviews`}>
            <Reviews />
          </Route>
        </>
      )}
    </>
  );
}
