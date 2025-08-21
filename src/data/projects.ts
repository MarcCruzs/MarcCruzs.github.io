export type ProjectNode = { id: string; title: string; tags?: string[]; url?: string }
export type ProjectLink = { source: string; target: string }
export type ProjectGraph = { nodes: ProjectNode[]; links: ProjectLink[] }

export type Project = {
  id: string;
  title: string;
  tags: string[];
  group?: string;
  url?: string;
  summary: string;
  description: string;
};

export const projects: Project[] = [
  { id: "contrails", title: "Contrail Analysis Pipeline", tags: ["python","data","viz"], group: "Data/ML", url: "#" , summary: "lorem", description: "lorem"},
  { id: "gather",    title: "Gather Point (MVP)",          tags: ["rust","react","postgres"], group: "Web", url: "#" , summary: "lorem", description: "lorem"},
  { id: "ml-utils",  title: "ML Utils",                    tags: ["python","ml"], group: "Data/ML", url: "#" , summary: "lorem", description: "lorem"},
  { id: "portfolio", title: "Portfolio Site",              tags: ["react","tailwind"], group: "Web", url: "#" , summary: "lorem", description: "lorem"},
  { id: "etl",       title: "Flight ETL",                  tags: ["python","data"], group: "Data/ML", url: "#" , summary: "lorem", description: "lorem"},
];