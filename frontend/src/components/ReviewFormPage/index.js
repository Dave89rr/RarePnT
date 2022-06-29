import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addReviewThunk } from '../../store/spots';

function ReviewFormPage({ spot, setReviewOpen }) {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO - Validation Errors
    setErrors([]);
    const reviewInput = {
      userId: sessionUser.id,
      spotId: spot.id,
      rating,
      review,
    };
    dispatch(addReviewThunk(reviewInput, spot.id));
    setReviewOpen(false);
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
