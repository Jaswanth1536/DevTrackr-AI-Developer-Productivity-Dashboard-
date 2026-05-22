import { useEffect, useState } from "react";
import { fetchIssues } from "../services/api";

const Issues = () => {
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    closed: 0,
  });

  useEffect(() => {
    const loadIssues = async () => {
      const data = await fetchIssues(
        "facebook",
        "react"
      );

      const total = data.length;

      const open = data.filter(
        (issue) => issue.state === "open"
      ).length;

      const closed = data.filter(
        (issue) => issue.state === "closed"
      ).length;

      setStats({
        total,
        open,
        closed,
      });
    };

    loadIssues();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white">
      <h1 className="text-3xl font-bold mb-8">
        Issue Analytics
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl">
          <h2 className="text-lg text-gray-400">
            Total Issues
          </h2>

          <p className="text-4xl font-bold mt-2">
            {stats.total}
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl">
          <h2 className="text-lg text-gray-400">
            Open Issues
          </h2>

          <p className="text-4xl font-bold mt-2 text-yellow-400">
            {stats.open}
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl">
          <h2 className="text-lg text-gray-400">
            Closed Issues
          </h2>

          <p className="text-4xl font-bold mt-2 text-green-400">
            {stats.closed}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Issues;