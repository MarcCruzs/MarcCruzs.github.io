import raw from "./projects.json"; 

export type Project = {
  id: string;
  title: string;
  tags: string[];
  group?: string;
  url?: string;
  summary: string;
  description: string;
};

export const projects = raw as Project[];
