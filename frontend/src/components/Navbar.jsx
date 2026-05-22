import {
RefreshCcw,
GitBranch,
} from "lucide-react";

const Navbar = ({
title,
selectedRepo,
onRefresh,
}) => {
return ( <header className="sticky top-0 z-10 border-b border-gray-800 bg-black/70 backdrop-blur-xl">


  <div className="flex items-center justify-between px-8 py-4">

    {/* Title */}
    <div className="flex items-center gap-4">

      <h1 className="text-3xl font-bold uppercase tracking-wide text-white">
        {title}
      </h1>

      <div className="rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-400">
        Sync Active
      </div>

    </div>

    {/* Right Controls */}
    <div className="flex items-center gap-4">

      {/* Repository Selector */}
      <div className="flex items-center gap-2 rounded-xl border border-gray-800 bg-gray-900 px-4 py-2 shadow-md">

        <GitBranch className="h-4 w-4 text-blue-400" />

        <span className="text-sm font-medium text-gray-300">
          {selectedRepo}
        </span>

      </div>

      {/* Refresh Button */}
      <button
        onClick={onRefresh}
        title="Refresh Analytics"
        className="rounded-xl border border-gray-700 bg-gray-900 p-3 text-gray-300 hover:border-blue-500 hover:text-white hover:rotate-180 transition-all duration-500"
      >
        <RefreshCcw className="h-5 w-5" />
      </button>

    </div>
  </div>
</header>


);
};

export default Navbar;
