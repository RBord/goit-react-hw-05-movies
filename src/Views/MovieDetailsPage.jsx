import { useState, useEffect } from 'react';
import {
  useParams,
  Route,
  NavLink,
  useRouteMatch,
  useLocation,
  useHistory,
} from 'react-router-dom';
import * as moviesAPI from '../Services/movies-api';
import Cast from './Cast';
import Reviews from './Reviews';

export default function MovieDetailsPage() {
  const history = useHistory();
  const location = useLocation();
  const { url, path } = useRouteMatch();
  const { movieId } = useParams();
  const [movie, setMovie] = useState();

  useEffect(() => {
    moviesAPI.fetchMovieDetailsById(movieId).then(setMovie);
  }, [movieId]);

  const onGoBack = () => {
    history.push(location?.state?.from ?? '/');
  };
  console.log(history);
  return (
    <>
      {movie && (
        <>
          <button type="button" onClick={onGoBack}>
            Go back!
          </button>
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
              <NavLink to={`${url}/${movieId}/cast`}>Cast </NavLink>
            </li>
            <li>
              <NavLink to={`${url}/${movieId}/reviews`}>Reviews </NavLink>
            </li>
          </ul>
          <hr />

          <Route path={`${path}/:movieId/cast`}>
            <Cast />
          </Route>
          <Route path={`${path}/:movieId/reviews`}>
            <Reviews />
          </Route>
        </>
      )}
    </>
  );
}
