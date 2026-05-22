import { useEffect, useState } from "react";
import { fetchPullRequests } from "../services/api";

const PullRequests = () => {
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    closed: 0,
    merged: 0,
  });

  useEffect(() => {
    const loadPRs = async () => {
      const data = await fetchPullRequests(
        "facebook",
        "react"
      );

      const total = data.length;

      const open = data.filter(
        (pr) => pr.state === "open"
      ).length;

      const closed = data.filter(
        (pr) => pr.state === "closed"
      ).length;

      const merged = data.filter(
        (pr) => pr.merged_at !== null
      ).length;

      setStats({
        total,
        open,
        closed,
        merged,
      });
    };

    loadPRs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white">
      <h1 className="text-3xl font-bold mb-8">
        Pull Request Analytics
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl">
          <h2 className="text-lg text-gray-400">
            Total PRs
          </h2>

          <p className="text-4xl font-bold mt-2">
            {stats.total}
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl">
          <h2 className="text-lg text-gray-400">
            Open PRs
          </h2>

          <p className="text-4xl font-bold mt-2 text-blue-400">
            {stats.open}
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl">
          <h2 className="text-lg text-gray-400">
            Closed PRs
          </h2>

          <p className="text-4xl font-bold mt-2 text-red-400">
            {stats.closed}
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl">
          <h2 className="text-lg text-gray-400">
            Merged PRs
          </h2>

          <p className="text-4xl font-bold mt-2 text-green-400">
            {stats.merged}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PullRequests;