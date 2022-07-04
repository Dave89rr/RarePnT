import React, { useState } from 'react';
import * as sessionActions from '../../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import classes from './LoginForm.module.css';

function LoginForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  const handleDemo = (e) => {
    e.stopPropagation();
    return dispatch(
      sessionActions.login({
        credential: 'Demo-lition',
        password: 'password',
      })
    ).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  };

  return (
    <div className={classes.formContainer}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className={classes.loginForm}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div className={classes.usernameContainer}>
          <input
            className={classes.usernameInput}
            id="emailorusername"
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
          <label className={credential && classes.filled}>
            Username or Email
          </label>
        </div>
        <div className={classes.passwordContainer}>
          <input
            className={classes.passwordInput}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label className={password && classes.filled}>Password</label>
        </div>
        <button className={classes.formBtn} type="submit">
          Log In
        </button>
      </form>
      <p>
        Need an account?{' '}
        <Link className={classes.signUpLink} to="/signup">
          Sign Up
        </Link>
      </p>
      <div className={classes}>
        <h2>Or</h2>
        <p>Try out the site without signup</p>
        <button className={classes.formBtnDemo} onClick={handleDemo}>
          Demo User
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
