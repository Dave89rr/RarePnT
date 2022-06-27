import { csrfFetch } from './csrf';

// Create
const ADD_SPOT = 'spot/ADD_SPOT';
// Read
const GET_SPOT = 'spot/GET_SPOT';
// Update
const EDIT_SPOT = 'spot/EDIT_SPOT';
// Delete
const REMOVE_SPOT = 'spot/REMOVE_SPOT';

// Actions
const addSpotAction = (spot) => {
  return {
    type: ADD_SPOT,
    spot,
  };
};

const getSpotAction = (spot) => {
  return {
    type: GET_SPOT,
    spot,
  };
};

const editSpotAction = (spot) => {
  return {
    type: EDIT_SPOT,
    spot,
  };
};

const removeSpotAction = (spotId) => {
  return {
    type: REMOVE_SPOT,
    spotId,
  };
};

export const addSpot = (spot) => async (dispatch) => {
  const response = await csrfFetch('/api/spots', {
    method: 'POST',
    body: JSON.stringify(spot),
  });

  const data = await response.json();

  dispatch(addSpotAction(data.spot));
  return null;
};

export const getSpotThunk = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots');

  const data = await response.json();
  dispatch(getSpotAction(data));
  return null;
};

export const removeSpotThunk = (spotId) => async (dispatch) => {
  await csrfFetch(`/api/spots/${spotId}`, {
    method: 'DELETE',
  });

  dispatch(removeSpotAction(spotId));
};
export const editSpot = (spot) => async (dispatch) => {
  const response = await csrfFetch('/api/spots', {
    method: 'PUT',
    body: JSON.stringify(spot),
  });

  const data = await response.json();

  dispatch(editSpotAction(data.spot));
};

const spotReducer = (state = {}, action) => {
  let newState = Object.assign({}, state);
  let id;
  switch (action.type) {
    case ADD_SPOT:
      id = action.spot.id;
      newState[id] = {
        spotData: action.spot,
        reviews: {},
        images: {},
      };
      return newState;
    case GET_SPOT:
      action.spot.forEach((spot) => {
        newState[spot.id] = { spotData: spot };
      });
      return newState;
    case EDIT_SPOT:
      return newState;

    case REMOVE_SPOT:
      console.log('**************************BEFORE');
      console.log(newState);
      console.log('***********************************after');
      delete newState[action.spotId];
      console.log(newState);
      console.log('*******************\n\n\n\n\n');
      return newState;

    default:
      return state;
  }
};

export default spotReducer;
