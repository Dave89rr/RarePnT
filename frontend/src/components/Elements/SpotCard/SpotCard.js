import classes from './SpotCard.module.css';
import { Link } from 'react-router-dom';

function SpotCard({ spot }) {
  const sessionUser = useSelector((state) => state.session.user);

  // Need to remove [0] and turn image holder into slider
  const calcAvg = (reviewObj) => {
    let avg = 0;
    const reviews = Object.values(reviewObj);
    if (reviews.length > 0) {
      reviews.forEach((review) => {
        avg += parseInt(review.rating, 10);
      });
      return `${(avg / reviews.length).toFixed(2)} `;
    }
    return 'New ';
  };
  let images;

  if (Object.keys(spot.images).length === 0) {
    images =
      'https://www.flexx.co/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png';
  } else {
    images = Object.values(spot.images)[0].url;
  }

  return (
    <div className={classes.spotCardContainer}>
      <Link key={spot.spotData.id} to={`/spots/${spot.spotData.id}`}>
        <div className={classes.imageContainer}>
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
            {calcAvg(spot.reviews)}
            <img
              className={classes.star}
              src="/media/star.svg"
              alt="spot's star rating icon"
            ></img>
          </span>
        </div>
        <div className={classes.text}>
          <span>XX miles away</span>
        </div>
        <div className={classes.spotTitleContainer}>
          <span className={classes.text}>{spot.spotData.name}</span>
        </div>
      </Link>
    </div>
  );
}

export default SpotCard;
