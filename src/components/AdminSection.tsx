import React, { useEffect, useMemo, useState } from 'react';
import { Edit3Icon, LogOutIcon, PinIcon, PlusIcon, SaveIcon, StarIcon, Trash2Icon, XIcon } from 'lucide-react';
import Button from './ui/Button';
import ImageUpload, { type UploadedImage } from './ImageUpload';
import {
  addAdminProject,
  ADMIN_TOKEN_KEY,
  clearLegacyAdminProjects,
  getAdminProjects,
  getLegacyAdminProjects,
  updateAdminProject,
  deleteAdminProject,
  deleteAllAdminProjects
} from '../utils/adminProjects';
import { getApiError, readApiResponse } from '../utils/api';
import { getDisplayImageUrl } from '../utils/cloudinaryImage';
import type { StoredProject } from '../types/project';
import type { ResumeContent } from '../types/resumeContent';
import { getAdminResumeContent, saveAdminResumeContent } from '../utils/adminResume';

const categories = ['Web Apps', 'UI/UX', 'Mobile', 'Clients'];

const emptyForm = {
  title: '',
  description: '',
  stack: '',
  liveUrl: '',
  githubUrl: '',
  FigmaUrl: '',
  pinned: false
};

const defaultResumeText = {
  resumeUrl: 'https://drive.google.com/file/d/1OTrqNG6cXWZkoXwahXFOjmVy68eg6Kqg/view?pli=1',
  education: "Bachelor's Degree in Software Engineering | Sri Lanka Institute of Information Technology (SLIIT) | 2021 - Present | Undergraduate",
  experience: [
    'Full Stack Developer | Mobile App Development | 2025 - Present | Leading development of enterprise web applications with React and MERN stack',
    'UI/UX Engineer | Figma and Adobe XD | 2025 | Designed and implemented user interfaces for mobile and web applications',
    'Frontend Developer | React and React Native | 2025 | Developed responsive web applications using React and modern JavaScript'
  ].join('\n'),
  keySkills: 'React, Node.js, Java, Spring Boot, MongoDB, MySQL, TailwindCSS, Figma, Git, Docker, TypeScript, React Native',
  certifications: [
    'Machine Learning Operations (MLOps) for Generative AI | Google Cloud Skills Boost | 2024 | https://www.cloudskillsboost.google/public_profiles/0781d0ff-b1f8-469c-9590-caa6429ca24f/badges/13505552?utm_medium=social&utm_source=linkedin&utm_campaign=ql-social-share',
    'Introduction to Generative AI | Google Cloud Skills Boost | 2024',
    'Microsoft Azure Fundamentals | Microsoft | 2024 | https://learn.microsoft.com/en-gb/users/awanthaimesh-3164/achievements/uxs9zf63?ref=https%3A%2F%2Fwww.linkedin.com%2F',
    'Full Stack Web Development | React, Node.js, MongoDB | 2024',
    'UI/UX Design | Figma, Adobe XD | 2024',
    'Mobile App Development | React Native, Kotlin | 2024'
  ].join('\n')
};

const toRows = (text: string) => text.split('\n').map(row => row.trim()).filter(Boolean);
const splitPipe = (row: string) => row.split('|').map(item => item.trim());

const resumeToText = (resume: ResumeContent) => ({
  resumeUrl: resume.resumeUrl ?? '',
  education: resume.education.map(item => [item.degree, item.institution, item.period, item.status].join(' | ')).join('\n'),
  experience: resume.experience.map(item => [item.position, item.company, item.period, item.description].join(' | ')).join('\n'),
  keySkills: resume.keySkills.join(', '),
  certifications: resume.certifications.map(item => [item.name, item.issuer, item.year, item.url ?? ''].filter(Boolean).join(' | ')).join('\n')
});

const textToResume = (text: typeof defaultResumeText): ResumeContent => ({
  resumeUrl: text.resumeUrl.trim() || undefined,
  education: toRows(text.education).map(row => {
    const [degree = '', institution = '', period = '', status = ''] = splitPipe(row);
    return { degree, institution, period, status };
  }).filter(item => item.degree && item.institution),
  experience: toRows(text.experience).map(row => {
    const [position = '', company = '', period = '', description = ''] = splitPipe(row);
    return { position, company, period, description };
  }).filter(item => item.position && item.company),
  keySkills: text.keySkills.split(/,|\n/).map(item => item.trim()).filter(Boolean),
  certifications: toRows(text.certifications).map(row => {
    const [name = '', issuer = '', year = '', url = ''] = splitPipe(row);
    return { name, issuer, year, ...(url ? { url } : {}) };
  }).filter(item => item.name && item.issuer)
});

const AdminSection: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() =>
    window.sessionStorage.getItem('portfolio-admin-auth') === 'true' &&
    Boolean(window.sessionStorage.getItem(ADMIN_TOKEN_KEY))
  );
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [loginStatus, setLoginStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
  const [loginError, setLoginError] = useState('');
  const [formData, setFormData] = useState(emptyForm);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['Web Apps']);
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
  const [projects, setProjects] = useState<StoredProject[]>([]);
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);
  const [resumeText, setResumeText] = useState(defaultResumeText);
  const [resumeStatus, setResumeStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [resumeMessage, setResumeMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const isEditing = editingProjectId !== null;

  const refreshProjects = async () => {
    try {
      setProjects(await getAdminProjects());
    } catch (projectError) {
      setStatus('error');
      setError(projectError instanceof Error ? projectError.message : 'Could not load projects');
    }
  };

  const refreshResume = async () => {
    try {
      const resume = await getAdminResumeContent();

      if (resume) {
        setResumeText(resumeToText(resume));
      }
    } catch {
      setResumeText(defaultResumeText);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      void refreshProjects();
      void refreshResume();
    }
  }, [isLoggedIn]);

  const stackItems = useMemo(
    () =>
      formData.stack
        .split(',')
        .map(item => item.trim())
        .filter(Boolean),
    [formData.stack]
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = event.target;
    setFormData(previous => ({
      ...previous,
      [name]: type === 'checkbox' && event.target instanceof HTMLInputElement ? event.target.checked : value
    }));
  };

  const handleResumeTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setResumeText(previous => ({
      ...previous,
      [name]: value
    }));
  };

  const handleResumeInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setResumeText(previous => ({
      ...previous,
      [name]: value
    }));
  };

  const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginData(previous => ({
      ...previous,
      [name]: value
    }));
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoginStatus('submitting');
    setLoginError('');

    try {
      const response = await fetch('/api/admin-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });
      const result = await readApiResponse(response);

      if (!response.ok) {
        throw new Error(
          getApiError(
            result,
            `Admin login API returned ${response.status}. Check the Vercel deployment and admin environment variables.`
          )
        );
      }

      const token = typeof result.token === 'string' ? result.token : '';

      if (!token) {
        throw new Error('Admin login did not return an authorization token');
      }

      window.sessionStorage.setItem('portfolio-admin-auth', 'true');
      window.sessionStorage.setItem(ADMIN_TOKEN_KEY, token);
      setIsLoggedIn(true);
      setLoginData({
        email: '',
        password: ''
      });
      setLoginStatus('idle');

      const legacyProjects = getLegacyAdminProjects();

      if (legacyProjects.length > 0) {
        await Promise.all(legacyProjects.map(project => addAdminProject({
          title: project.title,
          description: project.description,
          image: project.image,
          category: project.category,
          stack: project.stack,
          liveUrl: project.liveUrl,
          githubUrl: project.githubUrl,
          FigmaUrl: project.FigmaUrl
        })));
        clearLegacyAdminProjects();
      }

      await refreshProjects();
    } catch (error) {
      setLoginStatus('error');
      setLoginError(error instanceof Error ? error.message : 'Admin login failed');
    }
  };

  const handleLogout = () => {
    window.sessionStorage.removeItem('portfolio-admin-auth');
    window.sessionStorage.removeItem(ADMIN_TOKEN_KEY);
    setIsLoggedIn(false);
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(previous =>
      previous.includes(category)
        ? previous.filter(item => item !== category)
        : [...previous, category]
    );
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setSelectedCategories(['Web Apps']);
    setUploadedImage(null);
    setEditingProjectId(null);
    setStatus('idle');
    setSuccessMessage('');
    setError('');
  };

  const handleEdit = (project: StoredProject) => {
    setEditingProjectId(project.id);
    setFormData({
      title: project.title,
      description: project.description,
      stack: project.stack.join(', '),
      liveUrl: project.liveUrl ?? '',
      githubUrl: project.githubUrl ?? '',
      FigmaUrl: project.FigmaUrl ?? '',
      pinned: Boolean(project.pinned)
    });
    setSelectedCategories(project.category);
    setUploadedImage({
      publicId: project.title,
      secureUrl: project.image,
      width: 0,
      height: 0,
      format: project.image.split('.').pop() ?? 'image'
    });
    setStatus('idle');
    setSuccessMessage('');
    setError('');
    document.getElementById('admin-project-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus('idle');
    setSuccessMessage('');
    setError('');

    if (!uploadedImage) {
      setStatus('error');
      setError('Upload a project image first.');
      return;
    }

    if (selectedCategories.length === 0) {
      setStatus('error');
      setError('Choose at least one project category.');
      return;
    }

    if (stackItems.length === 0) {
      setStatus('error');
      setError('Add at least one tech stack item.');
      return;
    }

    const projectPayload = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      image: uploadedImage.secureUrl,
      category: selectedCategories,
      stack: stackItems,
      liveUrl: formData.liveUrl.trim() || undefined,
      githubUrl: formData.githubUrl.trim() || undefined,
      FigmaUrl: formData.FigmaUrl.trim() || undefined,
      pinned: formData.pinned
    };

    try {
      if (editingProjectId) {
        await updateAdminProject(editingProjectId, projectPayload);
        setSuccessMessage('Project updated in the portfolio.');
      } else {
        await addAdminProject(projectPayload);
        setSuccessMessage('Project added to the portfolio.');
      }

      await refreshProjects();
      setFormData(emptyForm);
      setSelectedCategories(['Web Apps']);
      setUploadedImage(null);
      setEditingProjectId(null);
      setStatus('success');
    } catch (projectError) {
      setStatus('error');
      setError(projectError instanceof Error ? projectError.message : 'Could not save project');
    }
  };

  const handleResumeSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setResumeStatus('idle');
    setResumeMessage('');

    try {
      const savedResume = await saveAdminResumeContent(textToResume(resumeText));
      setResumeText(resumeToText(savedResume));
      setResumeStatus('success');
      setResumeMessage('Resume sections updated on the portfolio.');
    } catch (resumeError) {
      setResumeStatus('error');
      setResumeMessage(resumeError instanceof Error ? resumeError.message : 'Could not save resume sections');
    }
  };

  const handleClearResume = async () => {
    const emptyResumeText = {
      resumeUrl: '',
      education: '',
      experience: '',
      keySkills: '',
      certifications: ''
    };
    setResumeText(emptyResumeText);
    setResumeStatus('idle');
    setResumeMessage('');

    try {
      await saveAdminResumeContent(textToResume(emptyResumeText));
      setResumeStatus('success');
      setResumeMessage('Resume sections cleared from the portfolio.');
    } catch (resumeError) {
      setResumeStatus('error');
      setResumeMessage(resumeError instanceof Error ? resumeError.message : 'Could not clear resume sections');
    }
  };

  const handleDelete = async (projectId: number) => {
    try {
      await deleteAdminProject(projectId);
      await refreshProjects();

      if (editingProjectId === projectId) {
        resetForm();
      }
    } catch (projectError) {
      setStatus('error');
      setError(projectError instanceof Error ? projectError.message : 'Could not delete project');
    }
  };

  const handleDeleteAllProjects = async () => {
    try {
      await deleteAllAdminProjects();
      await refreshProjects();
      resetForm();
    } catch (projectError) {
      setStatus('error');
      setError(projectError instanceof Error ? projectError.message : 'Could not delete all projects');
    }
  };

  return (
    <section id="admin" className="bg-gray-950 py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Admin <span className="text-orange-500">Projects</span>
          </h2>
          <p className="text-xl text-gray-300">Upload new project work with Vercel API image uploads.</p>
        </div>

        {!isLoggedIn ? (
          <form onSubmit={handleLogin} className="mx-auto max-w-md space-y-6 rounded-xl border border-gray-800 bg-black/40 p-6">
            <div>
              <label htmlFor="admin-email" className="mb-2 block text-sm font-medium text-gray-400">
                Admin email
              </label>
              <input
                id="admin-email"
                name="email"
                type="email"
                value={loginData.email}
                onChange={handleLoginChange}
                required
                className="w-full rounded-lg border border-gray-800 bg-gray-900/50 px-4 py-3 transition-all focus:border-orange-500/50 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                placeholder="admin@example.com"
              />
            </div>
            <div>
              <label htmlFor="admin-password" className="mb-2 block text-sm font-medium text-gray-400">
                Password
              </label>
              <input
                id="admin-password"
                name="password"
                type="password"
                value={loginData.password}
                onChange={handleLoginChange}
                required
                className="w-full rounded-lg border border-gray-800 bg-gray-900/50 px-4 py-3 transition-all focus:border-orange-500/50 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                placeholder="Admin password"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loginStatus === 'submitting'}>
              {loginStatus === 'submitting' ? 'Logging in...' : 'Login'}
            </Button>
            {loginStatus === 'error' && <p className="text-center text-sm text-red-500">{loginError}</p>}
          </form>
        ) : (
        <div className="space-y-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <form id="admin-project-form" onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-gray-800 bg-black/40 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold">{isEditing ? 'Update Project' : 'Add Project'}</h3>
                <p className="text-sm text-gray-500">
                  {isEditing ? 'Edit details, links, categories, or replace the image.' : 'Create a project that appears on the homepage.'}
                </p>
              </div>
              <Button type="button" variant="secondary" className="px-4 py-2" onClick={handleLogout}>
                <LogOutIcon size={16} />
                Logout
              </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="admin-title" className="mb-2 block text-sm font-medium text-gray-400">
                  Project title
                </label>
                <input
                  id="admin-title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-800 bg-gray-900/50 px-4 py-3 transition-all focus:border-orange-500/50 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                  placeholder="Project name"
                />
              </div>
              <div>
                <label htmlFor="admin-stack" className="mb-2 block text-sm font-medium text-gray-400">
                  Tech stack
                </label>
                <input
                  id="admin-stack"
                  name="stack"
                  value={formData.stack}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-800 bg-gray-900/50 px-4 py-3 transition-all focus:border-orange-500/50 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                  placeholder="React, Node.js, MongoDB"
                />
              </div>
            </div>

            <div>
              <label htmlFor="admin-description" className="mb-2 block text-sm font-medium text-gray-400">
                Description
              </label>
              <textarea
                id="admin-description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={5}
                className="w-full rounded-lg border border-gray-800 bg-gray-900/50 px-4 py-3 transition-all focus:border-orange-500/50 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                placeholder="What did this project solve?"
              />
            </div>

            <div>
              <p className="mb-3 text-sm font-medium text-gray-400">Categories</p>
              <div className="flex flex-wrap gap-3">
                {categories.map(category => (
                  <label
                    key={category}
                    className={`cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors ${
                      selectedCategories.includes(category)
                        ? 'border-orange-500 bg-orange-500 text-white'
                        : 'border-gray-700 bg-gray-900/50 text-gray-300 hover:border-gray-500'
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={selectedCategories.includes(category)}
                      onChange={() => toggleCategory(category)}
                    />
                    {category}
                  </label>
                ))}
              </div>
            </div>

            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-800 bg-gray-900/40 p-4 text-sm text-gray-300 transition-colors hover:border-orange-500/50">
              <input
                type="checkbox"
                name="pinned"
                checked={formData.pinned}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-700 bg-black text-orange-500 focus:ring-orange-500"
              />
              <span className="flex items-center gap-2">
                <PinIcon size={16} className="text-orange-500" />
                Pin this project first on the homepage
              </span>
            </label>

            <ImageUpload value={uploadedImage} onChange={setUploadedImage} />

            <div className="grid gap-6 md:grid-cols-3">
              <input
                name="liveUrl"
                value={formData.liveUrl}
                onChange={handleChange}
                className="rounded-lg border border-gray-800 bg-gray-900/50 px-4 py-3 focus:border-orange-500/50 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                placeholder="Live demo URL"
              />
              <input
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                className="rounded-lg border border-gray-800 bg-gray-900/50 px-4 py-3 focus:border-orange-500/50 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                placeholder="GitHub URL"
              />
              <input
                name="FigmaUrl"
                value={formData.FigmaUrl}
                onChange={handleChange}
                className="rounded-lg border border-gray-800 bg-gray-900/50 px-4 py-3 focus:border-orange-500/50 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                placeholder="Figma URL"
              />
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Button type="submit" className="px-8 py-3">
                {isEditing ? <SaveIcon size={16} /> : <PlusIcon size={16} />}
                {isEditing ? 'Update Project' : 'Save Project'}
              </Button>
              {isEditing && <Button type="button" variant="secondary" className="px-4 py-3" onClick={resetForm}>
                <XIcon size={16} />
                Cancel Edit
              </Button>}
              {status === 'success' && <p className="text-sm text-green-500">{successMessage}</p>}
              {status === 'success' && <a href="/#projects" className="text-sm font-medium text-orange-400 hover:text-orange-300">
                View on homepage
              </a>}
              {status === 'error' && <p className="text-sm text-red-500">{error}</p>}
            </div>
          </form>

          <div className="rounded-xl border border-gray-800 bg-black/40 p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-xl font-bold">Uploaded Projects</h3>
              {projects.length > 0 && <button type="button" onClick={handleDeleteAllProjects} className="rounded-full border border-red-500/30 px-4 py-2 text-xs font-semibold text-red-400 transition-colors hover:bg-red-500/10">
                Delete All
              </button>}
            </div>
            <div className="space-y-4">
              {projects.length === 0 ? (
                <p className="text-sm text-gray-500">No admin projects uploaded yet.</p>
              ) : (
                projects.map(project => (
                  <div key={project.id} className="flex gap-4 rounded-lg border border-gray-800 bg-gray-900/40 p-3">
                    <img src={getDisplayImageUrl(project.image)} alt={project.title} className="h-16 w-16 rounded-md object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-gray-100">
                        {project.pinned && <StarIcon size={14} className="mr-1 inline text-orange-500" />}
                        {project.title}
                      </p>
                      <p className="truncate text-xs text-gray-500">{project.category.join(', ')}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleEdit(project)}
                      className="rounded-md p-2 text-gray-500 transition-colors hover:bg-orange-500/10 hover:text-orange-400"
                      aria-label={`Edit ${project.title}`}
                    >
                      <Edit3Icon size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(project.id)}
                      className="rounded-md p-2 text-gray-500 transition-colors hover:bg-red-500/10 hover:text-red-400"
                      aria-label={`Delete ${project.title}`}
                    >
                      <Trash2Icon size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

          <form onSubmit={handleResumeSubmit} className="space-y-6 rounded-xl border border-gray-800 bg-black/40 p-6">
            <div>
              <h3 className="text-xl font-bold">Resume Sections</h3>
              <p className="text-sm text-gray-500">
                Add one item per line. Use this format: title | place | period | details.
              </p>
            </div>

            <div>
              <label htmlFor="resume-url" className="mb-2 block text-sm font-medium text-gray-400">
                My Resume Link
              </label>
              <input
                id="resume-url"
                name="resumeUrl"
                value={resumeText.resumeUrl}
                onChange={handleResumeInputChange}
                className="w-full rounded-lg border border-gray-800 bg-gray-900/50 px-4 py-3 text-sm focus:border-orange-500/50 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                placeholder="https://drive.google.com/file/d/..."
              />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <label htmlFor="resume-education" className="mb-2 block text-sm font-medium text-gray-400">
                  Education
                </label>
                <textarea id="resume-education" name="education" value={resumeText.education} onChange={handleResumeTextChange} rows={5} className="w-full rounded-lg border border-gray-800 bg-gray-900/50 px-4 py-3 text-sm focus:border-orange-500/50 focus:outline-none focus:ring-2 focus:ring-orange-500/50" />
              </div>
              <div>
                <label htmlFor="resume-experience" className="mb-2 block text-sm font-medium text-gray-400">
                  Experience
                </label>
                <textarea id="resume-experience" name="experience" value={resumeText.experience} onChange={handleResumeTextChange} rows={5} className="w-full rounded-lg border border-gray-800 bg-gray-900/50 px-4 py-3 text-sm focus:border-orange-500/50 focus:outline-none focus:ring-2 focus:ring-orange-500/50" />
              </div>
              <div>
                <label htmlFor="resume-skills" className="mb-2 block text-sm font-medium text-gray-400">
                  Key Skills
                </label>
                <textarea id="resume-skills" name="keySkills" value={resumeText.keySkills} onChange={handleResumeTextChange} rows={5} className="w-full rounded-lg border border-gray-800 bg-gray-900/50 px-4 py-3 text-sm focus:border-orange-500/50 focus:outline-none focus:ring-2 focus:ring-orange-500/50" />
              </div>
              <div>
                <label htmlFor="resume-certifications" className="mb-2 block text-sm font-medium text-gray-400">
                  Certifications & Expertise
                </label>
                <textarea id="resume-certifications" name="certifications" value={resumeText.certifications} onChange={handleResumeTextChange} rows={5} className="w-full rounded-lg border border-gray-800 bg-gray-900/50 px-4 py-3 text-sm focus:border-orange-500/50 focus:outline-none focus:ring-2 focus:ring-orange-500/50" />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Button type="submit" className="px-8 py-3">
                <SaveIcon size={16} />
                Save Resume Sections
              </Button>
              <Button type="button" variant="secondary" className="px-4 py-3" onClick={handleClearResume}>
                <Trash2Icon size={16} />
                Clear All Resume
              </Button>
              {resumeStatus !== 'idle' && <p className={`text-sm ${resumeStatus === 'success' ? 'text-green-500' : 'text-red-500'}`}>{resumeMessage}</p>}
            </div>
          </form>
        </div>
        )}
      </div>
    </section>
  );
};

export default AdminSection;
