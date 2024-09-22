import axios from "axios";

export const fetchTrendsRequest = () => ({
  type: "FETCH_TRENDS_REQUEST",
});

export const fetchTrendsSuccess = (trends) => ({
  type: "FETCH_TRENDS_SUCCESS",
  payload: trends,
});

export const fetchTrendsFatilure = (error) => ({
  type: "FETCH_TRENDS_FAILURE",
  payload: error,
});

export const fetchTrends = (limit) => {
  return async (dispatch) => {
    dispatch(fetchTrendsRequest());
    try {
      const {data} = await axios.get(`/post/trends/all?limit=${limit}&page=1`);
      dispatch(fetchTrendsSuccess(data.tags));
    } catch (error) {
      dispatch(fetchTrendsFatilure(error.message));
    }
  };
};
