import axios from "axios";

export const fetchProfileRequest = () => ({
  type: "FETCH_PROFILE_REQUEST",
});

export const fetchProfileSuccess = (profile) => ({
  type: "FETCH_PROFILE_SUCCESS",
  payload: profile,
});

export const fetchProfileFailure = (error) => ({
  type: "FETCH_PROFILE_FAILURE",
  payload: error,
});

export const fetchProfile = () => {
  return async (dispatch) => {
    dispatch(fetchProfileRequest());
    try {
      const response = await axios.get("/users/profile/me");
      dispatch(fetchProfileSuccess(response.data.myData));
    } catch (error) {
      dispatch(fetchProfileFailure(error.message));
    }
  };
};
