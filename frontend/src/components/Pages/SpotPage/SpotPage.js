import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import {
  getOneSpotThunk,
  removeSpotThunk,
  removeReviewThunk,
} from '../../../store/spots';
import EditSpotForm from '../../Forms/EditSpotForm';
import ReviewFormPage from '../../Forms/ReviewForm';
import classes from './SpotPage.module.css';
import parsedUrl from '../../../utils';
import SpotPageImages from '../../Elements/SpotPageImages/SpotPageImages';

function SpotPage() {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [editOpen, setEditOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const spotInfo = useSelector((state) => state.spots[id]);

  useEffect(() => {
    dispatch(getOneSpotThunk(id));
  }, [dispatch, id]);

  const handleDelete = () => {
    dispatch(removeSpotThunk(id));
    history.push('/');
  };

  const handleReview = () => {
    setReviewOpen(true);
  };
  const handleReviewDelete = (id) => {
    dispatch(removeReviewThunk(id, spotInfo.spotData.id));
  };

  if (!spotInfo) return <p>Loading...</p>;
  return (
    <div className="">
      <h1>{spotInfo.spotData.name}</h1>
      <div className={classes.imgContainer}>
        {
          spotInfo && spotInfo.images && <SpotPageImages id={id} />
          /* Object.values(spotInfo.images).map((img) => {
            return (
              <img
                src={img.url}
                key={img.id}
                className={classes.spotImage}
                alt={spotInfo.spotData.name}
              />
            );
          }) */
        }
      </div>
      <ul>
        <li key={spotInfo.spotData.description}>
          {spotInfo.spotData.description}
        </li>
        <li key={`${spotInfo.spotData.address}-addres`}>
          {spotInfo.spotData.address}
        </li>
        <li key={`${spotInfo.spotData.city}-city`}>{spotInfo.spotData.city}</li>
        <li key={`${spotInfo.spotData.state}-state`}>
          {spotInfo.spotData.state}
        </li>
        <li key={`${spotInfo.spotData.country}-country`}>
          {spotInfo.spotData.country}
        </li>
        <li key={`${spotInfo.spotData.latitude}-lat`}>
          {spotInfo.spotData.latitude}
        </li>
        <li key={`${spotInfo.spotData.longitude}-long`}>
          {spotInfo.spotData.longitude}
        </li>
        <li>
          <a
            className={classes.mapsUrl}
            href={`${parsedUrl(spotInfo.spotData)}`}
          >
            See on Google Maps
          </a>
        </li>
      </ul>
      {sessionUser && sessionUser.id === spotInfo.spotData.userId && (
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
      {editOpen && (
        <EditSpotForm spot={spotInfo.spotData} setEditOpen={setEditOpen} />
      )}
      {reviewOpen && (
        <ReviewFormPage
          spot={spotInfo.spotData}
          setReviewOpen={setReviewOpen}
        />
      )}
      <div className={classes.reviewContainer}>
        {Object.values(spotInfo.reviews).map((review) => {
          return (
            <div className={classes.review} key={review.id}>
              <h2>
                {review.User.username} - {review.rating}/5
              </h2>
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
