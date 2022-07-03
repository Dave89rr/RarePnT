import classes from './BlankSpotCard.module.css';

function BlankSpotCard() {
  return (
    <div className={classes.spotCardContainerBlank}>
      <div className={classes.imageContainerBlank}></div>
      <div className={classes.locationContainer}>
        <div className={classes.location}></div>
        <div className={classes.rating}></div>
      </div>
      <div className={classes.distance}></div>
      <div className={classes.spotTitleContainer}></div>
    </div>
  );
}

export default BlankSpotCard;
