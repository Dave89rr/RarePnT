import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { addReviewThunk } from '../../store/reviews';

function ReviewFormPage(props) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  // Missing Spot Id. pass through props useParam to detect spot ID
  const spotInfo = useSelector((state) => state.spot);
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');
  const [errors, setErrors] = useState([]);

  if (!sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO - Validation Errors
    setErrors([]);
    const reviewInput = {
      user: sessionUser,
      spotId: 52,
      rating,
      review,
    };
    return dispatch(addReviewThunk(reviewInput));
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, id) => (
          <li key={id}>{error}</li>
        ))}
      </ul>
      <label>
        Rating
        <input
          type="text"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />
      </label>
      <label>
        Review
        <input
          type="text"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
}

export default ReviewFormPage;
