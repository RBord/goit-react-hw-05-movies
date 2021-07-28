import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as moviesAPI from '../Services/movies-api';

export default function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState();

  useEffect(() => {
    moviesAPI.fetchMovieActors(movieId).then(setCast);
  }, [movieId]);
  console.log(cast);
  return (
    <>
      <p>{movieId}</p>
    </>
  );
}
