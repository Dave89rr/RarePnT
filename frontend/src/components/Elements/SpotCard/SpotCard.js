import classes from './SpotCard.module.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { calcAvgRating, calcDistance } from '../../../utils';

function SpotCard({ spot }) {
  const sessionUser = useSelector((state) => state.session.user);

  // Need to remove [0] and turn image holder into slider

  let images;

  if (Object.keys(spot.images).length === 0) {
    images =
      'https://www.flexx.co/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png';
  } else {
    images = Object.values(spot.images)[0].url;
  }

  let userCoords;
  if (!sessionUser) {
    let yourLat = localStorage.getItem('yourLat');
    let yourLon = localStorage.getItem('yourLon');
    userCoords = { yourLat, yourLon };
  } else {
    userCoords = sessionUser.location;
  }

  const spotCoords = {
    lat: spot.spotData.latitude,
    lon: spot.spotData.longitude,
  };

  return (
    <div className={classes.spotCardContainer}>
      <Link key={spot.spotData.id} to={`/spots/${spot.spotData.id}`}>
        <div className={classes.imageContainer}>
          <div className={classes.imageContainerFill}></div>
          <img
            className={classes.image}
            src={images}
            alt={`View of ${spot.spotData.name}`}
          />
        </div>
        <div className={classes.location}>
          <span>
            {spot.spotData.city}, {spot.spotData.state}
          </span>
          <span>
            {calcAvgRating(spot.reviews)}
            <img
              className={classes.star}
              src="/media/star.svg"
              alt="spot's star rating icon"
            ></img>
          </span>
        </div>
        <div className={classes.text}>
          <span>{calcDistance(userCoords, spotCoords)}</span>
        </div>
        <div className={classes.spotTitleContainer}>
          <span className={classes.text}>{spot.spotData.name}</span>
        </div>
      </Link>
    </div>
  );
}

export default SpotCard;
