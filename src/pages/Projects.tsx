import { projects } from "@/data/projects";
import DraggableCatalogue from "@/components/DraggableCatalogue";
import ProjectsGraph from "@/components/ProjectsGraph";


export default function Projects() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-black font-poppins">PROJECTS</h1>

      <ProjectsGraph
        items={projects}
        initialMode="groups"
        className="glass-card border border-border rounded-lg bg-card shadow-soft p-4 responsive-graph"
      />

      <DraggableCatalogue />
    </section>
  );
}
