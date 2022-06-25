import { csrfFetch } from './csrf';

const ADD_SPOT = 'spot/ADD_SPOT';

const addSpotAction = (spot) => {
  return {
    type: ADD_SPOT,
    spot,
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

const spotReducer = (state = {}, action) => {
  let newState = {};
  switch (action.type) {
    case ADD_SPOT:
      newState = Object.assign({}, state);
      newState[action.spot.id] = action.spot;
      return newState;
    default:
      return state;
  }
};

export default spotReducer;
