import "./posts.css";
import { YourPosts } from "./post_controller/PostController";
import { PostArea } from "./post_area/PostArea";

export const PostsComponent = () => {
  return (
    <div className="body_controller">
      <div className="controller_btn">
        <button
          className="post_controller_btn"
          style={{ borderRight: "1px solid rgba(239, 243, 244, 1)" }}
        >
          For you
        </button>
        <button className="post_controller_btn">Following</button>
      </div>
      <PostArea />
      <YourPosts />
    </div>
  );
};
