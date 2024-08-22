import _ from "lodash";
import { Link } from "react-router-dom";
import { getTimeAgo } from "../../utils/utils";
import { VideoComponent } from "../video/Video";
import { InterestsComponent } from "../interests/Interests";
import { useState, useEffect } from "react";

export const PostData = ({
  index,
  media,
  username,
  avatar,
  background_color,
  name,
  check_mark,
  created,
  content,
  like_count,
  fke_view_count,
  comments_count,
  id,
}) => {
  const [extension, setExtension] = useState(null);

  useEffect(() => {
    if (media) {
      const fileExtension = media.split(".").pop().toLowerCase();
      setExtension(fileExtension);
    }
  }, [media]);
    
  return (
      <div className="data-box block">
        <Link to={`/${username}`}>
          {avatar ? (
            <img
              src={`http://localhost:1311/${avatar}`}
              alt=""
              className="user_avatar"
            />
          ) : (
            <div
              className="user-avatar"
              style={{ background: `${background_color}` }}
            >
              {name.substr(0, 1)}
            </div>
          )}
        </Link>
        <div className="total-text">
          <div>
            <Link to={`/${username}`}>
              <div className="flex name_ch_control">
                <h3 className="font-name">{name}</h3>
                <span
                  className="font-username"
                  style={{ marginLeft: "5px", display: "block" }}
                >
                  {username}
                </span>
                {check_mark ? (
                  <img
                    src={`http://localhost:1311/${check_mark}`}
                    alt=""
                    className="main_check_m"
                  />
                ) : (
                  ""
                )}
                <span className="posts_date">{getTimeAgo(created)}</span>
              </div>
            </Link>
          </div>
          <p className="post_content">{content}</p>
          {extension === "mp4" ? (
            <VideoComponent media={media} />
          ) : extension === "jpg" ||
            extension === "jpeg" ||
            extension === "png" ? (
            <img
              src={`http://localhost:1311/${media}`}
              alt=""
              className="post-img"
            />
          ) : (
            ""
          )}
          <InterestsComponent
            like_count={like_count}
            fke_view_count={fke_view_count}
            comments_count={comments_count}
            id={id}
          />
          <Link to={`/status/${id}`} className="show_post">
            Show this thread
          </Link>
        </div>
      </div>
  );
};