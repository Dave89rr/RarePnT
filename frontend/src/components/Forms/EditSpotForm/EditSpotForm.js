import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { editSpotThunk } from '../../../store/spots';
import classes from './EditSpotForm.module.css';

function EditSpotForm({ spot, setEditOpen }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [name, setName] = useState(spot.name);
  const [address, setAddress] = useState(spot.address);
  const [city, setCity] = useState(spot.city);
  const [state, setState] = useState(spot.state);
  const [country, setCountry] = useState(spot.country);
  const [description, setDescription] = useState(spot.description);
  const [latitude, setLatitude] = useState(spot.latitude);
  const [longitude, setLongitude] = useState(spot.longitude);
  const [shortDescrip, setShortDescrip] = useState(spot.shortDescrip);
  const [errors, setErrors] = useState([]);
  const { id } = useParams();

  if (!sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO - Validation Errors
    setErrors([]);
    console.log(shortDescrip);
    const spot = {
      id,
      userId: sessionUser.id,
      name,
      shortDescrip,
      address,
      city,
      state,
      country,
      description,
      latitude,
      longitude,
    };
    console.log(spot);
    dispatch(editSpotThunk(spot));
    setEditOpen(false);
    return;
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setEditOpen(false);
  };

  return (
    <div className={classes.formContainer}>
      <h2>EDIT Spot</h2>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, id) => (
            <li key={id}>{error}</li>
          ))}
        </ul>
        <div className={classes.formInputContainer}>
          <input
            type="text"
            value={name}
            className={classes.topInput}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label className={classes.filled}>Name</label>
        </div>
        <div className={classes.formInputContainer}>
          <input
            type="text"
            value={shortDescrip}
            className={classes.midInput}
            onChange={(e) => setShortDescrip(e.target.value)}
          />
          <label className={classes.filled}>Short Description</label>
        </div>
        <div className={classes.formInputContainer}>
          <textarea
            type="text"
            value={description}
            className={classes.textareaInput}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <label className={classes.filled}>Details</label>
        </div>
        <div className={classes.formInputContainer}>
          <input
            type="text"
            value={address}
            className={classes.midInput}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <label className={classes.filled}>Address</label>
        </div>
        <div className={classes.formInputContainer}>
          <input
            type="text"
            value={city}
            className={classes.midInput}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <label className={classes.filled}>City</label>
        </div>
        <div className={classes.formInputContainer}>
          <input
            type="text"
            value={state}
            className={classes.midInput}
            onChange={(e) => setState(e.target.value)}
            required
          />
          <label className={classes.filled}>State</label>
        </div>
        <div className={classes.formInputContainer}>
          <input
            type="text"
            value={country}
            className={classes.midInput}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
          <label className={classes.filled}>Country</label>
        </div>

        <div className={classes.formInputContainer}>
          <input
            type="text"
            value={latitude}
            className={classes.midInput}
            onChange={(e) => setLatitude(e.target.value)}
          />
          <label className={classes.filled}>Latitude</label>
        </div>
        <div className={classes.formInputContainer}>
          <input
            type="text"
            value={longitude}
            className={classes.bottomInput}
            onChange={(e) => setLongitude(e.target.value)}
          />
          <label className={classes.filled}>Longitude</label>
        </div>
        <button className={classes.formBtn} type="submit">
          Submit
        </button>
        <button className={classes.cancelBtn} onClick={() => handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditSpotForm;
