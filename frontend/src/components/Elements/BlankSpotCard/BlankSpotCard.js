import classes from './BlankSpotCard.module.css';

function BlankSpotCard() {
  return (
    <div className={classes.spotCardContainerBlank}>
      <div className={classes.imageContainerBlank}>
        <div className={classes.skeleton}>
          <div className={classes.blankCardIndicator}></div>
        </div>
      </div>
      <div className={classes.locationContainer}>
        <div className={classes.location}>
          <div className={classes.skeleton}>
            <div className={classes.blankCardIndicator}></div>
          </div>
        </div>
        <div className={classes.rating}>
          <div className={classes.skeleton}>
            <div className={classes.blankCardIndicator}></div>
          </div>
        </div>
      </div>
      <div className={classes.distance}>
        <div className={classes.skeleton}>
          <div className={classes.blankCardIndicator}></div>
        </div>
      </div>
      <div className={classes.spotTitleContainer}>
        <div className={classes.skeleton}>
          <div className={classes.blankCardIndicator}></div>
        </div>
      </div>
    </div>
  );
}

export default BlankSpotCard;
