import { csrfFetch } from './csrf';

export const ADD_REVIEW = 'reviews/ADD_REVIEW';

const addReviewAction = (review) => {
  return {
    type: ADD_REVIEW,
    review,
  };
};

export const addReviewThunk = (review) => async (dispatch) => {
  const response = await csrfFetch('/api/reviews', {
    method: 'POST',
    body: JSON.stringify(review),
  });

  const data = await response.json();

  dispatch(addReviewAction(data.review));
  return null;
};

const reviewReducer = (state = {}, action) => {
  let newState = {};
  let id;
  switch (action.type) {
    case ADD_REVIEW:
      newState = Object.assign({}, state);
      id = action.review.id;
      newState[id] = action.review;
      return newState;
    default:
      return state;
  }
};

export default reviewReducer;
