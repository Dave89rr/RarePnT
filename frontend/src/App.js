import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/Forms/LoginForm';
import SignupForm from './components/Forms/SignupForm';
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
            <SignupForm />
          </Route>
          <Route path="/spotform">
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
