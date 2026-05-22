import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { GitCommit, GitPullRequest, HelpCircle, Code, Plus, ArrowUpRight, Sparkles, User, Settings, Lock } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [githubPat, setGithubPat] = useState('');
  const [openaiKey, setOpenaiKey] = useState('');

  // Sample static stats for Phase 1 mockup
  const stats = [
    { name: 'Commits Sync Tracker', value: '342', change: '+24% vs last week', icon: GitCommit, color: 'text-primary-400' },
    { name: 'Merged Pull Requests', value: '28', change: '84% merged rate', icon: GitPullRequest, color: 'text-accent-violet' },
    { name: 'Open Issues', value: '14', change: '-3 resolved today', icon: HelpCircle, color: 'text-accent-amber' },
    { name: 'Active Contributors', value: '6', change: 'All active this sprint', icon: Code, color: 'text-accent-emerald' },
  ];

  const mockRepos = [
    { id: 1, name: 'react-app-template', fullName: 'dev-team/react-app-template', branch: 'main', status: 'Active', commits: 142 },
    { id: 2, name: 'api-service-express', fullName: 'dev-team/api-service-express', branch: 'develop', status: 'Active', commits: 200 },
  ];

  return (
    <div className="min-h-screen bg-background text-white flex">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 pl-64 flex flex-col min-h-screen">
        {/* Navbar */}
        <Navbar title={activeTab === 'dashboard' ? 'Analytics Overview' : activeTab} />

        {/* Dynamic Inner Page Content */}
        <main className="flex-grow p-8">
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-fadeIn">
              {/* Welcome Banner */}
              <div className="rounded-2xl border border-border bg-gradient-to-r from-card to-background p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 h-40 w-40 bg-primary-600/10 rounded-full blur-3xl"></div>
                <h2 className="text-xl font-bold md:text-2xl text-white">Welcome back, Developer!</h2>
                <p className="mt-2 text-sm text-gray-400 max-w-xl">
                  DevTrackr has successfully configured your core authentication. Connect your GitHub repositories under the Repositories tab to unlock advanced commits tracking.
                </p>
              </div>

              {/* Stat Grid */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div key={idx} className="glass-panel glass-panel-hover rounded-xl p-5 border border-border">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-400">{stat.name}</span>
                        <div className={`p-2 rounded-lg bg-background/50 ${stat.color}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                      </div>
                      <div className="mt-4">
                        <span className="text-2xl font-bold tracking-tight">{stat.value}</span>
                        <span className="block mt-1 text-xs text-gray-500">{stat.change}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Placeholder / Mock Chart Info */}
              <div className="grid gap-6 md:grid-cols-3">
                <div className="glass-panel rounded-xl p-6 border border-border md:col-span-2">
                  <h3 className="text-lg font-bold text-white mb-4">Coding Activity</h3>
                  <div className="h-64 flex flex-col items-center justify-center border border-dashed border-border rounded-lg bg-background/40">
                    <GitCommit className="h-10 w-10 text-gray-600 mb-2 animate-bounce" />
                    <p className="text-sm text-gray-400 font-semibold">Activity Chart Placeholder</p>
                    <p className="text-xs text-gray-500 mt-1">Advanced Recharts visualization loads in Phase 2</p>
                  </div>
                </div>

                <div className="glass-panel rounded-xl p-6 border border-border">
                  <h3 className="text-lg font-bold text-white mb-4">Sprint Overview</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm border-b border-border/40 pb-3">
                      <span className="text-gray-400">Total Dev Time</span>
                      <span className="font-semibold">42 hrs</span>
                    </div>
                    <div className="flex justify-between items-center text-sm border-b border-border/40 pb-3">
                      <span className="text-gray-400">Commit Frequency</span>
                      <span className="font-semibold">6.2 / day</span>
                    </div>
                    <div className="flex justify-between items-center text-sm border-b border-border/40 pb-3">
                      <span className="text-gray-400">PR Merge Lead Time</span>
                      <span className="font-semibold">1.8 days</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">Target Repos</span>
                      <span className="font-semibold">2 Connected</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'repositories' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-white">Connected Repositories</h2>
                  <p className="text-sm text-gray-400">Manage repositories linked to DevTrackr dashboard</p>
                </div>
                <button className="flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-500 transition-all shadow-glow-primary">
                  <Plus className="h-4 w-4" />
                  <span>Connect Repository</span>
                </button>
              </div>

              {/* Repos Cards Grid */}
              <div className="grid gap-6 md:grid-cols-2">
                {mockRepos.map((repo) => (
                  <div key={repo.id} className="glass-panel rounded-xl p-6 border border-border flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-bold text-white truncate">{repo.name}</h3>
                        <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-xs text-emerald-400 font-semibold">
                          {repo.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 font-mono mt-1">{repo.fullName}</p>
                      <p className="text-sm text-gray-400 mt-4">
                        Synced branch: <span className="font-mono text-white bg-border/40 px-1.5 py-0.5 rounded text-xs">{repo.branch}</span>
                      </p>
                    </div>

                    <div className="border-t border-border/50 mt-6 pt-4 flex justify-between items-center text-sm">
                      <span className="text-gray-400">{repo.commits} tracked commits</span>
                      <button className="flex items-center gap-1 text-primary-400 hover:text-primary-300 font-semibold transition-colors">
                        <span>View Details</span>
                        <ArrowUpRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'ai-insights' && (
            <div className="space-y-6 flex flex-col items-center justify-center py-20 text-center animate-fadeIn">
              <div className="h-16 w-16 bg-accent-violet/10 rounded-2xl flex items-center justify-center text-accent-violet shadow-glow-accent border border-accent-violet/20 mb-6">
                <Sparkles className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold text-white">AI Productivity Insights</h2>
              <p className="text-gray-400 max-w-md mt-2">
                Sprint summaries, contributor inactivity detection, and automated reports will be unlocked in Phase 2 using the OpenAI GPT engine.
              </p>
              <div className="inline-flex items-center gap-2 rounded-lg bg-card border border-border px-4 py-2 mt-8 text-xs font-semibold text-gray-400">
                <Lock className="h-3.5 w-3.5 text-accent-violet" />
                <span>Feature locked: Requires Phase 2 installation</span>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-8 max-w-2xl animate-fadeIn">
              <div>
                <h2 className="text-xl font-bold text-white">Workspace Configuration</h2>
                <p className="text-sm text-gray-400">Configure developer access details and third-party keys</p>
              </div>

              <div className="glass-panel rounded-xl p-6 border border-border space-y-6">
                {/* GitHub PAT Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    GitHub Personal Access Token (PAT)
                  </label>
                  <input
                    type="password"
                    value={githubPat}
                    onChange={(e) => setGithubPat(e.target.value)}
                    className="block w-full rounded-lg border border-border bg-background/50 py-3 px-4 text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none sm:text-sm"
                    placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxx"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Used to fetch issues, repositories, and private commit commits.
                  </p>
                </div>

                {/* OpenAI API Key Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    OpenAI API Key
                  </label>
                  <input
                    type="password"
                    value={openaiKey}
                    onChange={(e) => setOpenaiKey(e.target.value)}
                    className="block w-full rounded-lg border border-border bg-background/50 py-3 px-4 text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none sm:text-sm"
                    placeholder="sk-proj-xxxxxxxxxxxxxxxxxxxxxx"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Used to trigger natural language developer sprint summaries.
                  </p>
                </div>

                <button className="rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-500 transition-all shadow-glow-primary">
                  Save Credentials
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
