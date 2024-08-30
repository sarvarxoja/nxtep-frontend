import "../replies.css"

export const ReplyMediaController = ({media}) => {
  return (
    <div className="video_reply">
      <video controls>
        <source
          src={`http://localhost:1311/${media}`}
          type="video/mp4"
          className="reply-post-video"
        />
      </video>
    </div>
  );
};
