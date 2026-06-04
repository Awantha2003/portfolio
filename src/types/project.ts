export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string[];
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
  FigmaUrl?: string;
}

export type StoredProject = Project & {
  source: 'admin';
  createdAt: string;
};
