import classes from './SpotCard.module.css';

function SpotCard({ spot }) {
  // Need to remove [0] and turn image holder into slider

  let images;

  if (Object.keys(spot.images).length === 0) {
    images =
      'https://www.flexx.co/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png';
  } else {
    images = Object.values(spot.images)[0].url;
  }

  return (
    <div className={classes.spotCardContainer}>
      <div className={classes.imageContainer}>
        <img
          className={classes.image}
          src={images}
          alt={`View of ${spot.spotData.name}`}
        />
      </div>
      <div className={classes.spotTitle}>
        <p>{spot.spotData.name}</p>
      </div>
      <div className={classes.location}>
        <p>
          {spot.spotData.city}, {spot.spotData.state}
        </p>
      </div>
    </div>
  );
}

export default SpotCard;
