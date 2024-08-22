import MainLayout from "../layout/MainLayout";
import AuthLayout from "../layout/AuthLayout";
import CreateProjectLayout from "../layout/CreateProject";

import { Route, Routes } from "react-router-dom";

import { Login } from "../components/auth/login/Login";
import { Register } from "../components/auth/register/Register";

import { PostsComponent } from "../components/posts/Posts";
import { StatusComponent } from "../components/status/Status";
import { ExploreComponent } from "../components/explore/Explore";
import { SettingsComponent } from "../components/settings/Settings";
import { ProjectsComponent } from "../components/projects/Projects";
import { NotificationComponent } from "../components/notification/Notification";
import { CreateProjectComponent } from "../components/create_project/CreateProject";

export const Router = () => {
  return (
    <Routes>
      <Route element={<CreateProjectLayout />}>
        <Route path="/create/project" element={<CreateProjectComponent />} />
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
        <Route path="/status/:post_id" element={<StatusComponent/>}/>
        <Route path="/settings" element={<SettingsComponent />} />
      </Route>
    </Routes>
  );
};
