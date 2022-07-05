import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { addSpotThunk } from '../../../store/spots';
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
  const [transPerc, setTransPerc] = useState(0);
  const [imgUrl1, setImgUrl1] = useState('');
  const [imgUrl2, setImgUrl2] = useState('');
  const [imgUrl3, setImgUrl3] = useState('');
  const [imgUrls, setImgUrls] = useState([]);
  const [errors, setErrors] = useState([]);
  useEffect(() => {
    if (step === 1) setTransPerc(0);
    if (step === 2) setTransPerc(100);
    if (step === 3) setTransPerc(200);
    if (step === 4) setTransPerc(299);
  }, [step]);

  if (!sessionUser) return <Redirect to="/" />;

  const setUrls = () => {
    const images = [];
    images.push(imgUrl1);
    images.push(imgUrl2);
    images.push(imgUrl3);
    setImgUrls(images);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const imgUrlRegex = new RegExp(
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/
    );
    const errors = [];
    if (!imgUrlRegex.test(imgUrl1)) {
      errors.push('Please provide a valid image url for Image 1');
    }
    if (!imgUrlRegex.test(imgUrl2)) {
      errors.push('Please provide a valid image url for Image 2');
    }
    if (!imgUrlRegex.test(imgUrl3)) {
      errors.push('Please provide a valid image url for Image 3');
    }

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
      dispatch(addSpotThunk(spot, imgUrls));
      console.log(imgUrls);

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
    if (step === 3) {
      if (!isFinite(latitude))
        errors.push('Please input a number with decimal for latitude');
      if (Math.abs(latitude) > 90)
        errors.push('Latitude must be within -90 and 90 degrees');
      if (!latitude.length) errors.push('Please provide a latitude');
      if (!isFinite(longitude))
        errors.push('Please input a number with decimal for longitude');
      if (!longitude.length) errors.push('Please provide a latitude');
      if (Math.abs(longitude) > 180)
        errors.push('Longitude must be within -180 and 180 degrees');
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

  const step4 = (
    <>
      <div className={classes.formInputContainer}>
        <input
          type="text"
          value={imgUrl1}
          className={classes.topInput}
          onChange={(e) => setImgUrl1(e.target.value)}
        />
        <label className={imgUrl1 && classes.filled}>Image 1</label>
      </div>
      <div className={classes.formInputContainer}>
        <input
          type="text"
          value={imgUrl2}
          className={classes.midInput}
          onChange={(e) => setImgUrl2(e.target.value)}
        />
        <label className={imgUrl2 && classes.filled}>Image 2</label>
      </div>
      <div className={classes.formInputContainer}>
        <input
          type="text"
          value={imgUrl3}
          className={classes.bottomInput}
          onChange={(e) => setImgUrl3(e.target.value)}
        />
        <label className={imgUrl3 && classes.filled}>Image 3</label>
      </div>
    </>
  );

  return (
    <>
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
          {step === 4 ? step4 : ''}
          {step < 4 ? (
            <div className={classes.buttonHldr}>
              {step > 1 ? (
                <span onClick={handlePrev} className={classes.backBtn}>
                  <img
                    className={classes.chevron}
                    src="/media/chevron-left.svg"
                    alt="back icon"
                  />{' '}
                  Back
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
          {step === 4 ? (
            <button
              disabled={!errors}
              onClick={setUrls}
              className={classes.formBtn}
              type="submit"
            >
              Submit
            </button>
          ) : (
            ''
          )}
        </form>
      </div>

      <div className={classes.progressBarContainer}>
        <div
          style={{ transform: `translateX(${transPerc}%)` }}
          className={classes.progStep}
        >
          <div className={classes.filler}></div>
        </div>
      </div>
    </>
  );
}

export default SpotFormPage;
