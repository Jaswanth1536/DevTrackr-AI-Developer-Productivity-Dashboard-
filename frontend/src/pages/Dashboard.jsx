import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import CommitChart from '../components/CommitChart';

import {
  Code,
  Star,
  GitFork,
  HelpCircle,
} from 'lucide-react';

const Dashboard = () => {

  const [activeTab, setActiveTab] = useState('dashboard');

  // Temporary Static Chart Data
  const commits = [
    { date: "Mon", commits: 4 },
    { date: "Tue", commits: 8 },
    { date: "Wed", commits: 2 },
    { date: "Thu", commits: 6 },
    { date: "Fri", commits: 10 },
  ];

  // Temporary Mock Repo Data
  const connectedRepos = [
    {
      _id: 1,
      name: "DevTrackr",
      language: "JavaScript",
    },
    {
      _id: 2,
      name: "Portfolio",
      language: "React",
    },
  ];

  const totalStars = 25;
  const totalForks = 12;
  const totalIssues = 4;

  return (<div className="min-h-screen bg-black text-white flex">

    ```
    {/* Sidebar */}
    <Sidebar
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    />

    {/* Main Content */}
    <div className="flex-1 pl-64 flex flex-col min-h-screen">

      {/* Navbar */}
      <Navbar title="Analytics Overview" />

      {/* Page Content */}
      <main className="flex-grow p-8 space-y-8">

        {/* Welcome Banner */}
        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-xl">
          <h2 className="text-2xl font-bold text-white">
            Welcome back, Developer!
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            Analyze telemetry across connected repositories.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {/* Repositories */}
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">
                Tracked Repositories
              </span>

              <Code className="h-5 w-5 text-blue-400" />
            </div>

            <div className="mt-4">
              <span className="text-3xl font-bold">
                {connectedRepos.length}
              </span>
            </div>
          </div>

          {/* Stars */}
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">
                Total Stars
              </span>

              <Star className="h-5 w-5 text-yellow-400" />
            </div>

            <div className="mt-4">
              <span className="text-3xl font-bold">
                {totalStars}
              </span>
            </div>
          </div>

          {/* Forks */}
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">
                Total Forks
              </span>

              <GitFork className="h-5 w-5 text-violet-400" />
            </div>

            <div className="mt-4">
              <span className="text-3xl font-bold">
                {totalForks}
              </span>
            </div>
          </div>

          {/* Issues */}
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">
                Open Issues
              </span>

              <HelpCircle className="h-5 w-5 text-rose-400" />
            </div>

            <div className="mt-4">
              <span className="text-3xl font-bold">
                {totalIssues}
              </span>
            </div>
          </div>

        </div>

        {/* Chart + Repo Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Commit Chart */}
          <div className="lg:col-span-2 bg-gray-900 rounded-xl p-6 border border-gray-800">
            <CommitChart data={commits} />
          </div>

          {/* Repo Summary */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">

            <h3 className="text-lg font-bold mb-4">
              Linked Repositories
            </h3>

            <div className="space-y-4">

              {connectedRepos.map((repo) => (
                <div
                  key={repo._id}
                  className="border-b border-gray-800 pb-3"
                >
                  <p className="font-semibold text-white">
                    {repo.name}
                  </p>

                  <p className="text-xs text-gray-500">
                    {repo.language}
                  </p>
                </div>
              ))}

            </div>
          </div>

        </div>

      </main>
    </div>
  </div>


);
};

export default Dashboard;
