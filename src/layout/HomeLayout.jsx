import { WhoFollowBanner } from "../components/banners/follow/WhoFollow";
import { TrendsBanner } from "../components/banners/trends/TrendsBanner";
import { NavigationComponent } from "../components/navigation/Navigation";
import { PostsComponent } from "../components/posts/Posts";

export const HomePageLayout = () => {
  return (
    <div className="repository_data container">
      <NavigationComponent />
      <PostsComponent />
      <div className="position_controller">
        <WhoFollowBanner />
        <TrendsBanner />
      </div>
    </div>
  );
};
