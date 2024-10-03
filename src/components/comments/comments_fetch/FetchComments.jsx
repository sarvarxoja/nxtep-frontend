import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTimeAgo } from "../../../utils/utils";
import { CommentInput } from "../comment_input/CommentInput";
import { CommentInterests } from "../../interests/CommentInterests";

export const Comments = ({ post_id, setCommentsCount, user_id }) => {
  const [commentsData, setCommentsData] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(false);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    setCommentsLoading(true);
    try {
      const response = await axios.get(
        `/post/comment/${post_id}?limit=5&page=1`
      );
      setCommentsData(response.data.comment);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
    setCommentsLoading(false);
  };

  const addNewComment = (newComment) => {
    setCommentsData([newComment, ...commentsData]);
    setCommentsCount();
  };

  return (
    <div>
      <CommentInput
        post_id={post_id}
        addNewComment={addNewComment}
        user_id={user_id}
      />
      {commentsData.map((e) => {
        return (
          <div className="comment_controller" key={e._id}>
            <Link to={`/${e?.user_id?.username}`}>
              {e?.user_id?.avatar ? (
                <img
                  src={`http://localhost:1311/${e?.user_id?.avatar}`}
                  alt=""
                  width={50}
                  height={50}
                  className="user_avatar comment_avatar"
                />
              ) : (
                <div
                  className="user-avatar comment_avatar_a"
                  style={{
                    background: `${e?.user_id?.background_color}`,
                  }}
                >
                  {e?.user_id?.name.substr(0, 1)}
                </div>
              )}
            </Link>
            <div className="f_with">
              <Link to={`/${e?.user_id?.username}`} className="flex">
                <h3 className="font-name">{e?.user_id?.name}</h3>
                <div className="check_m_ctr">
                  <span className="font-username db pl-2">
                    {e?.user_id?.username}
                  </span>
                  {e.user_id?.check_mark ? (
                    <img
                      src={`http://localhost:1311/${e?.user_id?.check_mark}`}
                      alt=""
                      className="main_check_m mt-4"
                    />
                  ) : (
                    ""
                  )}
                  <span className="posts_date">{getTimeAgo(e.created)}</span>
                </div>
              </Link>
              <p className="comment_content">{e.comment}</p>
              <CommentInterests like_count={1} answer_count={0} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
