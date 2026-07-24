import HomePage from "./pages/HomePage.jsx";
import ProjectPage from "./pages/ProjectPage.jsx";
import { findProjectBySlug } from "./data/projects.js";

function App() {
  const projectMatch = window.location.pathname.match(/^\/projects\/([^/]+)\/?$/);
  const project = projectMatch ? findProjectBySlug(projectMatch[1]) : null;

  if (project) return <ProjectPage project={project} />;
  return <HomePage />;
}

export default App;
