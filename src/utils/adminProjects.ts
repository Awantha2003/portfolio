import type { StoredProject } from '../types/project';
import { getApiError, readApiResponse } from './api';

export const ADMIN_PROJECTS_KEY = 'portfolio-admin-projects';
export const ADMIN_PROJECTS_EVENT = 'portfolio-admin-projects-updated';
export const ADMIN_TOKEN_KEY = 'portfolio-admin-token';

type ProjectPayload = Omit<StoredProject, 'id' | 'source' | 'createdAt'>;

const getAdminToken = () => window.sessionStorage.getItem(ADMIN_TOKEN_KEY) ?? '';

const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getAdminToken()}`
});

export const getLegacyAdminProjects = (): StoredProject[] => {
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

export const clearLegacyAdminProjects = () => {
  window.localStorage.removeItem(ADMIN_PROJECTS_KEY);
};

export const saveAdminProjects = (projects: StoredProject[]) => {
  window.localStorage.setItem(ADMIN_PROJECTS_KEY, JSON.stringify(projects));
  window.dispatchEvent(new Event(ADMIN_PROJECTS_EVENT));
};

export const getAdminProjects = async (): Promise<StoredProject[]> => {
  const response = await fetch('/api/projects');
  const result = await readApiResponse(response);

  if (!response.ok) {
    throw new Error(getApiError(result, `Projects API returned ${response.status}`));
  }

  return Array.isArray(result.projects) ? result.projects as unknown as StoredProject[] : [];
};

export const addAdminProject = async (project: ProjectPayload) => {
  const response = await fetch('/api/projects', {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(project)
  });
  const result = await readApiResponse(response);

  if (!response.ok) {
    throw new Error(getApiError(result, `Projects API returned ${response.status}`));
  }

  window.dispatchEvent(new Event(ADMIN_PROJECTS_EVENT));
  return result.project as unknown as StoredProject;
};

export const updateAdminProject = async (
  projectId: number,
  updates: ProjectPayload,
) => {
  const response = await fetch(`/api/projects?id=${encodeURIComponent(String(projectId))}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(updates)
  });
  const result = await readApiResponse(response);

  if (!response.ok) {
    throw new Error(getApiError(result, `Projects API returned ${response.status}`));
  }

  window.dispatchEvent(new Event(ADMIN_PROJECTS_EVENT));
  return result.project as unknown as StoredProject;
};

export const deleteAdminProject = async (projectId: number) => {
  const response = await fetch(`/api/projects?id=${encodeURIComponent(String(projectId))}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  const result = await readApiResponse(response);

  if (!response.ok) {
    throw new Error(getApiError(result, `Projects API returned ${response.status}`));
  }

  window.dispatchEvent(new Event(ADMIN_PROJECTS_EVENT));
};
