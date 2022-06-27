import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import SpotFormPage from './components/SpotFormPage';
import ReviewFormPage from './components/ReviewFormPage';
import { getSpotThunk, removeSpotThunk } from './store/spots';
import EditSpotForm from './components/EditSpotFormPage';

function App() {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots);
  const spotsArray = [];
  for (let key in spots) {
    spotsArray.push(spots[key].spotData);
  }
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
  useEffect(() => {
    dispatch(getSpotThunk());
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/spotform">
            <SpotFormPage />
          </Route>
          <Route path="/reviewform">
            <ReviewFormPage />
          </Route>
          <Route path="/editspot">
            <EditSpotForm />
          </Route>
        </Switch>
      )}
      <div>
        <ul>
          {spotsArray.map((spot) => {
            return (
              <div className="li">
                <li key={spot.id}>{spot.name}</li>
                <button
                  key={`button-${spot.id}`}
                  onClick={() => dispatch(removeSpotThunk(spot.id))}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
