import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { editSpotThunk } from '../../store/spots';

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
  const [errors, setErrors] = useState([]);
  const { id } = useParams();

  if (!sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO - Validation Errors
    setErrors([]);
    const spot = {
      id,
      userId: sessionUser.id,
      name,
      address,
      city,
      state,
      country,
      description,
      latitude,
      longitude,
    };

    dispatch(editSpotThunk(spot));
    setEditOpen(false);
    return;
  };
  const handleCancel = (e) => {
    e.preventDefault();
    setEditOpen(false);
  };

  return (
    <>
      <h1>EDIT Spot</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, id) => (
            <li key={id}>{error}</li>
          ))}
        </ul>
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Address
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>
        <label>
          City
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>
        <label>
          State
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </label>
        <label>
          Country
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </label>
        <label>
          Description
          <textarea
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Latitude
          <input
            type="text"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
        </label>
        <label>
          Longitude
          <input
            type="text"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
        <button onClick={() => handleCancel}>Cancel</button>
      </form>
    </>
  );
}

export default EditSpotForm;
