import { useState, useEffect } from 'react';
import { useParams, Route } from 'react-router-dom';
import * as moviesAPI from '../Services/movies-api';
import Cast from './Cast';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState();

  useEffect(() => {
    moviesAPI.fetchMovieDetailsById(movieId).then(setMovie);
  }, [movieId]);
  return (
    <>
      {movie && (
        <>
          <img src={movie.poster_path} alt={movie.title} />
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
          <hr />

          <Route path="/movies/:movieId/cast">
            <Cast />
          </Route>
        </>
      )}
    </>
  );
}
