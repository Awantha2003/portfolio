import type { ResumeContent } from '../types/resumeContent';
import { getApiError, readApiResponse } from './api';
import { ADMIN_TOKEN_KEY } from './adminProjects';

export const ADMIN_RESUME_EVENT = 'portfolio-admin-resume-updated';

const getAdminToken = () => window.sessionStorage.getItem(ADMIN_TOKEN_KEY) ?? '';

export const getAdminResumeContent = async (): Promise<ResumeContent | null> => {
  const response = await fetch('/api/resume');
  const result = await readApiResponse(response);

  if (!response.ok) {
    throw new Error(getApiError(result, `Resume API returned ${response.status}`));
  }

  return result.resume ? result.resume as ResumeContent : null;
};

export const saveAdminResumeContent = async (resume: ResumeContent) => {
  const response = await fetch('/api/resume', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAdminToken()}`
    },
    body: JSON.stringify(resume)
  });
  const result = await readApiResponse(response);

  if (!response.ok) {
    throw new Error(getApiError(result, `Resume API returned ${response.status}`));
  }

  window.dispatchEvent(new Event(ADMIN_RESUME_EVENT));
  return result.resume as ResumeContent;
};
