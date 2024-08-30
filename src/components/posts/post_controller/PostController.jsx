import axios from "axios";
import "./post.controller.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTimeAgo } from "../../../utils/utils";
import { VideoComponent } from "../../video/Video";
import { InterestsComponent } from "../../interests/Interests";
import { PostData } from "../post_data/PostData";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../post_actions/PostActions";

export const YourPosts = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.postsData);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div>
      {posts.map((e) => {
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
              like={e.like}
            />
          </div>
        );
      })}
    </div>
  );
};
