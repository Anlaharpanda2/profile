export interface ProjectVisual {
  bg: string;
  label: string;
}

export interface ProjectMetrics {
  performance: string;
  users: number;
}

export interface Project {
  slug: string;
  num: string;
  title: string;
  tagline: string;
  year: number;
  image: string;
  role: string;
  tags: string[];
  categories: string[];
  stack: string[];
  problem: string;
  impact: string[];
  demoLink: string;
  githubLink: string;
  featured: boolean;
  duration: string;
  metrics: ProjectMetrics;
  learnings: string[];
  visual: ProjectVisual;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  author: string;
  thumbnail: string;
  content: string;
}

export interface SessionUser {
  username: string;
  exp: number;
}
