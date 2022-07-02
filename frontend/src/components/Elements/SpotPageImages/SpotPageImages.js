import { useSelector } from 'react-redux';
import classes from './SpotPageImages.module.css';

function SpotPageImages({ id }) {
  const spotInfo = useSelector((state) => state.spots[id]);

  if (!spotInfo) return <p>Loading...</p>;
  const images = Object.values(spotInfo.images);
  const img1 = images[0];
  const img2 = images[1];
  const img3 = images[2];

  return (
    <div className={classes.imageContainer}>
      <div className={classes.img1div}>
        <img
          className={classes.img1}
          src={img1.url}
          key={img1.id}
          alt={spotInfo.spotData.name}
        />
      </div>
      <div className={classes.secondaryImages}>
        <div className={classes.img2div}>
          <img
            className={classes.img2}
            src={img2.url}
            key={img2.id}
            alt={spotInfo.spotData.name}
          />
        </div>
        <div className={classes.img3div}>
          <img
            className={classes.img3}
            src={img3.url}
            key={img3.id}
            alt={spotInfo.spotData.name}
          />
        </div>
      </div>
    </div>
  );
}

export default SpotPageImages;
