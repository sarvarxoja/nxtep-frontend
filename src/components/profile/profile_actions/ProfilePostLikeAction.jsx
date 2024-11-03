import axios from "axios";

export const likeProfilePost = (postId) => async (dispatch) => {
  try {
    console.log(postId);
    
    const response = await axios.post(`/post/like/${postId}`);

    await axios.post(
      `/notification/add`,
      {
        to_user: response.data.user_id,
        content: "sizga like bosdi",
        link: `http://localhost:5173/status/${postId}`,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "LIKE_PROFILE_POST",  
      payload: response.data,
    });
  } catch (error) {
    console.error("Error liking the post", error);
  }
};