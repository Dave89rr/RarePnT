import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { addSpot } from '../../../store/spots';
import classes from './SpotFormPage.module.css';

function SpotFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [shortDescrip, setShortDescrip] = useState('');
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState([]);

  if (!sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = [];
    if (!isFinite(latitude))
      errors.push('Please input a number with decimal for latitude');
    if (!latitude.length) errors.push('Please provide a latitude');
    if (!isFinite(longitude))
      errors.push('Please input a number with decimal for longitude');
    if (!longitude.length) errors.push('Please provide a latitude');

    setErrors(errors);
    const spot = {
      userId: sessionUser.id,
      name,
      address,
      city,
      state,
      country,
      description,
      latitude,
      longitude,
      shortDescrip,
    };

    if (!errors.length) {
      dispatch(addSpot(spot));

      setName('');
      setAddress('');
      setCity('');
      setState('');
      setCountry('');
      setDescription('');
      setLatitude('');
      setLongitude('');
      setShortDescrip('');

      history.push('/');
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    const errors = [];
    if (step === 1) {
      if (!name.length) errors.push('Please provide a name for the spot');
      if (shortDescrip.length > 255)
        errors.push('Short Description must be less than 255 characters');
      if (!shortDescrip.length)
        errors.push('Please provide a short description');
      if (!description.length)
        errors.push('Please provide details for the spot');
    }
    if (step === 2) {
      if (!address.length) errors.push('Please provide an address');
      if (!city.length) errors.push('Please provide a city');
      if (!state.length) errors.push('Please provide a state');
      if (!country.length) errors.push('Please provide a country');
    }

    setErrors(errors);
    if (!errors.length) setStep(step + 1);
  };
  const handlePrev = (e) => {
    e.preventDefault();
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const step1 = (
    <>
      <div className={classes.formInputContainer}>
        <input
          type="text"
          value={name}
          className={classes.topInput}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label className={name && classes.filled}>Name</label>
      </div>
      <div className={classes.formInputContainer}>
        <input
          type="text"
          value={shortDescrip}
          className={classes.midInput}
          onChange={(e) => setShortDescrip(e.target.value)}
          required
        />
        <label className={shortDescrip && classes.filled}>
          Short Description
        </label>
      </div>
      <div className={classes.formInputContainer}>
        <textarea
          type="text"
          value={description}
          className={classes.textareaInput}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <label className={description && classes.filled}>Details</label>
      </div>
    </>
  );

  const step2 = (
    <>
      <div className={classes.formInputContainer}>
        <input
          type="text"
          value={address}
          className={classes.topInput}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <label className={address && classes.filled}>Address</label>
      </div>
      <div className={classes.formInputContainer}>
        <input
          type="text"
          value={city}
          className={classes.midInput}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <label className={city && classes.filled}>City</label>
      </div>
      <div className={classes.formInputContainer}>
        <input
          type="text"
          value={state}
          className={classes.midInput}
          onChange={(e) => setState(e.target.value)}
          required
        />
        <label className={state && classes.filled}>State</label>
      </div>
      <div className={classes.formInputContainer}>
        <input
          type="text"
          value={country}
          className={classes.bottomInput}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
        <label className={country && classes.filled}>Country</label>
      </div>
    </>
  );
  const step3 = (
    <>
      <div className={classes.formInputContainer}>
        <input
          type="text"
          value={latitude}
          className={classes.topInput}
          onChange={(e) => setLatitude(e.target.value)}
        />
        <label className={latitude && classes.filled}>Latitude</label>
      </div>
      <div className={classes.formInputContainer}>
        <input
          type="text"
          value={longitude}
          className={classes.bottomInput}
          onChange={(e) => setLongitude(e.target.value)}
        />
        <label className={longitude && classes.filled}>Longitude</label>
      </div>
    </>
  );

  return (
    <div className={classes.formContainer}>
      <h2>Add a new spot</h2>
      <form onSubmit={handleSubmit} className={classes.form}>
        <ul>
          {errors.map((error, id) => (
            <li key={id}>{error}</li>
          ))}
        </ul>
        {step === 1 ? step1 : ''}
        {step === 2 ? step2 : ''}
        {step === 3 ? step3 : ''}
        {step < 3 ? (
          <div className={classes.buttonHldr}>
            {step > 1 ? (
              <span onClick={handlePrev} className={classes.backBtn}>
                {'<'} Back
              </span>
            ) : (
              <span></span>
            )}
            <button className={classes.formBtnNext} onClick={handleNext}>
              Next
            </button>
          </div>
        ) : (
          ''
        )}
        {step === 3 ? (
          <button disabled={!errors} className={classes.formBtn} type="submit">
            Submit
          </button>
        ) : (
          ''
        )}
      </form>
    </div>
  );
}

export default SpotFormPage;
