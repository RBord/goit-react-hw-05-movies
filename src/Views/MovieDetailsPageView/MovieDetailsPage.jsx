import { useState, useEffect, lazy, Suspense } from 'react';
import {
  useParams,
  Route,
  NavLink,
  Switch,
  useRouteMatch,
  useLocation,
  useHistory,
} from 'react-router-dom';
import * as moviesAPI from '../../Services/movies-api';
import s from './MovieDetailsPage.module.css';
const Cast = lazy(() =>
  import('../Cast/Cast' /* webpackChunkName: 'cast-info'*/),
);
const Reviews = lazy(() =>
  import('../Reviews' /* webpackChunkName: 'reviews-info'*/),
);

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
    history.push(location.state.from);
  };
  return (
    <>
      {movie && (
        <>
          <button type="button" onClick={onGoBack} className={s.button}>
            Go back!
          </button>
          <div className={s.movieContainer}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <div className={s.infoContainer}>
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
          <h2 className={s.subtitle}>Additional information</h2>
          <ul className={s.ul}>
            <li>
              <NavLink
                to={{
                  pathname: `${url}/cast`,
                  state: { from: location.state.from },
                }}
                className={s.link}
              >
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink
                to={{
                  pathname: `${url}/reviews`,
                  state: { from: location.state.from },
                }}
                className={s.link}
              >
                Reviews
              </NavLink>
            </li>
          </ul>
          <hr />

          <Suspense fallback={<h1>Загружаем инфо...</h1>}>
            <Switch>
              <Route path={`${path}/cast`}>
                <Cast movieId={movieId} />
              </Route>
              <Route path={`${path}/reviews`}>
                <Reviews movieId={movieId} />
              </Route>
            </Switch>
          </Suspense>
        </>
      )}
    </>
  );
}
