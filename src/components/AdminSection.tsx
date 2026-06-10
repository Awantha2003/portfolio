import React, { useEffect, useMemo, useState } from 'react';
import { LogOutIcon, SaveIcon, Trash2Icon } from 'lucide-react';
import Button from './ui/Button';
import ImageUpload, { type UploadedImage } from './ImageUpload';
import { addAdminProject, deleteAdminProject, getAdminProjects } from '../utils/adminProjects';
import { getApiError, readApiResponse } from '../utils/api';
import type { StoredProject } from '../types/project';

const categories = ['Web Apps', 'UI/UX', 'Mobile', 'Clients'];

const emptyForm = {
  title: '',
  description: '',
  stack: '',
  liveUrl: '',
  githubUrl: '',
  FigmaUrl: ''
};

const AdminSection: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => window.sessionStorage.getItem('portfolio-admin-auth') === 'true');
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
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      setProjects(getAdminProjects());
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
    const { name, value } = event.target;
    setFormData(previous => ({
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

      window.sessionStorage.setItem('portfolio-admin-auth', 'true');
      setIsLoggedIn(true);
      setLoginData({
        email: '',
        password: ''
      });
      setLoginStatus('idle');
    } catch (error) {
      setLoginStatus('error');
      setLoginError(error instanceof Error ? error.message : 'Admin login failed');
    }
  };

  const handleLogout = () => {
    window.sessionStorage.removeItem('portfolio-admin-auth');
    setIsLoggedIn(false);
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(previous =>
      previous.includes(category)
        ? previous.filter(item => item !== category)
        : [...previous, category]
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setStatus('idle');
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

    addAdminProject({
      title: formData.title.trim(),
      description: formData.description.trim(),
      image: uploadedImage.secureUrl,
      category: selectedCategories,
      stack: stackItems,
      liveUrl: formData.liveUrl.trim() || undefined,
      githubUrl: formData.githubUrl.trim() || undefined,
      FigmaUrl: formData.FigmaUrl.trim() || undefined
    });

    setProjects(getAdminProjects());
    setFormData(emptyForm);
    setSelectedCategories(['Web Apps']);
    setUploadedImage(null);
    setStatus('success');
  };

  const handleDelete = (projectId: number) => {
    deleteAdminProject(projectId);
    setProjects(getAdminProjects());
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
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-gray-800 bg-black/40 p-6">
            <div className="flex justify-end">
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
                <SaveIcon size={16} />
                Save Project
              </Button>
              {status === 'success' && <p className="text-sm text-green-500">Project added to the portfolio.</p>}
              {status === 'success' && <a href="/#projects" className="text-sm font-medium text-orange-400 hover:text-orange-300">
                View on homepage
              </a>}
              {status === 'error' && <p className="text-sm text-red-500">{error}</p>}
            </div>
          </form>

          <div className="rounded-xl border border-gray-800 bg-black/40 p-6">
            <h3 className="mb-4 text-xl font-bold">Uploaded Projects</h3>
            <div className="space-y-4">
              {projects.length === 0 ? (
                <p className="text-sm text-gray-500">No admin projects uploaded yet.</p>
              ) : (
                projects.map(project => (
                  <div key={project.id} className="flex gap-4 rounded-lg border border-gray-800 bg-gray-900/40 p-3">
                    <img src={project.image} alt={project.title} className="h-16 w-16 rounded-md object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-gray-100">{project.title}</p>
                      <p className="truncate text-xs text-gray-500">{project.category.join(', ')}</p>
                    </div>
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
        )}
      </div>
    </section>
  );
};

export default AdminSection;
