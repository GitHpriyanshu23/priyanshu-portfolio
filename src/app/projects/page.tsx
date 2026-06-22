import { Container } from "@/components/container";
import { ProjectsGrid } from "@/components/projects-grid";
import { projects } from "@/config/projects";

export const metadata = {
  title: "Projects — Priyanshu Urmaliya",
};

export default function ProjectsPage() {
  return (
    <div className="space-y-10 pb-16 pt-8">
      <Container>
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <p className="mt-3 text-secondary">
          AI systems, RAG pipelines, and full-stack products I&apos;ve built along the way.
        </p>
      </Container>
      <ProjectsGrid items={projects} showHeading={false} />
    </div>
  );
}
