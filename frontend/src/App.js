import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/Pages/LoginFormPage';
import SignupFormPage from './components/Pages/SignupFormPage';
import * as sessionActions from './store/session';
import Navigation from './components/Elements/Navigation';
import SpotForm from './components/Forms/SpotForm';
import AddReviewForm from './components/Forms/ReviewForm';
import EditSpotForm from './components/Forms/EditSpotForm';
import HomePage from './components/Pages/Homepage';
import SpotPage from './components/Pages/SpotPage';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const storeLocation = (location) => {
    const params = {
      yourLat: location.coords.latitude,
      yourLon: location.coords.longitude,
    };

    dispatch(sessionActions.setLocation(params));
  };

  navigator.geolocation.getCurrentPosition(
    storeLocation,
    (err) => console.log(err),
    { timeout: 10000 }
  );

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/spots/new">
            <SpotForm />
          </Route>
          <Route path="/reviewform">
            <AddReviewForm />
          </Route>
          <Route path="/editspot">
            <EditSpotForm />
          </Route>
          <Route path="/spots/:id">
            <SpotPage />
          </Route>
          <Route path="/spots/:id/edit">
            <EditSpotForm />
          </Route>
          <Route>
            <h2>404 - Page Not Found</h2>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
