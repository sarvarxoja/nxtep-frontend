import { NavigationComponent } from "../components/navigation/Navigation";
import { WhoFollowBanner } from "../components/banners/follow/WhoFollow";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="repository_data container">
      <NavigationComponent />
      <Outlet />
      <WhoFollowBanner />
    </div>
  );
};

export default MainLayout;
