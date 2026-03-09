import { notFound } from "next/navigation";
import ProjectDetail from "../ProjectDetail";
import { PROJECTS } from "../projectConstants";
import "../ProjectDetailStyles.css"; // ← add this, remove projects.css

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();
  return <ProjectDetail project={project} />;
}
