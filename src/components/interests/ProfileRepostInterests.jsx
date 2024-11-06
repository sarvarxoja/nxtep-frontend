import "./interests.css";
import { Link } from "react-router-dom";
import ChatIcon from "@mui/icons-material/Chat";
import { formatCount } from "../../utils/utils";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EqualizerIcon from "@mui/icons-material/Equalizer";

import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { InterestsNotification } from "./notification/InterestsNotification";
import ThumbUpOffAltRoundedIcon from "@mui/icons-material/ThumbUpOffAltRounded";
import { likeProfilePostRp } from "../profile/profile_actions/rp_profile_likes_page/ProfileLikesPage";

export const ProfileRepostInterestsComponent = ({
  like_count,
  fke_view_count,
  comments_count,
  replies_count,
  like,
  is_reply,
  id,
}) => {
  const dispatch = useDispatch();
  const componentRef = useRef(null);
  const notificationRef = useRef(null);
  const [shareActive, setShareActive] = useState(false);

  const handleLike = (post_id) => {
    dispatch(likeProfilePostRp(post_id));
  };

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
      <li
        className="popular_intrsts popular_like"
        onClick={() => handleLike(id)}
      >
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
      <li className="popular_intrsts" onClick={handleShareClick}>
        <SendOutlinedIcon className="icon-like icon-intrsts rp_send_icon" />
      </li>
      {shareActive && (
        <div ref={notificationRef} >
          <InterestsNotification id={id} setShareActive={setShareActive} />
        </div>
      )}
    </div>
  );
};
