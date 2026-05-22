import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, GitFork, Sparkles, Settings, LogOut, Terminal, Activity } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { user, logout } = useAuth();

  const navItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'repositories', name: 'GitHub Repositories', icon: GitFork },
    { id: 'ai-insights', name: 'AI Insights', icon: Sparkles, badge: 'Phase 2' },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  return (
    <aside className="fixed left-0 top-0 z-20 flex h-screen w-64 flex-col border-r border-border bg-card/65 backdrop-blur-xl text-white">
      {/* Brand Logo */}
      <div className="flex h-16 items-center gap-2 px-6 border-b border-border">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600 text-white shadow-glow-primary">
          <Activity className="h-5 w-5" />
        </div>
        <span className="text-xl font-bold tracking-tight">
          Dev<span className="text-primary-500">Trackr</span>
        </span>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 space-y-1.5 px-4 py-6">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`group flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                isActive
                  ? 'bg-primary-600 text-white shadow-glow-primary'
                  : 'text-gray-400 hover:bg-border/50 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                  isActive ? 'bg-primary-700 text-white' : 'bg-accent-violet/10 text-accent-violet border border-accent-violet/20'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User Info & Footer */}
      <div className="border-t border-border p-4 bg-background/30">
        <div className="flex items-center gap-3 px-2 py-3 rounded-lg border border-border/10 bg-border/20 mb-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-600/20 text-primary-400 border border-primary-500/20">
            <span className="font-semibold text-sm">
              {user?.username?.substring(0, 2).toUpperCase() || 'US'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-semibold text-white">{user?.username || 'Developer'}</p>
            <p className="truncate text-xs text-gray-500">{user?.email || 'email@company.com'}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-400 hover:bg-red-950/20 hover:text-red-400 transition-all"
        >
          <LogOut className="h-5 w-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
