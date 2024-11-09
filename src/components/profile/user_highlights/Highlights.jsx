import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../../loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { PostData } from "../../posts/post_data/PostData";
import { fetchPosts } from "../profile_actions/ProfilePostActions";

export const Highlights = ({ setActiveTab }) => {
  useEffect(() => {
    setActiveTab("highlights");
  });
  const dispatch = useDispatch();
  const { username } = useParams();

  useEffect(() => {
    dispatch(fetchPosts(username, "posts"));
  }, [username]);

  const { posts, loading, error } = useSelector(
    (state) => state.profilePostReducer
  );

  const pinnedPosts = posts?.postsData
    ?.filter((post) => post.pinned)
    .map((e,index) => (
      <div key={index}>
        {e.reply ? (
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
        ) : (
          <PostData
            pinned={e.pinned}
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
        )}
      </div>
    ));

  return (
    <div>
      {loading ? (
        <Loader />
      ) : pinnedPosts?.length > 0 ? (
        <div>{pinnedPosts}</div>
      ) : (
        <p className="notfound_title_av">No highlights found</p>
      )}
    </div>
  );
};
