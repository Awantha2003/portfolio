import type { StoredProject } from '../types/project';

export const ADMIN_PROJECTS_KEY = 'portfolio-admin-projects';
export const ADMIN_PROJECTS_EVENT = 'portfolio-admin-projects-updated';

export const getAdminProjects = (): StoredProject[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const value = window.localStorage.getItem(ADMIN_PROJECTS_KEY);
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
};

export const saveAdminProjects = (projects: StoredProject[]) => {
  window.localStorage.setItem(ADMIN_PROJECTS_KEY, JSON.stringify(projects));
  window.dispatchEvent(new Event(ADMIN_PROJECTS_EVENT));
};

export const addAdminProject = (project: Omit<StoredProject, 'id' | 'source' | 'createdAt'>) => {
  const projects = getAdminProjects();
  const nextProject: StoredProject = {
    ...project,
    id: Date.now(),
    source: 'admin',
    createdAt: new Date().toISOString()
  };

  saveAdminProjects([nextProject, ...projects]);
  return nextProject;
};

export const updateAdminProject = (
  projectId: number,
  updates: Omit<StoredProject, 'id' | 'source' | 'createdAt'>,
) => {
  const projects = getAdminProjects();
  const nextProjects = projects.map(project =>
    project.id === projectId
      ? {
          ...project,
          ...updates
        }
      : project
  );

  saveAdminProjects(nextProjects);
  return nextProjects.find(project => project.id === projectId);
};

export const deleteAdminProject = (projectId: number) => {
  saveAdminProjects(getAdminProjects().filter(project => project.id !== projectId));
};
