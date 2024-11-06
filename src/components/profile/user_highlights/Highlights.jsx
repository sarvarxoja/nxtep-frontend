import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostData } from "../../posts/post_data/PostData";

export const Highlights = ({ setActiveTab }) => {
  setActiveTab("highlights");
  const { username } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchHighlights();
  }, [username]);

  const fetchHighlights = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `users/get/user/${username}/content/highlights?limit=12&page=1`
      );
      setData(response.data.pinnedPostsData);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
    setLoading(false);
  };

  console.log(data);

  return (
    <div>
      {data.length ? (
        data.map((e) => (
          <div key={e._id} className="border_bottom">
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
            />
          </div>
        ))
      ) : (
        <p>No replies found.</p>
      )}
    </div>
  );
};
