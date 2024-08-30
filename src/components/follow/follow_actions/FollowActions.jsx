import axios from "axios";

export const fetchFollowRequest = () => ({
  type: "FETCH_FOLLOW_REQUEST",
});

export const fetchFollowSuccess = (user, follow) => ({
  type: "FETCH_FOLLOW_SUCCESS",
  user: user,
  payload: follow,
});

export const fetchProfileFailure = (error) => ({
  type: "FETCH_PROFILE_FAILURE",
  user: null,
  payload: error,
});

export const fetchFollow = (username, type) => {
  return async (dispatch) => {
    dispatch(fetchFollowRequest);
    try {
      const response = await axios.get(
        `/users/audt/${username}/${type}?limit=10&&page=1`
      );
      dispatch(fetchFollowSuccess(response.data.user, response.data.follow_data));
    } catch (error) {
      dispatch(fetchProfileFailure(error.message));
    }
  };
};
