import "./status.css";
import axios from "axios";
import { MainTitle } from "../title/MainTitle";
import { VideoComponent } from "../video/Video";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { formatDate, getTimeAgo } from "../../utils/utils";
import { InterestsComponent } from "../interests/Interests";
import { Comments } from "../comments/comments_fetch/FetchComments";
import { CommentInput } from "../comments/comment_input/CommentInput";

export const StatusComponent = () => {
  let { post_id } = useParams();
  let [postData, setPostData] = useState({});
  let [loading, setLoading] = useState(false);
  const [extension, setExtension] = useState(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`post/${post_id}`);
      setPostData(data?.data || {});
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPostData({});
    }
    setLoading(false);
  }, [post_id]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    if (postData.media) {
      const fileExtension = postData.media.split(".").pop().toLowerCase();
      setExtension(fileExtension);
    }
  }, [postData.media]);

  console.log(postData);

  return (
    <div className="body_controller">
      <div className="main_title">
        <MainTitle title={"Post"} />
      </div>
      <div className="data-box block">
        <Link to={`/${postData.username}`}>
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
          <InterestsComponent
            like_count={postData.like_count}
            fke_view_count={postData.fke_view_count}
            comments_count={postData.comments_count}
            id={postData._id}
          />
        </div>
      </div>
      <CommentInput post_id={post_id} />
      <Comments post_id={post_id} />
    </div>
  );
};
