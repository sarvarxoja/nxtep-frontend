import "./status.css";
import axios from "axios";
import { MainTitle } from "../title/MainTitle";
import { VideoComponent } from "../video/Video";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { formatDate, getTimeAgo } from "../../utils/utils";
import { InterestsComponent } from "../interests/Interests";
import { StatusInterests } from "../interests/StatusInterests";
import { Comments } from "../comments/comments_fetch/FetchComments";
import { CommentInput } from "../comments/comment_input/CommentInput";

export const StatusComponent = () => {
  let { post_id } = useParams();
  let [postData, setPostData] = useState([]);
  let [loading, setLoading] = useState(false);
  const [is_like, setIsLike] = useState(false);
  const [is_reply, setIsReply] = useState();
  const [extension, setExtension] = useState(null);
  let [commentsCount, setCommentsCount] = useState(0);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`post/${post_id}`);
      setIsReply(data.is_reply);
      setIsLike(data.is_like);
      setPostData(data?.data);
      setCommentsCount(data.data.comments_count);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPostData({});
    }
    setLoading(false);
  }, [post_id]);

  const handleNewComment = () => {
    setCommentsCount((prevCount) => prevCount + 1);
  };

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    if (postData.media) {
      const fileExtension = postData.media.split(".").pop().toLowerCase();
      setExtension(fileExtension);
    }
  }, [postData.media]);

  async function handleLike() {
    try {
      let { data } = await axios.post(`/post/like/${postData._id}`);
      if (data.msg === "like_added") {
        setPostData((prevData) => ({
          ...prevData,
          like_count: prevData.like_count + 1,
        }));
        setIsLike(true);
      }
      if (data.msg === "like_removed") {
        setPostData((prevData) => ({
          ...prevData,
          like_count: prevData.like_count - 1,
        }));
        setIsLike(false);
      }

      await axios.post(
        `/notification/add`,
        {
          to_user: data.user_id,
          content: "sizga like bosdi",
          link: `http://localhost:5173/status/${data._id}`,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function handleRepost() {
    try {
      let { data } = await axios.post(`/post/reply/${postData._id}`);
      if (data.msg === "reply_added") {
        setPostData((prevData) => ({
          ...prevData,
          replies_count: prevData.replies_count + 1,
        }));
        setIsReply(true);
      }
      if (data.msg === "reply_removed") {
        setPostData((prevData) => ({
          ...prevData,
          replies_count: prevData.replies_count - 1,
        }));
        setIsReply(false);
      }

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
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="body_controller">
      <div className="main_title">
        <MainTitle title={"Post"} />
      </div>
      <div className="data-box block">
        <Link to={`/${postData.user_id}`}>
          {postData.user_id?.avatar ? (
            <img
              src={`http://localhost:1311/${postData.user_id.avatar}`}
              alt=""
              className="user_avatar"
            />
          ) : (
            <div
              className="user-avatar"
              style={{ background: `${postData.user_id?.background_color}` }}
            >
              {postData.user_id?.name.substr(0, 1)}
            </div>
          )}
        </Link>
        <div className="total-text">
          <div>
            <Link to={`/${postData.user_id?.username}`}>
              <div className="flex name_ch_control">
                <h3 className="font-name">{postData.user_id?.name}</h3>
                <span
                  className="font-username"
                  style={{ marginLeft: "5px", display: "block" }}
                >
                  {postData.user_id?.username}
                </span>
                {postData.user_id?.check_mark ? (
                  <img
                    src={`http://localhost:1311/${postData.user_id?.check_mark}`}
                    alt=""
                    className="main_check_m"
                  />
                ) : (
                  ""
                )}
              </div>
            </Link>
          </div>
          <p className="post_content">{postData.content}</p>
          {extension === "mp4" ? (
            <VideoComponent media={postData.media} />
          ) : extension === "jpg" ||
            extension === "jpeg" ||
            extension === "png" ? (
            <img
              src={`http://localhost:1311/${postData.media}`}
              alt=""
              className="post-img"
            />
          ) : (
            ""
          )}
          <span>{formatDate(postData.created)}</span>
          <StatusInterests
            like={is_like}
            id={postData._id}
            is_reply={is_reply}
            handleLike={handleLike}
            handleRepost={handleRepost}
            like_count={postData.like_count || 0}
            fke_view_count={postData.fke_view_count || 0}
            comments_count={commentsCount}
            replies_count={postData.replies_count}
          />
        </div>
      </div>
      <Comments
        post_id={post_id}
        setCommentsCount={handleNewComment}
        user_id={postData.user_id?._id}
      />
    </div>
  );
};
