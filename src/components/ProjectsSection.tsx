import { projects } from "../data/projects";
import { ProjectCard } from "./ProjectCard";

export function ProjectsSection() {
  const featuredProject = projects.find((project) => project.featured);

  return (
    <section id="projetos" className="paper-texture bg-page px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-9 sm:mb-12">
          <div>
            <p className="text-sm font-black uppercase text-cover">Projetos</p>
            <h2 className="mt-2 font-serif text-4xl leading-tight sm:text-6xl">
              Uma página para cada ideia.
            </h2>
          </div>
        </div>

        {featuredProject ? <ProjectCard project={featuredProject} /> : null}
      </div>
    </section>
  );
}
