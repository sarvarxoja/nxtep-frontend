import axios from "axios";

export const fetchPostsRequest = () => ({
  type: "FETCH_PROFILE_POSTS_REQUEST",
});

export const fetchPostsSuccess = (posts) => ({
  type: "FETCH_PROFILE_POSTS_SUCCESS",
  payload: posts,
});

export const fetchPostsFailure = (error) => ({
  type: "FETCH_PROFILE_POSTS_FAILURE",
  payload: error,
});

export const fetchPosts = (username, content) => {
  return async (dispatch) => {
    dispatch(fetchPostsRequest());
    try {
      const response = await axios.get(
        `users/get/user/${username}/content/${content}?limit=12&page=1`
      );      
      dispatch(fetchPostsSuccess(response.data));
    } catch (error) {
      dispatch(fetchPostsFailure(error.message));
    }
  };
};