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
  let loaded = Object.values(spots).length;

  /*Couldn't figure out component transition (fade in) without using external
  libraries had to use useEffect to diminish weird flashing of blank cards
  followed by filled cards by using a delay on the dispatch */
  useEffect(() => {
    setTimeout(() => {
      dispatch(getSpotThunk());
    }, 1250);
  }, [dispatch]);

  // If first site load, fill page with all blank cards
  if (loaded === 0) {
    const numBlankCards = 21;
    return (
      <div className={classes.cardsContainer}>
        {[...Array(numBlankCards)].map((e, i) => (
          <BlankSpotCard key={i} />
        ))}
      </div>
    );
  }

  /* If user landed in spot and visits home page, fill first card with spot user
  visited and fill all other spots with blanks until dispatch hydrates state */
  if (loaded === 1) {
    const numBlankCards = 20;
    return (
      <div className={classes.cardsContainer}>
        <SpotCard spot={spotsArray[0]} />
        {[...Array(numBlankCards)].map((e, i) => (
          <BlankSpotCard key={i} />
        ))}
      </div>
    );
  }

  // Once state is hydrated render all cards with info
  return (
    <div className={classes.cardsContainer}>
      {spotsArray.map((spot) => {
        return <SpotCard key={spot.spotData.id} spot={spot} />;
      })}
    </div>
  );
}
export default HomePage;
