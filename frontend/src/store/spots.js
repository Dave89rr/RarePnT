import { csrfFetch } from './csrf';
//**************** SPOT ACTION STRING LITERALS **************//
// Create
const ADD_SPOT = 'spot/ADD_SPOT';
// Read all
const GET_ALL_SPOTS = 'spot/GET_ALL_SPOTS';
// Read One
const GET_ONE_SPOT = 'spot/GET_ONE_SPOT';
// Update
const EDIT_SPOT = 'spot/EDIT_SPOT';
// Delete
const REMOVE_SPOT = 'spot/REMOVE_SPOT';

//**************** REVIEW ACTION STRING LITERALS ************//
// Create
const ADD_REVIEW = 'spot/ADD_REVIEW';
// Delete
const REMOVE_REVIEW = 'spot/REMOVE_REVIEW';

//**************** SPOT ACTIONS *****************************//
// Actions
const addSpotAction = (spot) => {
  return {
    type: ADD_SPOT,
    spot,
  };
};

const getSpotAction = (spot) => {
  return {
    type: GET_ALL_SPOTS,
    spot,
  };
};

const getOneSpotAction = (spot) => {
  return {
    type: GET_ONE_SPOT,
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

//**************** REVIEW ACTIONS ***************************//
const addReviewAction = (payload) => {
  return {
    type: ADD_REVIEW,
    payload,
  };
};

const removeReviewAction = (payload) => {
  return {
    type: REMOVE_REVIEW,
    payload,
  };
};

//**************** SPOT THUNKS ******************************//
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

export const getOneSpotThunk = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}`);

  const data = await response.json();
  dispatch(getOneSpotAction(data));
  return null;
};

export const removeSpotThunk = (spotId) => async (dispatch) => {
  await csrfFetch(`/api/spots/${spotId}`, {
    method: 'DELETE',
  });

  dispatch(removeSpotAction(spotId));
};

export const editSpotThunk = (spot) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spot.id}`, {
    method: 'PUT',
    body: JSON.stringify(spot),
  });

  const { message, editSpot } = await response.json();
  if (message === 'Edit Successful') dispatch(editSpotAction(editSpot));
};

//**************** REVIEW THUNKS ****************************//
export const addReviewThunk = (review, spotId) => async (dispatch) => {
  const response = await csrfFetch('/api/reviews', {
    method: 'POST',
    body: JSON.stringify(review),
  });

  const data = await response.json();
  if (data.message === undefined) {
    dispatch(addReviewAction({ review: data.review, spotId }));
  } else {
    return null;
  }
  return null;
};

export const removeReviewThunk = (reviewId, spotId) => async (dispatch) => {
  await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE',
  });

  dispatch(removeReviewAction({ reviewId, spotId }));
};

//**************** SPOT + REVIEWS REDUCER *******************//
const spotReducer = (state = {}, action) => {
  let newState = JSON.parse(JSON.stringify(state));
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
    case GET_ALL_SPOTS:
      action.spot.forEach((spot) => {
        const reviewsArr = spot.Reviews;
        const reviews = {};
        const imgArr = spot.Images;
        const images = {};
        reviewsArr.forEach((review) => (reviews[review.id] = review));
        imgArr.forEach((img) => (images[img.id] = img));
        delete spot.Reviews;
        delete spot.Images;
        newState[spot.id] = {
          spotData: spot,
          reviews,
          images,
        };
      });
      return newState;
    case GET_ONE_SPOT:
      const reviewsArr = action.spot.Reviews;
      const reviews = {};
      const imgArr = action.spot.Images;
      const images = {};
      reviewsArr.forEach((review) => (reviews[review.id] = review));
      imgArr.forEach((img) => (images[img.id] = img));
      delete action.spot.Reviews;
      delete action.spot.Images;
      newState[action.spot.id] = {
        spotData: action.spot,
        reviews,
        images,
      };
      return newState;
    case EDIT_SPOT:
      newState[action.spot.id].spotData = action.spot;
      return newState;
    case REMOVE_SPOT:
      delete newState[action.spotId];
      return newState;
    case ADD_REVIEW:
      newState[action.payload.spotId].reviews[action.payload.review.id] =
        action.payload.review;
      return newState;
    case REMOVE_REVIEW:
      delete newState[action.payload.spotId].reviews[action.payload.reviewId];
      return newState;
    default:
      return state;
  }
};

export default spotReducer;
