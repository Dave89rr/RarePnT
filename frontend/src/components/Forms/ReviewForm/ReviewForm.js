import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addReviewThunk } from '../../../store/spots';
import classes from './ReviewForm.module.css';

function AddReviewForm({ spot, setReviewOpen }) {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ratingRegex = new RegExp('^(?!.*[a-zA-Z]).*$');
    const errors = [];
    if (rating < 1 || rating > 5) errors.push('Rating must be between 1 and 5');
    if (!ratingRegex.test(rating)) errors.push('Rating must be a number');
    setErrors(errors);
    const reviewInput = {
      userId: sessionUser.id,
      spotId: spot.id,
      rating: parseInt(rating, 10),
      review,
    };
    if (!errors.length) {
      dispatch(addReviewThunk(reviewInput, spot.id));
      setReviewOpen(false);
    }
  };

  return (
    <div className={classes.form}>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, id) => (
            <li key={id}>{error}</li>
          ))}
        </ul>
        <div className={classes.formInputContainer}>
          <input
            type="text"
            value={rating}
            className={classes.topInput}
            onChange={(e) => setRating(e.target.value)}
            required
          />
          <label className={rating && classes.filled}>Rating</label>
        </div>
        <div className={classes.formInputContainer}>
          <input
            type="text"
            value={review}
            className={classes.bottomInput}
            onChange={(e) => setReview(e.target.value)}
          />
          <label className={review && classes.filled}>Review</label>
        </div>
        <button className={classes.formBtn} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddReviewForm;
