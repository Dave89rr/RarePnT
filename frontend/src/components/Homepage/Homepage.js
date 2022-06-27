import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotThunk } from '../../store/spots';
import classes from './Homepage.module.css';

function HomePage() {
  const spots = useSelector((state) => state.spots);
  const dispatch = useDispatch();
  const spotsArray = [];
  for (let key in spots) {
    spotsArray.push(spots[key].spotData);
  }
  useEffect(() => {
    dispatch(getSpotThunk());
  }, [dispatch]);
  return (
    <div>
      <ul>
        {spotsArray.map((spot) => {
          return (
            <div className={classes.li} key={spot.id}>
              <Link to={`/spots/${spot.id}`}>
                <li>{spot.name}</li>
              </Link>
            </div>
          );
        })}
      </ul>
    </div>
  );
}
export default HomePage;
