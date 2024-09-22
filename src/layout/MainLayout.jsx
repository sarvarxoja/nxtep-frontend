import "./layout.css";
import { Outlet, Routes, Route } from "react-router-dom";
import { NavigationComponent } from "../components/navigation/Navigation";
import { WhoFollowBanner } from "../components/banners/follow/WhoFollow";
import { TrendsBanner } from "../components/banners/trends/TrendsBanner";

const MainLayout = () => {
  return (
    <div className="repository_data container">
      <NavigationComponent />
      <Outlet />
      <div className="position_controller">
          <WhoFollowBanner />
          <TrendsBanner />
      </div>
    </div>
  );
};

export default MainLayout;
