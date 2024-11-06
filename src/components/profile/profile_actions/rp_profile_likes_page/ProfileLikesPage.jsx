import axios from "axios";

export const likeProfilePostRp = (postId) => async (dispatch) => {
  try {
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
      type: "LIKE_PROFILE_RP",
      payload: response.data,
    });
  } catch (error) {
    console.error("Error liking the post", error);
  }
};
