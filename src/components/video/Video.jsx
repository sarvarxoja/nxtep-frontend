import "./video.css";

export const VideoComponent = ({ media }) => {
  return (
    <div className="video-container">
      <video controls>
        <source
          src={`http://localhost:2310/${media}`}
          type="video/mp4"
          className="post-video"
        />
      </video>
    </div>
  );
};
