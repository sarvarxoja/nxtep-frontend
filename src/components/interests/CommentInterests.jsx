import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

export const CommentInterests = ({ like_count, answer_count }) => {
  return (
    <div className="popular_inf" style={{ gap: "20px" }}>
      <li className="popular_intrsts popular_like">
        <ThumbUpOffAltIcon className="far fa-heart icon-like like" />
        <span className="intrst_count like_count">{like_count}</span>
      </li>
      <li className="popular_intrsts">
        <QuestionAnswerIcon className="far fa-heart icon-like like" />
        <span className="intrst_count like_count">{answer_count}</span>
      </li>
    </div>
  );
};
