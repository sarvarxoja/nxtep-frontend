import "./replies.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { PostData } from "../../posts/post_data/PostData";
import { Link } from "react-router-dom";
import { RepliesComponent } from "./replies_component/RepliesComponent";
import { InterestsComponent } from "../../interests/Interests";

export const UserReplies = ({ user_id }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (user_id) {
      fetchReplies();
    }
  }, [user_id]);

  async function fetchReplies() {
    try {
      let { data } = await axios.get(`/post/reply/${user_id}`);
      setData(data.repliesData);
    } catch (error) {
      console.log(error);
    }
  }

  console.log(data);
  

  return (
    <div>
      {data.length ? (
        data.map((e) => (
          <div key={e._id} className="border_bottom">
            <div className="replies_my_data">
              <Link to={`/${e.user_id.username}`}>
                {e.user_id.avatar ? (
                  <img
                    src={`http://localhost:1311/${e.user_id.avatar}`}
                    alt=""
                    className="user_avatar"
                  />
                ) : (
                  <div
                    className="user-avatar"
                    style={{ background: `${e.user_id.background_color}` }}
                  >
                    {e.user_id.name.substr(0, 1)}
                  </div>
                )}
              </Link>
              <div className="total-text">
                <div>
                  <Link to={`/${e.user_id.username}`}>
                    <div className="flex name_ch_control">
                      <h3 className="font-name">{e.user_id.name}</h3>
                      <span
                        className="font-username"
                        style={{ marginLeft: "5px", display: "block" }}
                      >
                        {e.user_id.username}
                      </span>
                      {e.user_id.check_mark ? (
                        <img
                          src={`http://localhost:1311/${e.user_id.check_mark}`}
                          alt=""
                          className="main_check_m"
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <dir className="replies_data">
              <RepliesComponent
                id={e.post_id?._id}
                media={e.post_id?.media}
                username={e.post_id?.user_id.username}
                avatar={e.post_id?.user_id.avatar}
                background_color={e.post_id?.user_id.background_color}
                name={e.post_id?.user_id.name || "S"}
                check_mark={e.post_id?.user_id.check_mark}
                created={e.created}
                content={e.post_id?.content}
                like_count={e.like_count}
              />
            </dir>
            <div className="interests_style_controller">
              <InterestsComponent
                like_count={e.like_count}
                fke_view_count={e.fke_view_count}
                comments_count={e.comments_count}
                id={e._id}
              />
              </div>
          </div>
        ))
      ) : (
        <p>No replies found.</p>
      )}
    </div>
  );
};
