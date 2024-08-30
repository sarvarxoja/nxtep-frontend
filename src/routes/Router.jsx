import MainLayout from "../layout/MainLayout";
import AuthLayout from "../layout/AuthLayout";
import CreateProjectLayout from "../layout/CreateProject";

import { Route, Routes } from "react-router-dom";

import { Login } from "../components/auth/login/Login";
import { Register } from "../components/auth/register/Register";

import { PostsComponent } from "../components/posts/Posts";
import { StatusComponent } from "../components/status/Status";
import { ExploreComponent } from "../components/explore/Explore";
import { ProjectsComponent } from "../components/projects/Projects";
import { SettingsComponent } from "../components/settings/Settings";
import { UserProfile } from "../components/profile/user_profile/UserProfile";
import { FollowersComponent } from "../components/follow/followers/Followers";
import { FollowingComponent } from "../components/follow/following/Following";
import { NotificationComponent } from "../components/notification/Notification";
import { ProjectsPage } from "../components/create_project/CreateProject";

export const Router = () => {
  return (
    <Routes>
      <Route element={<CreateProjectLayout />}>
        <Route path="/projects" element={<ProjectsPage />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route path="/home" element={<PostsComponent />} />
        <Route path="/projects" element={<ProjectsComponent />} />
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
