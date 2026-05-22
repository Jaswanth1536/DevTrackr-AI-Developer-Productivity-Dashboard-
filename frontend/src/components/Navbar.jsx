import React from 'react';
import { RefreshCw, GitBranch, ShieldCheck } from 'lucide-react';

const Navbar = ({ title }) => {
  return (
    <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between border-b border-border bg-background/80 px-8 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-bold text-white uppercase tracking-wider">{title}</h1>
        <div className="hidden items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20 md:flex">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Sync Active</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Repo Quick Indicator */}
        <div className="flex items-center gap-2 rounded-lg bg-card border border-border px-3 py-1.5 text-xs text-gray-300">
          <GitBranch className="h-4 w-4 text-primary-400" />
          <span className="font-mono">demo-repository</span>
        </div>

        <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-gray-400 hover:bg-border hover:text-white transition-all">
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
