import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotThunk } from '../../../store/spots';
import classes from './Homepage.module.css';
import SpotCard from '../../Elements/SpotCard/SpotCard';

function HomePage() {
  const spots = useSelector((state) => state.spots);
  const dispatch = useDispatch();
  const spotsArray = Object.values(spots);
  // const spotsArray = [];
  // for (let key in spots) {
  //   spotsArray.push(spots[key].spotData);
  // }
  useEffect(() => {
    dispatch(getSpotThunk());
  }, [dispatch]);

  if (!spots) return <p>Loading...</p>;
  return (
    <div className={classes.cardsContainer}>
      {/* <ul> */}
      {spotsArray.map((spot) => {
        return (
          <Link key={spot.spotData.id} to={`/spots/${spot.spotData.id}`}>
            <SpotCard spot={spot} />
          </Link>

          // <div className={classes.li} key={spot.id}>
          //   <Link to={`/spots/${spot.id}`}>
          //     <li>{spot.name}</li>
          //   </Link>
          // </div>
        );
      })}
      {/* </ul> */}
    </div>
  );
}
export default HomePage;
