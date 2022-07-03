import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotThunk } from '../../../store/spots';
import classes from './Homepage.module.css';
import SpotCard from '../../Elements/SpotCard/SpotCard';
import BlankSpotCard from '../../Elements/BlankSpotCard';

function HomePage() {
  const spots = useSelector((state) => state.spots);
  const dispatch = useDispatch();
  const spotsArray = Object.values(spots);
  let loaded = !Object.values(spots).length;
  useEffect(() => {
    setTimeout(() => {
      dispatch(getSpotThunk());
    }, 750);
  }, [dispatch]);

  const numBlankCards = 21;

  if (loaded)
    return (
      <div className={classes.cardsContainer}>
        {[...Array(numBlankCards)].map((e, i) => (
          <BlankSpotCard key={i} />
        ))}
      </div>
    );
  return (
    <div className={classes.cardsContainer}>
      {spotsArray.map((spot) => {
        return <SpotCard key={spot.spotData.id} spot={spot} />;
      })}
    </div>
  );
}
export default HomePage;
