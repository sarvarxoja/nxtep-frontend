import "./interests.css";
import { Link } from "react-router-dom";
import { formatCount } from "../../utils/utils";
import ChatIcon from "@mui/icons-material/Chat";
import RepeatIcon from "@mui/icons-material/Repeat";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EqualizerIcon from "@mui/icons-material/Equalizer";

import fetchRepost from "./repost_action/RepostAction";
import { likePost } from "../posts/post_actions/PostLikeAction";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { InterestsNotification } from "./notification/InterestsNotification";
import ThumbUpOffAltRoundedIcon from "@mui/icons-material/ThumbUpOffAltRounded";

export const StatusInterests = ({
  like_count,
  fke_view_count,
  comments_count,
  replies_count,
  like,
  is_reply,
  id,
  handleLike,
  handleRepost,
}) => {
  const dispatch = useDispatch();
  const componentRef = useRef(null);
  const notificationRef = useRef(null);
  const [content, setContent] = useState("s");
  const [shareActive, setShareActive] = useState(false);

  // Repost state from Redux
  const { repost, loading, error } = useSelector((state) => state.repostData);

  // const handleRepost = (id) => {
  //   dispatch(fetchRepost(id, content));
  // };

  // const handleLike = (post_id) => {
  //   dispatch(likePost(post_id));
  // };

  const handleShareClick = () => {
    setShareActive(!shareActive);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target) &&
        componentRef.current &&
        !componentRef.current.contains(event.target)
      ) {
        setShareActive(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="popular_inf" ref={componentRef}>
      <li className="popular_intrsts popular_like" onClick={() => handleLike()}>
        <ThumbUpOffAltRoundedIcon
          className={`icon-like icon-intrsts ${like ? "liked" : "black"}`}
        />
        <span
          className={`intrst_count like_count icon-like icon-intrsts ${
            like ? "liked" : "black"
          }`}
        >
          {formatCount(like_count)}
        </span>
      </li>
      <li className="popular_intrsts">
        <EqualizerIcon className="icon-like icon-intrsts" />
        <span className="intrst_count">{formatCount(fke_view_count)}</span>
      </li>
      <Link to={`/status/${id}`} className="popular_intrsts ">
        <ChatIcon className=" icon-like icon-intrsts" />
        <span className="intrst_count">{formatCount(comments_count)}</span>
      </Link>
      <li className="popular_intrsts" onClick={() => handleRepost()}>
        <RepeatIcon
          className={`icon-like icon-intrsts ${is_reply ? "replied" : "black"}`}
        />
        <span className={`intrst_count ${is_reply ? "replied" : "black"}`}>
          {formatCount(replies_count || 0)}
        </span>
      </li>
      <li className="popular_intrsts" onClick={handleShareClick}>
        <SendOutlinedIcon className="icon-like icon-intrsts" />
      </li>
      {shareActive && (
        <div ref={notificationRef}>
          <InterestsNotification id={id} setShareActive={setShareActive} />
        </div>
      )}
    </div>
  );
};
