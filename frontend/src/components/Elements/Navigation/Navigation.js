import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import classes from './Navigation.module.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className={classes.userInteraction}>
        <NavLink className={classes.link} to="/spotform">
          Become a Host
        </NavLink>
        <ProfileButton user={sessionUser} />
      </div>
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <nav className={classes.navBar}>
      <div className={classes.navContainer}>
        <div>
          <NavLink to="/">
            <img
              className={classes.navLogo}
              src="/media/logo.svg"
              alt="rarepnt logo"
            ></img>
          </NavLink>
        </div>
        <div>[MISSING COMPONENT HERE]</div>
        <div>{isLoaded && sessionLinks}</div>
      </div>
    </nav>
  );
}

export default Navigation;
