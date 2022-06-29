//SpotPage.js copy
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import {
  getSpotThunk,
  removeSpotThunk,
  removeReviewThunk,
} from '../../store/spots';
import EditSpotForm from '../EditSpotForm';
import ReviewFormPage from '../ReviewFormPage';
import classes from './SpotPage.module.css';

function SpotPage() {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [editOpen, setEditOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const spotInfo = useSelector((state) => state.spots[id]);
  let spot;
  let reviews;
  let images;
  try {
    spot = spotInfo.spotData;
    reviews = Object.values(spotInfo.reviews);
    images = Object.values(spotInfo.images);
  } catch (e) {
    // temporary fix, need to come back and remove this try /catch
  }

  useEffect(() => {
    dispatch(getSpotThunk());
  }, [dispatch]);

  const handleDelete = () => {
    dispatch(removeSpotThunk(id));
    history.push('/');
  };

  const handleReview = () => {
    setReviewOpen(true);
  };
  const handleReviewDelete = (id) => {
    dispatch(removeReviewThunk(id, spot.id));
  };

  if (spot)
    return (
      <div className="">
        <h1>{spot.name}</h1>
        <div className={classes.imgContainer}>
          {images.map((img) => {
            return (
              <img
                src={img.url}
                key={img.id}
                className={classes.spotImage}
                alt={spot.name}
              />
            );
          })}
        </div>
        <ul>
          <li key={spot.description}>{spot.description}</li>
          <li key={`${spot.address}-addres`}>{spot.address}</li>
          <li key={`${spot.city}-city`}>{spot.city}</li>
          <li key={`${spot.state}-state`}>{spot.state}</li>
          <li key={`${spot.country}-country`}>{spot.country}</li>
          <li key={`${spot.latitude}-lat`}>{spot.latitude}</li>
          <li key={`${spot.longitude}-long`}>{spot.longitude}</li>
        </ul>
        {sessionUser && sessionUser.id === spot.userId && (
          <>
            <button onClick={handleDelete}>DELETE</button>
            <button
              onClick={() => {
                setEditOpen(true);
              }}
            >
              Edit
            </button>
          </>
        )}
        {sessionUser && <button onClick={handleReview}>Review</button>}
        {editOpen && <EditSpotForm spot={spot} setEditOpen={setEditOpen} />}
        {reviewOpen && (
          <ReviewFormPage spot={spot} setReviewOpen={setReviewOpen} />
        )}
        <div className={classes.reviewContainer}>
          {reviews.map((review) => {
            return (
              <div className={classes.review} key={review.id}>
                <h2>{review.rating}/5</h2>
                <p>{review.review}</p>
                {sessionUser && sessionUser.id === review.userId && (
                  <>
                    <button onClick={() => handleReviewDelete(review.id)}>
                      DELETE
                    </button>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
}

export default SpotPage;
