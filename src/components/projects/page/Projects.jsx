import "../project.css";
import { ProjectsType } from "../projects_type/ProjectsType";
import { ProjectsNavigation } from "../../navigation/projects/ProjectsNavigation";
import { AllProjects } from "../all_projects/AllProjects";

export const ProjectsPage = () => {
  return (
    <div className="projects_controller">
      <ProjectsNavigation />
      <ProjectsType />
      <AllProjects />
    </div>
  );
};
