import { useState, useEffect } from 'react';
import * as moviesAPI from '../Services/movies-api';

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
          {reviews.map(review => (
            <li key={review.id}>
              <h2>Author: {review.author}</h2>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}

      {zeroReviews && <p>Нет отзывов о фильме! :(</p>}
    </>
  );
}
