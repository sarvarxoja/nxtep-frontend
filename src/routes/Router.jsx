import MainLayout from "../layout/MainLayout";
import AuthLayout from "../layout/AuthLayout";
import BannerLayout from "../layout/BannerLayout";
import ProjectsLayout from "../layout/CreateProject";

import { Route, Routes } from "react-router-dom";

import { Login } from "../components/auth/login/Login";
import { Register } from "../components/auth/register/Register";

import { Trends } from "../components/trends/Trends";
import { People } from "../components/people/People";
import { PostsComponent } from "../components/posts/Posts";
import { StatusComponent } from "../components/status/Status";
import { ExploreComponent } from "../components/explore/Explore";
import { SettingsComponent } from "../components/settings/Settings";
import { ProjectsPage } from "../components/projects/page/Projects";
import { UserProfile } from "../components/profile/user_profile/UserProfile";
import { FollowersComponent } from "../components/follow/followers/Followers";
import { FollowingComponent } from "../components/follow/following/Following";
import { NotificationComponent } from "../components/notification/Notification";

export const Router = () => {
  return (
    <Routes>
      <Route element={<ProjectsLayout />}>
        <Route path="/projects" element={<ProjectsPage />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route element={<BannerLayout />}>
        <Route path="/trends" element={<Trends />} />
        <Route path="/people" element={<People />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route path="/home" element={<PostsComponent />} />
        <Route path="/explore" element={<ExploreComponent />} />
        <Route path="/notification" element={<NotificationComponent />} />
        <Route path="/status/:post_id" element={<StatusComponent />} />
        <Route path="/settings" element={<SettingsComponent />} />
        <Route path="/:username/*" element={<UserProfile />} />
        <Route path="/:username/following" element={<FollowingComponent />} />
        <Route path="/:username/followers" element={<FollowersComponent />} />
      </Route>
    </Routes>
  );
};
