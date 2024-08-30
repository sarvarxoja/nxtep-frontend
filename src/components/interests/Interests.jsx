import "./interests.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaRepeat } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";
import ShareIcon from "@mui/icons-material/Share";
// import { RiShareForwardFill } from "react-icons/ri";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import { likePost } from "../posts/post_actions/PostLikeAction";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

export const InterestsComponent = ({
  like_count,
  fke_view_count,
  comments_count,
  id,
  like,
}) => {
  const dispatch = useDispatch();

  const handleLike = (post_id) => {
    dispatch(likePost(post_id));
  };

  return (
    <div className="popular_inf">
      <li
        className="popular_intrsts popular_like"
        onClick={() => {
          handleLike(id);
        }}
      >
        <FavoriteBorderIcon
        className="fas fa-eye icon-like icon-intrsts" 
          // className="far fa-heart icon-like like"
          // className={` ${like ? 'liked' : 'black'}`}
          // style={{ color: like ? "red" : "black" }}
        />
        <span className="intrst_count like_count">{like_count}</span>
      </li>
      <li className="popular_intrsts">
        <EqualizerIcon className="fas fa-eye icon-like icon-intrsts" />
        <span className="intrst_count">{fke_view_count}</span>
      </li>
      <Link to={`/status/${id}`} className="popular_intrsts ">
        <FaRegComment className="far fa-comment icon-like icon-intrsts" />
        <span className="intrst_count">{comments_count}</span>
      </Link>
      <li className="popular_intrsts">
      <FaRepeat className="far fa-comment icon-like icon-intrsts"/>
        {/* <i className="far fa-retweet icon-like icon-intrsts repost_icon"></i> */}
      </li>
      <li className="popular_intrsts" onClick={() => handleCopy(id)}>
        <ShareIcon className="fas fa-eye icon-like icon-intrsts" />
      </li>
    </div>
  );
};
