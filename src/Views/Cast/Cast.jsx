import { useState, useEffect } from 'react';
import * as moviesAPI from '../../Services/movies-api';
import s from './Cast.module.css';
import PropTypes from 'prop-types';

export default function Cast({ movieId }) {
  const [casts, setCast] = useState([]);

  useEffect(() => {
    moviesAPI.fetchMovieActors(movieId).then(setCast);
  }, [movieId]);
  return (
    <>
      {casts && (
        <ul className={s.list}>
          {casts.map(({ cast_id, name, profile_path, character }) => (
            <li key={cast_id}>
              <img
                src={`https://image.tmdb.org/t/p/w185${profile_path}`}
                alt={name}
              />
              <p>{name}</p>
              <p>Character: {character}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

Cast.propTypes = {
  movieId: PropTypes.string.isRequired,
  name: PropTypes.string,
  character: PropTypes.string,
  profile_path: PropTypes.string,
  cast_id: PropTypes.number,
};
