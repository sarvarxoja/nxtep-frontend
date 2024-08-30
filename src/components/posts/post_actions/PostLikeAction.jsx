import axios from "axios";

export const likePost = (postId) => async (dispatch) => {
  try {
    const response = await axios.post(`/post/like/${postId}`);
        
    dispatch({
      type: "LIKE_POST",
      payload: response.data,
    });
  } catch (error) {
    console.error("Error liking the post", error);
  }
};
