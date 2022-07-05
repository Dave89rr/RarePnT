import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../../store/session';
import classes from './ProfileButton.module.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <div>
        <div className={classes.menuButton}>
          <img
            className={classes.menuIcon}
            src="/media/menu.svg"
            alt="menu button"
          />
          <img
            className={classes.profileIcon}
            src="/media/profileicon.svg"
            alt="user profile"
            onClick={openMenu}
          />
          {/* <button>
            <i className="fas fa-user-circle" />
          </button> */}
        </div>
        {showMenu && (
          <div className={classes.safetyNet}>
            <div className={classes.userMenu}>
              <div className={classes.menuItem}>
                <span>{user.username}</span>
              </div>
              <div className={classes.menuItem}>
                <span>{user.email}</span>
              </div>
              <div className={classes.menuItem}>
                <span className={classes.logoutLink} onClick={logout}>
                  Log Out
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ProfileButton;
