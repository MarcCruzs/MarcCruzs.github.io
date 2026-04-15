export type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  category: string[];
  link?: string;
  featured?: boolean;
  featuredImage?: string;
};

export const projects: Project[] = [
  {
    id: "nasa-rd",
    title: "NASA R&D",
    subtitle: "NASA Ames Research Center",
    description:
      "Worked as a software engineer intern to NASA contractor for over a year. Contributed to R&D relating to contrail (condensation trails) algorithms and data collection for scientific research and atmospheric modeling.",
    tags: ["python", "ETL", "pandas", "numpy", "NOAA", "HPC", "slurm", "postman", "REST API", "MATLAB"],
    category: ["Data Science"],
    featured: true,
  },
  {
    id: "suas-competition",
    title: "SUAS Competition",
    subtitle: "SUAS (Student Unmanned Aerial Systems) Competition",
    description:
      "Led as the software lead to begin development of a unique object detection system to partake in the yearly international competition. Worked on architecting, designing, and leading a group of fellow software developers to make a robust detection companion system to a student built UAV (unmanned aerial systems).",
    tags: ["python", "numpy", "pytorch", "UAV", "roboflow", "jira"],
    category: ["Machine Learning"],
    link: "#",
    featured: true,
  },
  {
    id: "precision-agriculture",
    title: "Precision Agriculture Research",
    subtitle: "CPP UAS REU",
    description:
      "As part of the research assistant in the NSF program, developed software towards UAV (unmanned aerial vehicle) object detection system to take part in weed removal system in tandem with a UGV (unmanned ground vehicle). A collaboration to enhance the possibility of efficient farm maintainability through machine learning applications and robotics.",
    tags: ["python", "numpy", "pytorch", "UAV", "roboflow", "OpenCV", "pandas"],
    category: ["Machine Learning"],
    link: "#",
  },
  {
    id: "website",
    title: "Website",
    subtitle: "",
    description:
      "Codebase that made this website! One of my first full attempts to dabble with react, but I think the website came out neatly.",
    tags: ["react", "tailwind", "HTML", "CSS", "typescript"],
    category: ["Web Development"],
    link: "#",
  },
  {
    id: "mobility-scooters",
    title: "Mobility Scooters DL Research",
    subtitle: "NSF REU Big Data Security & Privacy",
    description:
      "Conducted research under Dr. Tingting Chen, working on deep learning applications to support mobility scooter safety. The project is a novelty to applying machine learning and pushing the safety of mobility scooters for a rising elderly population. Then through the safety introduce possibility for accessibility to those who are mentally or physically disabled to have more freedom to travel.",
    tags: ["python", "numpy", "tensorflow", "raspberry pi"],
    category: ["Machine Learning"],
    link: "#",
  },
  {
    id: "apache-sdap",
    title: "Apache SDAP Class Project",
    subtitle: "",
    description:
      "Class project for parallel processing project. The intent was to optimize further the work done in Apache SDAP by implementing Airflow into the quickstart. The idea was to secure a better logging system into Apache SDAP and improve the pipeline efficiency.",
    tags: ["python", "apache airflow"],
    category: ["Class Work"],
    link: "#",
  },
  {
    id: "gpu-computing",
    title: "CS4990 | GPU Computing",
    subtitle: "",
    description:
      "Universities' class on understanding and how to utilize HPCs for GPU computing. Used NCSA to various assignments to practice and hone understanding of GPU computing. Of those assignments understanding how to batch operations and how to organize threads into blocks.",
    tags: ["CUDA C", "C++", "NCSA", "HPC", "slurm"],
    category: ["Class Work"],
  },
];

export type GraphNode = {
  id: string;
  label: string;
  type: "hub" | "category";
  icon?: string;
};

export type GraphLink = {
  source: string;
  target: string;
};

export const graphNodes: GraphNode[] = [
  { id: "nasa-hub", label: "NASA Hub", type: "hub" },
  { id: "data-science", label: "Data Science", type: "category", icon: "database" },
  { id: "web-dev", label: "Web Dev", type: "category", icon: "monitor" },
  { id: "machine-learning", label: "Machine Learning", type: "category", icon: "grid" },
  { id: "suas-comp", label: "SUAS Competition", type: "hub" },
  { id: "software-design", label: "Software Design", type: "category", icon: "layers" },
  { id: "class-work", label: "Class Work", type: "category", icon: "book" },
  { id: "website-node", label: "Website", type: "hub" },
  { id: "cs4990", label: "CS4990 | GPU Computing", type: "hub" },
  { id: "precision-ag", label: "Precision Agriculture Research", type: "hub" },
  { id: "mobility-scooters", label: "Mobility Scooters DL Research", type: "hub" },
];

export const graphLinks: GraphLink[] = [
  { source: "nasa-hub", target: "data-science" },
  { source: "suas-comp", target: "machine-learning" },
  { source: "precision-ag", target: "machine-learning" },
  { source: "mobility-scooters", target: "machine-learning" },
  { source: "website-node", target: "web-dev" },
  { source: "cs4990", target: "class-work" },
  { source: "software-design", target: "class-work" },
  { source: "machine-learning", target: "suas-comp" },
  { source: "data-science", target: "nasa-hub" },
];

export const filterCategories = ["All", "Data Science", "Machine Learning", "Web Development", "Class Work", "Python"];
