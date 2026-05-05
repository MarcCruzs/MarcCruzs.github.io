export type GroupId = "studio" | "nasa" | "suas" | "reus" | "cpp";

export interface Group {
  id: GroupId;
  label: string;
  color: string;
  year: string;
  summary: string;
  link?: string;
}

export const GROUPS: Record<GroupId, Group> = {
  studio: {
    id: "studio",
    label: "Personal Projects",
    color: "hsl(14, 70%, 60%)",
    year: "2025 — present",
    summary:
      "Independent freelance practice building production websites, SEO, and AI integrations for small businesses.",
  },
  nasa: {
    id: "nasa",
    label: "NASA Ames",
    color: "hsl(217, 65%, 62%)",
    year: "2024",
    summary:
      "Sole developer on contrail R&D for a NASA contractor, building production data pipelines, ETL, and HPC analysis.",
  },
  suas: {
    id: "suas",
    label: "SUAS UAV Lab",
    color: "hsl(39, 85%, 58%)",
    year: "2023 – 2024",
    summary:
      "Led software for the international UAV competition team, building the on-board object-detection pipeline end to end.",
    link: "https://github.com/MarcCruzs/ODLC_Machine_Inferencing_System",
  },
  reus: {
    id: "reus",
    label: "NSF REUs",
    color: "hsl(282, 50%, 65%)",
    year: "2022",
    summary:
      "NSF-funded research on UAV object detection for autonomous weed removal and DL for mobility-scooter safety.",
    link: "https://github.com/MarcCruzs/NSFreu2022-Mobility-Scooter",
  },
  cpp: {
    id: "cpp",
    label: "Cal Poly Pomona",
    color: "hsl(190, 55%, 55%)",
    year: "2021 – 2024",
    summary:
      "BS Computer Science with GPU computing on HPC clusters and Apache SDAP / Airflow coursework.",
  },
};

export const SKILL_COLOR = "hsl(163, 38%, 60%)";
export const SKILL_STROKE = "hsl(163, 36%, 36%)";
export const ACTIVE_RING = "hsl(163, 50%, 70%)";

export type NodeKind = "experience" | "skill";

export type SkillCategory =
  | "Techniques"
  | "Platforms"
  | "Tools"
  | "Languages & Frameworks";

export const ALL_CATEGORIES: SkillCategory[] = [
  "Techniques",
  "Platforms",
  "Tools",
  "Languages & Frameworks",
];

export interface GraphNode {
  id: string;
  label: string;
  type: NodeKind;
  color: string;
  group?: GroupId;
  category?: SkillCategory;
}

export interface GraphEdge {
  source: string;
  target: string;
}

const EXPERIENCE_NODES: GraphNode[] = (Object.values(GROUPS) as Group[]).map(
  (g) => ({
    id: g.id,
    label: g.label,
    type: "experience" as const,
    color: g.color,
    group: g.id,
  }),
);

const SKILL_LABELS: ReadonlyArray<{ id: string; category: SkillCategory }> = [
  { id: "React", category: "Languages & Frameworks" },
  { id: "TypeScript", category: "Languages & Frameworks" },
  { id: "Tailwind", category: "Languages & Frameworks" },
  { id: "Vite", category: "Tools" },
  { id: "Cloudflare", category: "Platforms" },
  { id: "Python", category: "Languages & Frameworks" },
  { id: "pandas", category: "Languages & Frameworks" },
  { id: "Apache Airflow", category: "Tools" },
  { id: "REST APIs", category: "Techniques" },
  { id: "PyTorch", category: "Languages & Frameworks" },
  { id: "TensorFlow", category: "Languages & Frameworks" },
  { id: "OpenCV", category: "Languages & Frameworks" },
  { id: "Roboflow", category: "Tools" },
  { id: "C++", category: "Languages & Frameworks" },
  { id: "CUDA C", category: "Languages & Frameworks" },
  { id: "Linux / HPC", category: "Platforms" },
  { id: "Git", category: "Tools" },
  { id: "Team Lead", category: "Techniques" },
  { id: "JavaScript", category: "Languages & Frameworks" },
  { id: "SQL", category: "Languages & Frameworks" },
  { id: "Rust", category: "Languages & Frameworks" },
  { id: "HTML/CSS", category: "Languages & Frameworks" },
  { id: "MATLAB", category: "Languages & Frameworks" },
  { id: "Github", category: "Tools" },
  { id: "BitBucket", category: "Tools" },
  { id: "Postman", category: "Tools" },
  { id: "Postgres", category: "Tools" },
  { id: "Jira", category: "Tools" },
  { id: "SCRUM sprints", category: "Techniques" },
  { id: "Agile", category: "Techniques" },
  { id: "OOP", category: "Techniques" },
  { id: "DSA", category: "Techniques" },
  { id: "Functional Programming", category: "Techniques" },
  { id: "Computer Vision", category: "Techniques" },
  { id: "Object Detection", category: "Techniques" },
  { id: "Deep Learning", category: "Techniques" },
  { id: "Machine Learning", category: "Techniques" },
  { id: "ETL", category: "Techniques" },
  { id: "Data Wrangling", category: "Techniques" },
  { id: "Parallel Computing", category: "Techniques" },
  { id: "SEO", category: "Techniques" },
  { id: "Responsive Design", category: "Techniques" },
  { id: "Model Evaluation", category: "Techniques" },
  { id: "Version Control", category: "Techniques" },
  { id: "NVIDIA GPUs", category: "Platforms" },
  { id: "NumPy", category: "Tools" },
  { id: "Matplotlib", category: "Tools" },
  { id: "Jupyter Notebooks", category: "Tools" },
  { id: "scikit-learn", category: "Tools" },
  { id: "VS Code", category: "Tools" },
  { id: "Docker", category: "Tools" },
  { id: "Node.js", category: "Languages & Frameworks" },
  { id: "Bash", category: "Languages & Frameworks" },
];

const SKILL_NODES: GraphNode[] = SKILL_LABELS.map((s) => ({
  id: s.id,
  label: s.id,
  type: "skill" as const,
  color: SKILL_COLOR,
  category: s.category,
}));

export const NODES: GraphNode[] = [...EXPERIENCE_NODES, ...SKILL_NODES];

const RAW_EDGES: ReadonlyArray<readonly [string, GroupId]> = [
  ["React", "studio"],
  ["TypeScript", "studio"],
  ["Tailwind", "studio"],
  ["Vite", "studio"],
  ["Cloudflare", "studio"],
  ["REST APIs", "studio"],
  ["Git", "studio"],
  ["Python", "studio"],
  ["Python", "cpp"],
  ["Python", "nasa"],
  ["Python", "suas"],
  ["Python", "reus"],
  ["pandas", "nasa"],
  ["pandas", "cpp"],
  ["pandas", "suas"],
  ["pandas", "studio"],
  ["pandas", "reus"],
  ["Apache Airflow", "cpp"],
  ["REST APIs", "nasa"],
  ["REST APIs", "cpp"],
  ["REST APIs", "studio"],
  ["Linux / HPC", "nasa"],
  ["Linux / HPC", "suas"],
  ["Linux / HPC", "cpp"],
  ["Git", "nasa"],
  ["Git", "suas"],
  ["Git", "cpp"],
  ["PyTorch", "suas"],
  ["PyTorch", "reus"],
  ["Roboflow", "suas"],
  ["Roboflow", "reus"],
  ["Team Lead", "suas"],
  ["TensorFlow", "reus"],
  ["TensorFlow", "reus"],
  ["TensorFlow", "suas"],
  ["OpenCV", "reus"],
  ["OpenCV", "suas"],
  ["C++", "cpp"],
  ["C++", "suas"],
  ["CUDA C", "cpp"],
  ["JavaScript", "cpp"],
  ["JavaScript", "studio"],
  ["SQL", "studio"],
  ["SQL", "cpp"],
  ["Rust", "cpp"],
  ["HTML/CSS", "cpp"],
  ["HTML/CSS", "studio"],
  ["MATLAB", "nasa"],
  ["MATLAB", "cpp"],
  ["Github", "cpp"],
  ["Github", "studio"],
  ["Github", "suas"],
  ["Github", "reus"],
  ["BitBucket", "nasa"],
  ["Postman", "nasa"],
  ["Postman", "studio"],
  ["Postgres", "studio"],
  ["Jira", "suas"],
  ["Jira", "cpp"],
  ["SCRUM sprints", "suas"],
  ["SCRUM sprints", "cpp"],
  ["Agile", "suas"],
  ["Agile", "cpp"],
  ["Agile", "studio"],
  ["OOP", "cpp"],
  ["OOP", "suas"],
  ["OOP", "nasa"],
  ["OOP", "studio"],
  ["DSA", "cpp"],
  ["Functional Programming", "studio"],
  ["Functional Programming", "nasa"],
  ["Computer Vision", "suas"],
  ["Computer Vision", "reus"],
  ["Object Detection", "suas"],
  ["Object Detection", "reus"],
  ["Deep Learning", "suas"],
  ["Deep Learning", "reus"],
  ["Machine Learning", "suas"],
  ["Machine Learning", "reus"],
  ["ETL", "nasa"],
  ["ETL", "cpp"],
  ["Data Wrangling", "nasa"],
  ["Data Wrangling", "suas"],
  ["Data Wrangling", "reus"],
  ["Data Wrangling", "cpp"],
  ["Parallel Computing", "cpp"],
  ["Parallel Computing", "nasa"],
  ["Parallel Computing", "suas"],
  ["SEO", "studio"],
  ["Responsive Design", "studio"],
  ["Responsive Design", "cpp"],
  ["Model Evaluation", "suas"],
  ["Model Evaluation", "reus"],
  ["Version Control", "studio"],
  ["Version Control", "nasa"],
  ["Version Control", "suas"],
  ["Version Control", "cpp"],
  ["Version Control", "reus"],
  ["NVIDIA GPUs", "cpp"],
  ["NVIDIA GPUs", "suas"],
  ["NVIDIA GPUs", "nasa"],
  ["NumPy", "nasa"],
  ["NumPy", "suas"],
  ["NumPy", "reus"],
  ["NumPy", "cpp"],
  ["Matplotlib", "nasa"],
  ["Matplotlib", "reus"],
  ["Matplotlib", "cpp"],
  ["Matplotlib", "suas"],
  ["Jupyter Notebooks", "nasa"],
  ["Jupyter Notebooks", "suas"],
  ["Jupyter Notebooks", "reus"],
  ["Jupyter Notebooks", "cpp"],
  ["scikit-learn", "reus"],
  ["scikit-learn", "suas"],
  ["VS Code", "studio"],
  ["VS Code", "nasa"],
  ["VS Code", "suas"],
  ["VS Code", "cpp"],
  ["VS Code", "reus"],
  ["Docker", "studio"],
  ["Node.js", "studio"],
  ["Bash", "nasa"],
  ["Bash", "suas"],
  ["Bash", "cpp"],
];

export const EDGES: GraphEdge[] = RAW_EDGES.map(([source, target]) => ({
  source,
  target,
}));

export function neighborsOf(id: string): Set<string> {
  const out = new Set<string>();
  for (const e of EDGES) {
    if (e.source === id) out.add(e.target);
    else if (e.target === id) out.add(e.source);
  }
  return out;
}

export function groupsForSkill(skillId: string): GroupId[] {
  return EDGES.filter((e) => e.source === skillId).map(
    (e) => e.target as GroupId,
  );
}

const SKILL_CATEGORY_INDEX: Map<string, SkillCategory> = new Map(
  SKILL_LABELS.map((s) => [s.id, s.category] as const),
);

export function categoryOf(skillId: string): SkillCategory | undefined {
  return SKILL_CATEGORY_INDEX.get(skillId);
}

export const ALL_GROUP_IDS: GroupId[] = (
  Object.keys(GROUPS) as GroupId[]
).slice();
