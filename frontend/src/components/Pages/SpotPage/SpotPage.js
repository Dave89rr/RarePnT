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
import { calcAvgRating } from '../../../utils';

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
      <h1 className={classes.spotTitle}>{spotInfo.spotData.name}</h1>
      <div className={classes.quickInfo}>
        <span>
          <img
            className={classes.star}
            src="/media/star.svg"
            alt="spot's star rating icon"
          ></img>{' '}
          {calcAvgRating(spotInfo.reviews)}
          {' · '}
          {Object.values(spotInfo.reviews).length} reviews
          {' · '}
          {spotInfo.spotData.city}, {spotInfo.spotData.state},{' '}
          {spotInfo.spotData.country}
        </span>
      </div>
      <div className={classes.imgContainer}>
        {spotInfo && spotInfo.images && <SpotPageImages id={id} />}
      </div>
      <div className={classes.infoContainer}>
        <div className={classes.leftInfoCol}>
          <h2 className={classes.subTittle}>
            {spotInfo.spotData.shortDescrip}
          </h2>
          <p>{spotInfo.spotData.description}</p>
        </div>
        <div className={classes.rightInfoCol}>
          <h2 className={classes.locationTitle}>Location</h2>
          <div className={classes.address}>
            <img
              className={classes.arrow}
              src="/media/locationArrow.svg"
              alt="arrow indicating address to location"
            />{' '}
            <span>{spotInfo.spotData.address}</span>
            <br />
            <span>
              {spotInfo.spotData.city}, {spotInfo.spotData.state}
            </span>
            <br />
            <span>{spotInfo.spotData.country}</span>
          </div>
          <div className={classes.coordinates}>
            <img
              className={classes.compass}
              src="/media/compass.svg"
              alt="compass indicating coordinates to location"
            />{' '}
            <span>
              {spotInfo.spotData.latitude}, {spotInfo.spotData.longitude}
              <img
                className={classes.clipboard}
                src="/media/clipboard.svg"
                alt="cliboard icon to copy spot coordinates"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${spotInfo.spotData.latitude}, ${spotInfo.spotData.longitude}`
                  );
                  alert('Coordinates Copied to your clipboard!');
                }}
              />
            </span>
          </div>
          <div className={classes.exLink}>
            <a
              className={classes.mapsUrl}
              href={`${parsedUrl(spotInfo.spotData)}`}
              target="_blank"
              rel="noreferrer"
            >
              See on Google Maps{' '}
              <img
                className={classes.external}
                src="/media/externalLink.svg"
                alt="icon indicating link is external"
              />
            </a>
          </div>
          {sessionUser && sessionUser.id === spotInfo.spotData.userId && (
            <div className={classes.actionContainer}>
              <button
                className={classes.btn}
                onClick={() => {
                  setEditOpen(true);
                }}
              >
                Edit
              </button>
              <button className={classes.delBtn} onClick={handleDelete}>
                DELETE
              </button>
            </div>
          )}
        </div>
      </div>
      <div className={classes.formContainer}>
        {editOpen && (
          <EditSpotForm spot={spotInfo.spotData} setEditOpen={setEditOpen} />
        )}
      </div>
      <hr className={classes.bar} />
      <div className={classes.reviewContainer}>
        <div className={classes.revieSectionTitle}>
          <h2>
            <img
              className={classes.biggerStar}
              src="/media/star.svg"
              alt="spot's star rating icon"
            ></img>{' '}
            {calcAvgRating(spotInfo.reviews)}
            {' · '}
            {Object.values(spotInfo.reviews).length} reviews
          </h2>
          {sessionUser && (
            <button className={classes.btnRev} onClick={handleReview}>
              Review
            </button>
          )}
        </div>
        {reviewOpen && (
          <ReviewFormPage
            spot={spotInfo.spotData}
            setReviewOpen={setReviewOpen}
          />
        )}
        <div className={classes.reviews}>
          {Object.values(spotInfo.reviews).map((review) => {
            return (
              <div className={classes.review} key={review.id}>
                <h2>
                  {review.User.username} - {review.rating}/5
                </h2>
                <p>{review.review}</p>
                {sessionUser && sessionUser.id === review.userId && (
                  <>
                    <button
                      className={classes.delBtn}
                      onClick={() => handleReviewDelete(review.id)}
                    >
                      DELETE
                    </button>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SpotPage;
