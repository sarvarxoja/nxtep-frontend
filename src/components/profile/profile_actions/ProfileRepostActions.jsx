import axios from "axios";

const fetchProfileRepost = (id, content) => async (dispatch) => {
  try {    
    const { data } = await axios.post(
      `/post/reply/${id}`,
      { content },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    await axios.post(
      `/notification/add`,
      {
        to_user: data.user_id,
        content: "sizning postingizga javob berdi",
        link: `http://localhost:5173/status/${data._id}`,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "REPLY_PROFILE_POST",
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export default fetchProfileRepost;
