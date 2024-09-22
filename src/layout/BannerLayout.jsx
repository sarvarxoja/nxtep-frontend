import { Outlet, Route, Routes } from "react-router-dom";
import { NavigationComponent } from "../components/navigation/Navigation";
import { WhoFollowBanner } from "../components/banners/follow/WhoFollow";
import { TrendsBanner } from "../components/banners/trends/TrendsBanner";

const BannerLayout = () => {
  return (
    <div className="repository_data container">
      <NavigationComponent />
      <Outlet />
      <Routes>
        <Route path="/trends" element={<WhoFollowBanner />} />
        <Route path="/people" element={<TrendsBanner />} />
      </Routes>
    </div>
  );
};

export default BannerLayout;
