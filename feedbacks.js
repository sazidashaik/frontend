import {
    ADD_FEEDBACK,
  RETRIEVE_FEEDBACKS,
  UPDATE_FEEDBACK,
  //DELETE_FEEDBACK,
  } from "../actions/types";
  const initialState = [];
  function feedbackReducer(feedbacks = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case ADD_FEEDBACK:
        return [...feedbacks, payload];
      case RETRIEVE_FEEDBACKS:
        return payload;
      case UPDATE_FEEDBACK:
        return feedbacks.map((feedback) => {
          if (feedback.feedBackId === payload.feedBackId) {
            return {
              ...feedback,
              ...payload,
            };
          } else {
            return feedback;
          }
        });
      /*case DELETE_FEEDBACK:
        return feedbacks.filter(({ id }) => id !== payload.id);
     */ 
      default:
        return feedbacks;
    }
  };
  export default feedbackReducer;