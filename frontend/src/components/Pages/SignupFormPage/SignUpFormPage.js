import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as sessionActions from '../../../store/session';
import classes from './SignupFormPage.module.css';
import { Link } from 'react-router-dom';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(
        sessionActions.signup({ email, username, password })
      ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    }
    return setErrors([
      'Confirm Password field must be the same as the Password field',
    ]);
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
      <h2>Sign Up</h2>
      <form className={classes.form} onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div className={classes.formInputContainer}>
          <input
            className={classes.topInput}
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className={email && classes.filled}>Email</label>
        </div>
        <div className={classes.formInputContainer}>
          <input
            className={classes.midInput}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label className={username && classes.filled}>Username</label>
        </div>
        <div className={classes.formInputContainer}>
          <input
            className={classes.midInput}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label className={password && classes.filled}>Password</label>
        </div>
        <div className={classes.formInputContainer}>
          <input
            type="password"
            className={classes.bottomInput}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <label className={confirmPassword && classes.filled}>
            Confirm Password
          </label>
        </div>
        <button className={classes.formBtn} type="submit">
          Sign Up
        </button>
      </form>
      <p>
        Already have an account?{' '}
        <Link className={classes.loginLink} to="/login">
          Log In
        </Link>
      </p>
      <div>
        <h2>Or</h2>
        <p>Try out the site without signup</p>
        <button className={classes.formBtn} onClick={handleDemo}>
          Demo User
        </button>
      </div>
    </div>
  );
}

export default SignupFormPage;
