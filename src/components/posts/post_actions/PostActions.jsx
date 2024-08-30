import axios from "axios";
export const fetchPostsRequest = () => ({
  type: "FETCH_POSTS_REQUEST",
});

export const fetchPostsSuccess = (posts) => ({
  type: "FETCH_POSTS_SUCCESS",
  payload: posts,
});

export const fetchPostsFailure = (error) => ({
  type: "FETCH_POSTS_FAILURE",
  payload: error,
});

export const fetchPosts = () => {
  return async (dispatch) => {
    dispatch(fetchPostsRequest);
    try {
      const response = await axios.get("/post/top/rtc?limit=5&&page=1");
      dispatch(fetchPostsSuccess(response.data));
    } catch (error) {
      dispatch(fetchPostsFailure(error.message));
    }
  };
};
