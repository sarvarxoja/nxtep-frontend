import ShareIcon from "@mui/icons-material/Share";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { Link } from "react-router-dom";

export const InterestsComponent = ({like_count, fke_view_count,comments_count, id}) => {
  return (
    <div className="popular_inf">
      <li className="popular_intrsts popular_like">
        <FavoriteBorderIcon className="far fa-heart icon-like like" />
        <span className="intrst_count like_count">{like_count}</span>
      </li>
      <li className="popular_intrsts">
        <EqualizerIcon className="fas fa-eye icon-like icon-intrsts" />
        <span className="intrst_count">{fke_view_count}</span>
      </li>
      <Link to={`/status/${id}`} className="popular_intrsts">
        <ChatBubbleOutlineIcon className="far fa-comment icon-like icon-intrsts" />
        <span className="intrst_count">{comments_count}</span>
      </Link>
      <li className="popular_intrsts">
        <i className="far fa-retweet icon-like icon-intrsts repost_icon"></i>
      </li>
      <li className="popular_intrsts" onClick={() => handleCopy(id)}>
        <ShareIcon className="fas fa-eye icon-like icon-intrsts" />
      </li>
    </div>
  );
};
