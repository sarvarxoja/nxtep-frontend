import axios from "axios";

export const fetchRepostsRequest = () => ({
  type: "FETCH_PROFILE_REPOSTS_REQUEST",
});

export const fetchRepostsSuccess = (replies) => ({
  type: "FETCH_PROFILE_REPOSTS_SUCCESS",
  payload: replies,
});

export const fetchRepostsFailure = (error) => ({
  type: "FETCH_PROFILE_REPOSTS_FAILURE",
  payload: error,
});

export const fetchUserReplies = (user_id) => {
  return async (dispatch) => {
    dispatch(fetchRepostsRequest());
    try {
      const response = await axios.get(`/post/reply/${user_id}`);
      dispatch(fetchRepostsSuccess(response.data));
    } catch (error) {
      dispatch(fetchRepostsFailure(error.message));
    }
  };
};
