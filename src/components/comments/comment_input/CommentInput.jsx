import "../comment.css"
import axios from "axios";
import { useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";

export const CommentInput = ({post_id}) => {
  const [commentValue, setCommentValue] = useState({
    comment: "",
  });

  function handleInputChange(e) {
    setCommentValue((oldValues) => {
      return { ...oldValues, [e.target.name]: e.target.value };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios({
        method: "post",
        url: `/post/comment/${post_id}`,
        data: {
          comment: commentValue.comment,
        },
        headers: { "Content-Type": "application/json" },
      })
        .then((e) => {
          commentValue.comment = "";
          setReload(true);
        })
        .catch((e) => console.log(e));
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="data-box hover-none comment_area">
      <form onSubmit={handleSubmit}>
        <ReactTextareaAutosize
          className="post_input"
          placeholder="Write a new post"
          name="comment"
          onChange={handleInputChange}
          value={commentValue.comment}
        />
        <div>
          <button className="post_cm_btn" onClick={() => handleSubmit()}>
            Post
          </button>
        </div>
      </form>
    </div>
  );
};
