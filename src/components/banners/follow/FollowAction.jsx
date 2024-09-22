import axios from "axios";

export const fetchPeopleRequest = () => ({
  type: "FETCH_PEOPLE_REQUEST",
});

export const fetchPeopleSuccess = (who_to_follow) => ({
  type: "FETCH_PEOPLE_SUCCESS",
  payload: who_to_follow,
});

export const fetchPeopleFatilure = (error) => ({
  type: "FETCH_PEOPLE_FAILURE",
  payload: error,
});

export const fetchFollowPeople = (limit) => {
  return async (dispatch) => {
    dispatch(fetchPeopleRequest());
    try {
      const response = await axios.get(`/users/who/to/follow?limit=${limit}&page=1`);
      dispatch(fetchPeopleSuccess(response.data));
    } catch (error) {
      dispatch(fetchPeopleFatilure(error.message));
    }
  };
};
