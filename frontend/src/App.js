import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import SpotFormPage from './components/SpotFormPage';
import ReviewFormPage from './components/ReviewFormPage';
import EditSpotForm from './components/EditSpotForm';
import HomePage from './components/Homepage';
import SpotPage from './components/SpotPage';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
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
          <Route path="/spotform">
            <SpotFormPage />
          </Route>
          <Route path="/reviewform">
            <ReviewFormPage />
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
        </Switch>
      )}
    </>
  );
}

export default App;
