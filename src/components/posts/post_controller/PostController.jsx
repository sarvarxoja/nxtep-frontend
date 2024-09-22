import axios from "axios";
import "./post.controller.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { PostData } from "../post_data/PostData";
import { getTimeAgo } from "../../../utils/utils";
import { VideoComponent } from "../../video/Video";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../post_actions/PostActions";
import { InterestsComponent } from "../../interests/Interests";
import { RepliesComponent } from "../../profile/user_replies/replies_component/RepliesComponent";

export const YourPosts = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.postsData);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div>
      {posts.map((e) => {
        if (e.reply === true) {
          return (
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
                  media={e.post_id?.media || null}
                  username={e.post_id?.user_id.username}
                  avatar={e.post_id?.user_id.avatar}
                  background_color={e.post_id?.user_id.background_color}
                  name={e.post_id?.user_id.name || "S"}
                  check_mark={e.post_id?.user_id.check_mark}
                  created={e.created}
                  content={e.post_id?.content || "deleted"}
                  like_count={e.like_count}
                />
              </dir>
              <div className="interests_style_controller">
                {/* <InterestsComponent
                  like_count={e.like_count}
                  fke_view_count={e.fke_view_count}
                  comments_count={e.comments_count}
                  id={e._id}
                /> */}
                <InterestsComponent
                  like_count={e.like_count}
                  fke_view_count={e.fke_view_count}
                  comments_count={e.comments_count}
                  replies_count={e.replies_count}
                  like={e.is_like}
                  id={e._id}
                  is_reply={e.is_reply}
                />
              </div>
            </div>
          );
        } else {
          return (
            <div key={e._id}>
              <PostData
                media={e.media}
                username={e.user_id.username}
                avatar={e.user_id.avatar}
                background_color={e.user_id.background_color}
                name={e.user_id.name}
                check_mark={e.user_id.check_mark}
                created={e.created}
                content={e.content}
                like_count={e.like_count}
                fke_view_count={e.fke_view_count}
                comments_count={e.comments_count}
                id={e._id}
                like={e.is_like}
                replies_count={e.replies_count}
                is_reply={e.is_reply}
              />
            </div>
          );
        }
      })}
    </div>
  );
};
