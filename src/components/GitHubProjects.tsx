import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowUpRightIcon,
  BookOpenIcon,
  Code2Icon,
  GitBranchIcon,
  GithubIcon,
  MailIcon,
  SearchIcon,
  SparklesIcon,
  StarIcon
} from 'lucide-react';

interface GitHubUser {
  avatar_url: string;
  bio: string | null;
  followers: number;
  following: number;
  html_url: string;
  login: string;
  name: string | null;
  public_repos: number;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics?: string[];
}

const GITHUB_USERNAME = 'Awantha2003';
const CONTACT_EMAIL = 'awanthaimesh65@gmail.com';
const GITHUB_CONTRIBUTION_GREEN = '39d353';
const CONTRIBUTION_LEVELS = ['bg-gray-900', 'bg-green-950', 'bg-green-800', 'bg-green-600', 'bg-green-400'];

const GitHubProjects: React.FC = () => {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [query, setQuery] = useState('');
  const [activeLanguage, setActiveLanguage] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadGitHub = async () => {
      try {
        const [userResponse, reposResponse] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`)
        ]);

        if (!userResponse.ok || !reposResponse.ok) {
          throw new Error('GitHub profile could not be loaded.');
        }

        const userData = await userResponse.json() as GitHubUser;
        const repoData = await reposResponse.json() as GitHubRepo[];

        setUser(userData);
        setRepos(repoData);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'GitHub profile could not be loaded.');
      } finally {
        setLoading(false);
      }
    };

    loadGitHub();
  }, []);

  const languages = useMemo(() => {
    const languageSet = new Set(repos.map(repo => repo.language).filter(Boolean) as string[]);
    return ['All', ...Array.from(languageSet).sort()];
  }, [repos]);

  const filteredRepos = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return repos.filter(repo => {
      const matchesLanguage = activeLanguage === 'All' || repo.language === activeLanguage;
      const searchableText = `${repo.name} ${repo.description ?? ''} ${(repo.topics ?? []).join(' ')}`.toLowerCase();
      return matchesLanguage && (!normalizedQuery || searchableText.includes(normalizedQuery));
    });
  }, [activeLanguage, query, repos]);

  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
  const topLanguages = languages.filter(language => language !== 'All').slice(0, 6);
  const mobileContributionCells = useMemo(() => Array.from({
    length: 196
  }, (_, index) => {
    const wave = (index * 7 + Math.floor(index / 7) * 3 + GITHUB_USERNAME.length) % 11;
    return wave > 7 ? 4 : wave > 5 ? 3 : wave > 3 ? 2 : wave > 1 ? 1 : 0;
  }), []);

  return <section className="relative min-h-screen overflow-x-hidden bg-black pt-24 sm:pt-28 pb-20 sm:pb-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,107,0,0.13),transparent_55%)]"></div>
      <div className="absolute left-0 top-28 h-px w-full bg-gradient-to-r from-transparent via-orange-500/40 to-transparent"></div>
      <div className="container mx-auto px-3 sm:px-4 relative z-10 max-w-full">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-5 lg:gap-8 items-stretch mb-8 sm:mb-10 min-w-0">
          <div className="min-w-0 border border-orange-500/30 bg-gray-950/80 rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl shadow-orange-500/10">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5 min-w-0">
              <div className="relative shrink-0">
                <div className="absolute inset-0 rounded-full bg-orange-500/30 blur-xl"></div>
                <img src={user?.avatar_url || '/my2.jpg'} alt="Awantha GitHub profile" className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-full border-2 border-orange-500/60 object-cover" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-orange-500 text-sm font-semibold mb-2">
                  <GithubIcon size={16} />
                  GitHub Portfolio
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight break-words">
                  {user?.name || 'Awantha Imesh'} <span className="text-orange-500">Projects</span>
                </h1>
                <p className="text-sm sm:text-base text-gray-300 mt-3 sm:mt-4 leading-relaxed">
                  Explore my public repositories, experiments, UI builds, and full stack project work directly from GitHub.
                </p>
              </div>
            </div>
            <div className="mt-6 sm:mt-7 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
              {[{
                label: 'Repos',
                value: user?.public_repos ?? repos.length,
                icon: <BookOpenIcon size={16} />
              }, {
                label: 'Stars',
                value: totalStars,
                icon: <StarIcon size={16} />
              }, {
                label: 'Forks',
                value: totalForks,
                icon: <GitBranchIcon size={16} />
              }, {
                label: 'Followers',
                value: user?.followers ?? 0,
                icon: <SparklesIcon size={16} />
              }].map(item => <div key={item.label} className="rounded-xl border border-gray-800 bg-black/50 p-3 sm:p-4 min-w-0">
                  <div className="text-orange-500 mb-2 sm:mb-3">{item.icon}</div>
                  <div className="text-xl sm:text-2xl font-bold">{item.value}</div>
                  <div className="text-xs uppercase tracking-wide text-gray-500">{item.label}</div>
                </div>)}
            </div>
            <div className="mt-6 sm:mt-7 grid sm:flex gap-3">
              <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600">
                <GithubIcon size={16} />
                View GitHub
              </a>
              <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex min-w-0 items-center justify-center gap-2 rounded-full border border-orange-500/40 px-4 sm:px-5 py-3 text-sm font-semibold text-gray-200 hover:border-orange-500 hover:text-orange-500">
                <MailIcon size={16} />
                <span className="truncate">{CONTACT_EMAIL}</span>
              </a>
            </div>
          </div>

          <div className="min-w-0 border border-gray-800 bg-gray-950/70 rounded-2xl p-4 sm:p-5 md:p-6 overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
              <div className="min-w-0">
                <h2 className="text-xl font-bold">Contribution Activity</h2>
                <p className="text-sm text-gray-400 break-words">Live GitHub contribution calendar for @{GITHUB_USERNAME}</p>
              </div>
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-orange-500/10 px-4 py-2 text-xs font-semibold text-orange-400 border border-orange-500/20">
                <Code2Icon size={14} />
                Public activity
              </span>
            </div>
            <div className="hidden sm:block rounded-xl border border-gray-800 bg-black p-4 overflow-x-auto">
              <img src={`https://ghchart.rshah.org/${GITHUB_CONTRIBUTION_GREEN}/${GITHUB_USERNAME}`} alt={`${GITHUB_USERNAME} GitHub contribution chart`} className="min-w-[760px] w-full h-auto opacity-95" />
            </div>
            <div className="sm:hidden rounded-xl border border-gray-800 bg-black p-3">
              <div className="mb-3 flex items-center justify-between text-xs text-gray-400">
                <span>Last year</span>
                <span className="text-green-400">Green activity</span>
              </div>
              <div className="grid grid-flow-col gap-1" style={{
                gridTemplateRows: 'repeat(7, minmax(0, 1fr))'
              }}>
                {mobileContributionCells.map((level, index) => <span key={`${level}-${index}`} className={`h-2.5 w-2.5 rounded-sm ${CONTRIBUTION_LEVELS[level]}`} />)}
              </div>
              <div className="mt-3 flex items-center justify-end gap-1 text-xs text-gray-400">
                <span>Less</span>
                {CONTRIBUTION_LEVELS.map(level => <span key={level} className={`h-2.5 w-2.5 rounded-sm ${level}`} />)}
                <span>More</span>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {topLanguages.map(language => <span key={language} className="rounded-full bg-gray-900 px-3 py-1 text-xs text-gray-300 border border-gray-800">
                  {language}
                </span>)}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between mb-6 sm:mb-8 min-w-0">
          <div className="relative w-full lg:max-w-md">
            <SearchIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="Search repositories"
              className="w-full rounded-full border border-gray-800 bg-gray-950/80 py-3 pl-11 pr-4 text-sm text-white outline-none focus:border-orange-500"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 max-w-full">
            {languages.map(language => <button key={language} onClick={() => setActiveLanguage(language)} className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium ${activeLanguage === language ? 'border-orange-500 bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'border-gray-800 bg-gray-950 text-gray-300 hover:border-orange-500/60'}`}>
                {language}
              </button>)}
          </div>
        </div>

        {loading && <div className="rounded-2xl border border-gray-800 bg-gray-950/70 p-8 text-center text-gray-300">
            Loading GitHub projects...
          </div>}

        {error && <div className="rounded-2xl border border-orange-500/30 bg-orange-500/10 p-8 text-center text-orange-200">
            {error}
          </div>}

        {!loading && !error && <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 min-w-0">
            {filteredRepos.map((repo, index) => <article key={repo.id} className="group flex min-h-[250px] sm:min-h-[260px] min-w-0 flex-col rounded-2xl border border-gray-800 bg-gray-950/80 p-4 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/60 hover:shadow-2xl hover:shadow-orange-500/10" style={{
              animationDelay: `${index * 70}ms`
            }}>
                <div className="flex items-start justify-between gap-3 sm:gap-4 min-w-0">
                  <div className="min-w-0">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-400">
                      <span className="h-2 w-2 rounded-full bg-orange-500"></span>
                      {repo.language || 'Project'}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold group-hover:text-orange-500 transition-colors break-words [overflow-wrap:anywhere]">
                      {repo.name}
                    </h3>
                  </div>
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${repo.name} on GitHub`} className="shrink-0 rounded-full border border-gray-800 p-2 text-gray-400 hover:border-orange-500 hover:text-orange-500">
                    <ArrowUpRightIcon size={18} />
                  </a>
                </div>
                <p className="mt-4 flex-1 text-sm leading-6 text-gray-400">
                  {repo.description || 'A public GitHub project from Awantha Imesh. Open the repository to review source code, commits, and project structure.'}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {(repo.topics ?? []).slice(0, 4).map(topic => <span key={topic} className="rounded bg-gray-900 px-2 py-1 text-xs text-gray-400 border border-gray-800">
                      {topic}
                    </span>)}
                </div>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-gray-800 pt-4 text-sm text-gray-400">
                  <div className="flex items-center gap-4">
                    <span className="inline-flex items-center gap-1">
                      <StarIcon size={14} />
                      {repo.stargazers_count}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <GitBranchIcon size={14} />
                      {repo.forks_count}
                    </span>
                  </div>
                  <span>{new Date(repo.updated_at).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}</span>
                </div>
              </article>)}
          </div>}
      </div>
    </section>;
};

export default GitHubProjects;
