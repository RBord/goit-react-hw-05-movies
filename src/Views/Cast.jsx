import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as moviesAPI from '../Services/movies-api';

export default function Cast() {
  const { movieId } = useParams();
  const [casts, setCast] = useState([]);

  useEffect(() => {
    moviesAPI.fetchMovieActors(movieId).then(setCast);
  }, [movieId]);

  return (
    <>
      {casts &&
        casts.map(cast => (
          <li key={cast.id}>
            <img
              src={`https://image.tmdb.org/t/p/w185${cast.profile_path}`}
              alt={cast.name}
            />
            <p>{cast.name}</p>
            <p>Character: {cast.character}</p>
          </li>
        ))}
    </>
  );
}
