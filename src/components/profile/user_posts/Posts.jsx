import axios from "axios";
import _ from "lodash";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PostData } from "../../posts/post_data/PostData";

export const UserPosts = ({ reloadFetch, setReloadFetch, myProfile }) => {
  let { username } = useParams();
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [active, setActive] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [bold, setBold] = useState(null);

  // tekshirish kk
  useEffect(() => {
    // setData([]);
    // setPage(1);
    // setHasMore(true);
    // forYourData(1);
    // setReloadFetch(false);
  }, [username]);

  useEffect(() => {
    fetchPostsContent();
  }, [username]);

  const fetchPostsContent = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `users/get/user/${username}/content/posts?limit=12&page=1`
      );
      setData(response.data.postsData);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
    setLoading(false);
  };


  return (
    <div className="data_a2">
      {data.map((e) => {
        return (
          <div key={e._id}>
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
            />
          </div>
        );
      })}
    </div>
  );
};
