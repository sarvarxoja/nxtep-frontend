import "./replies.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { PostData } from "../../posts/post_data/PostData";
import { Link } from "react-router-dom";
import { RepliesComponent } from "./replies_component/RepliesComponent";
import { InterestsComponent } from "../../interests/Interests";
import { Loader } from "../../loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import fetchRepost from "../../interests/repost_action/RepostAction";
import { fetchUserReplies } from "../profile_actions/ProfileRepliesActions";
import { ProfileRepostInterestsComponent } from "../../interests/ProfileRepostInterests";

export const UserReplies = ({ user_id, setActiveTab}) => {
  setActiveTab("replies")
  const dispatch = useDispatch();
  const { reposts, loading, error } = useSelector(
    (state) => state.profileRepostsReducer
  );

  useEffect(() => {
    if (user_id) {
      dispatch(fetchUserReplies(user_id));
    }
  }, [user_id]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : reposts.repliesData?.length > 0 ? (
        reposts.repliesData?.map((e) => (
          <div key={e._id} className="border_bottom">
            <div className="replies_my_data">
              <Link to={`/${e.user_id.username}`}>
                {e.user_id.avatar ? (
                  <img
                    src={`http://localhost:2310/${e.user_id.avatar}`}
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
                          src={`http://localhost:2310/${e.user_id.check_mark}`}
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
            <div className="replies_data">
              <RepliesComponent
                id={e.post_id?._id}
                media={e.post_id?.media}
                username={e.post_id?.user_id.username}
                avatar={e.post_id?.user_id.avatar}
                background_color={e.post_id?.user_id.background_color || "#333"}
                name={e.post_id?.user_id.name || "Deleted"}
                check_mark={e.post_id?.user_id.check_mark}
                created={e.created}
                content={e.post_id?.content || "Deleted content"}
                like_count={e.like_count}
              />
            </div>
            <div className="interests_style_controller">
              <ProfileRepostInterestsComponent
                like={e.is_like}
                like_count={e.like_count}
                fke_view_count={e.fke_view_count}
                comments_count={e.comments_count}
                id={e._id}
              />
            </div>
          </div>
        ))
      ) : (
        <p className="notfound_title_av">No replies found</p>
      )}
    </div>
  );
};
