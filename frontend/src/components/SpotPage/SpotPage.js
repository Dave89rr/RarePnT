import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { removeSpotThunk } from '../../store/spots';
import EditSpotForm from '../EditSpotForm';

function SpotPage() {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [editOpen, setEditOpen] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const spot = useSelector((state) => state.spots[id].spotData);

  const handleDelete = () => {
    dispatch(removeSpotThunk(id));
    history.push('/');
  };

  return (
    <div>
      <h1>{spot.name}</h1>
      <ul>
        <li key={spot.description}>{spot.description}</li>
        <li key={`${spot.address}-addres`}>{spot.address}</li>
        <li key={`${spot.city}-city`}>{spot.city}</li>
        <li key={`${spot.state}-state`}>{spot.state}</li>
        <li key={`${spot.country}-country`}>{spot.country}</li>
        <li key={`${spot.latitude}-lat`}>{spot.latitude}</li>
        <li key={`${spot.longitude}-long`}>{spot.longitude}</li>
      </ul>
      {sessionUser.id === spot.userId && (
        <>
          <button onClick={handleDelete}>DELETE</button>
          <button
            onClick={() => {
              setEditOpen(true);
            }}
          >
            Edit
          </button>
        </>
      )}
      <button>Review</button>
      {editOpen && <EditSpotForm spot={spot} setEditOpen={setEditOpen} />}
    </div>
  );
}

export default SpotPage;
