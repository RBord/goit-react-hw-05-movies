import { useState, useEffect } from 'react';
import * as moviesAPI from '../Services/movies-api';
import PropTypes from 'prop-types';

export default function Review({ movieId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    moviesAPI.fetchMovieReviews(movieId).then(setReviews);
  }, [movieId]);
  const zeroReviews = reviews.length === 0;

  return (
    <>
      {reviews && (
        <ul>
          {reviews.map(({ id, author, content }) => (
            <li key={id}>
              <h2>Author: {author}</h2>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      )}

      {zeroReviews && <p>Нет отзывов о фильме! :(</p>}
    </>
  );
}

Review.propTypes = {
  id: PropTypes.number,
  author: PropTypes.string,
  content: PropTypes.string,
};
